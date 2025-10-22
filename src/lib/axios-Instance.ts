import axios from 'axios';
import { baseURL } from './base-url';
import { urls } from '@/utils/urls';
import { storage } from '@/app/auth/utils/storage';

export const Instance = axios.create({
  baseURL: `${baseURL}${urls.client}`,
});

export const InstanceAdmin = axios.create({
  baseURL: `${baseURL}${urls.admin}`,

});

export const InstanceAuth = axios.create({
  baseURL: `${baseURL}`,
  withCredentials: true,
});

const attachAuthHeader = (config: any) => {
  const token = storage.get<string>('auth_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

Instance.interceptors.request.use(attachAuthHeader);
InstanceAdmin.interceptors.request.use(attachAuthHeader);
