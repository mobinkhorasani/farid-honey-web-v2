import axios from 'axios';
import { baseURL } from './baseUrl';

export const Instance = axios.create({
  baseURL,
});

