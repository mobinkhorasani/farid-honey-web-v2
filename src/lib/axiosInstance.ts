import axios from 'axios';
import { baseURL } from './baseUrl';
import { urls } from '@/utils/urls';
import { refreshToken } from '@/api/users/userServices';

export const Instance = axios.create({
   baseURL: `${baseURL}${urls.client}`,
});

export const InstanceAdmin = axios.create({
   baseURL: `${baseURL}${urls.admin}`,
});

export const InstanceAuth = axios.create({
   baseURL: `${baseURL}`,
});

// InstanceAuth.defaults.withCredentials = true;

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
   failedQueue.forEach((prom) => {
      if (error) prom.reject(error);
      else prom.resolve(token);
   });
   failedQueue = [];
};


const setupInterceptors = (instance: any) => {
   instance.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
         const originalRequest = error.config;

         if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            if (isRefreshing) {
               return new Promise(function (resolve, reject) {
                  failedQueue.push({ resolve, reject });
               })
                  .then((token) => {
                     originalRequest.headers["Authorization"] = `Bearer ${token}`;
                     return instance(originalRequest);
                  })
                  .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
               const data = await refreshToken();
               const newAccessToken = data?.accessToken;

               // ذخیره توکن جدید در localStorage
               localStorage.setItem("auth_token", newAccessToken);

               // ست توکن جدید روی همه‌ی axios‌ها
               Instance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
               InstanceAdmin.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

               processQueue(null, newAccessToken);
               return instance(originalRequest);
            } catch (err) {
               processQueue(err, null);
               // localStorage.removeItem("auth_token");
               // window.location.href = "/login";
               return Promise.reject(err);
            } finally {
               isRefreshing = false;
            }
         }

         return Promise.reject(error);
      }
   );
};

// اجرا برای هر اینستنس
setupInterceptors(Instance);
setupInterceptors(InstanceAdmin);


// export const Instance = axios.create({
//   baseURL,
// });
