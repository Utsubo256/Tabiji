import applyCaseMiddleware from 'axios-case-converter';
import Axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';

function authRequestInterceptor(config: AxiosRequestConfig) {
  config.headers.Accept = 'application/json';
  config.headers = { 'X-Requested-With': 'XMLHttpRequest' };
  return config;
}

const options = {
  ignoreHeaders: true
}

export const ApiClient = applyCaseMiddleware(Axios.create({
  baseURL: API_URL,
}), options);

ApiClient.interceptors.request.use(authRequestInterceptor);
ApiClient.interceptors.response.use(
  (response) => response.data,
);
