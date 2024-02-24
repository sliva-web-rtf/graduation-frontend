import { AxiosRequestConfig } from 'axios';

export function shouldInterceptSecret(config: AxiosRequestConfig): boolean {
  return config.baseURL?.startsWith(__API__) ?? false;
}

function getAuthorizationHeaderValue(secret: string): string {
  return `Bearer ${secret}`;
}

export async function addSecretBeforeRequest(
  config: AxiosRequestConfig,
  getSecret: () => Promise<string | null>,
): Promise<AxiosRequestConfig> {
  const secret = await getSecret();

  if (!shouldInterceptSecret(config) || secret == null) {
    return config;
  }

  const { headers } = config;

  if (headers == null) {
    throw new Error('Заголовки не найдены');
  }

  return {
    ...config,
    headers: {
      ...headers,
      Authorization: getAuthorizationHeaderValue(secret),
    },
  };
}
