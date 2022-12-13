import Axios from 'axios';

import { API_URL } from '@/config';

export const ApiClient = Axios.create({
  baseURL: API_URL,
});
