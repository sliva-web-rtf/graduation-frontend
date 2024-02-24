import { AxiosError } from 'axios';

import { Store } from 'app/providers/StoreProvider/config/store';
import { http } from 'shared/api/api';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';

import { addSecretBeforeRequest } from './addSecretBeforeRequest/addSecretBeforeRequest';
import { SecretRefreshResult, refreshSecret } from './refreshSecret/refreshSecret';

export const setupInterceptors = (store: Store) => {
  const getSecret = async (): Promise<string | null> => {
    const secret = await UserSecretStorageService.get();
    return secret ?? null;
  };

  http.interceptors.request.use((config) => addSecretBeforeRequest(config, getSecret));

  const handleSecretRefresh = async (error: AxiosError): SecretRefreshResult => {
    const secret = await UserSecretStorageService.get();

    if (error.response?.status === 401) {
      // TODO: настроить рефрешь
    }

    throw error;
  };

  http.interceptors.response.use(
    (config) => config,
    (error) => refreshSecret(error, () => handleSecretRefresh(error)),
  );
};
