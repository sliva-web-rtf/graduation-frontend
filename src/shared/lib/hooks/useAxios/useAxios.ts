import { AxiosError } from 'axios';

import { addSecretBeforeRequest } from 'app/interceptors/addSecretBeforeRequest/addSecretBeforeRequest';
import { SecretRefreshResult, refreshSecret } from 'app/interceptors/refreshSecret/refreshSecret';
import { refreshToken } from 'entities/User/model/services/refreshToken';
import { http } from 'shared/api/api';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';

import { useAppDispatch } from '../useAppDispatch/useAppDispatch';

const useAxios = () => {
  const dispatch = useAppDispatch();

  const getSecret = async (): Promise<string | null> => {
    const secret = await UserSecretStorageService.get();
    return secret ?? null;
  };

  http.interceptors.request.use((config) => addSecretBeforeRequest(config, getSecret));

  const handleSecretRefresh = async (error: AxiosError): SecretRefreshResult => {
    if (error.response?.status === 401) {
      /** TODO: пересмотреть решение на инвалидирование react query */
      dispatch(refreshToken());
    }

    throw error;
  };

  http.interceptors.response.use(
    (config) => config,
    (error) => refreshSecret(error, () => handleSecretRefresh(error)),
  );
};

export default useAxios;
