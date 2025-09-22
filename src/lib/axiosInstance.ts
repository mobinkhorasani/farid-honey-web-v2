import axios from 'axios';
import { baseURL } from './baseUrl';
import { urls } from '@/utils/urls';

export const Instance = axios.create({
   baseURL: `${baseURL}${urls.client}`,
});

export const InstanceAdmin = axios.create({
   baseURL: `${baseURL}${urls.admin}`,
});

export const InstanceAuth = axios.create({
   baseURL: `${baseURL}`,
});


// export const Instance = axios.create({
//   baseURL,
// });
