import { AxiosError } from 'axios';

import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { http } from 'shared/api/api';
import { addSecretBeforeRequest } from 'app/interceptors/addSecretBeforeRequest/addSecretBeforeRequest';
import { SecretRefreshResult, refreshSecret } from 'app/interceptors/refreshSecret/refreshSecret';

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
      // dispatch(refreshSecret())
      // TODO: настроить рефрешь
    }

    throw error;
  };

  http.interceptors.response.use(
    (config) => config,
    (error) => refreshSecret(error, () => handleSecretRefresh(error)),
  );
};

export default useAxios;
