import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const config: AxiosRequestConfig<AxiosRequestHeaders> = {
  timeout: 10000,
  withCredentials: true,
  baseURL: process.env.BE_API_URL,
};

export const beApiClient = axios.create(config);
