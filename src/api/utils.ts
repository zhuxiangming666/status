import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface Service extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>;
}

function HttpRequest(baseURL: string) {
  const service: Service = axios.create({ baseURL });

  service.interceptors.request.use(
    (config: any) => {
      return config;
    },
    (err: any) => Promise.reject(err)
  );

  service.interceptors.response.use(
    async (res: AxiosResponse) => {
      const { data } = res;
      return data;
    },
    (error: any) => {
      return Promise.reject(error.response);
    }
  );

  return service;
}

export const request = HttpRequest('/v1');

