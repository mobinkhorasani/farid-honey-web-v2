
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editUser } from '@/api/users/userServices';
import { toast } from 'sonner';

type MaybeToken = string | undefined;

type EditUserPayload = {
  name: string;
  phone_number: string;
};

type UseEditUserOptions = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

const USER_QUERY_KEY = ['userInfo'] as const;

export const useEditUser = (token?: MaybeToken, options?: UseEditUserOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditUserPayload) => editUser(payload, token),
    
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });
      
      const previousUser = queryClient.getQueryData(USER_QUERY_KEY);
      
      if (previousUser) {
        queryClient.setQueryData(USER_QUERY_KEY, (old: any) => ({
          ...old,
          ...updatedData,
        }));
      }
      
      return { previousUser };
    },
    
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(USER_QUERY_KEY, (old: any) => ({
        ...old,
        ...data,
      }));
      
      toast.success('اطلاعات کاربر با موفقیت به‌روز شد');
      options?.onSuccess?.();
    },
    
    onError: (error: any, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(USER_QUERY_KEY, context.previousUser);
      }
      
      const msg = error?.response?.data?.message || error?.message || 'خطایی نامشخص';
      toast.error(`خطا در به‌روزرسانی اطلاعات: ${msg}`);
      
      options?.onError?.(error);
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
};
