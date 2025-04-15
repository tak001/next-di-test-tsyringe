import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const config: AxiosRequestConfig<AxiosRequestHeaders> = {
  timeout: 10000,
  withCredentials: true,
};

export const httpClient = axios.create(config);
