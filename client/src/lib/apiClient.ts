import applyCaseMiddleware from 'axios-case-converter';
import Axios from 'axios';

import { API_URL } from '@/config';

const options = {
  ignoreHeaders: true
}

export const ApiClient = applyCaseMiddleware(Axios.create({
  baseURL: API_URL,
}), options);

ApiClient.interceptors.response.use(
  (response) => response.data,
)

