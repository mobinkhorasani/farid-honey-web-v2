'use client';

import { useMutation } from '@tanstack/react-query';
import { editUser } from '@/api/users/user-services';
import { toast } from 'sonner';

type MaybeToken = string | undefined;

interface EditUserPayload {
  name: string;
  phone_number: string;
}

interface UseEditUserOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  refetch?: () => Promise<any>;
}

export const useEditUser = (token?: MaybeToken, options?: UseEditUserOptions) => {
  return useMutation({
    mutationFn: (payload: EditUserPayload) => editUser(payload, token),

    onSuccess: () => {
      options?.refetch?.();
      toast.success('اطلاعات کاربر با موفقیت به‌روز شد');
      options?.onSuccess?.();
    },

    onError: (error: any) => {
      const msg = error?.response?.data?.message || error?.message || 'خطایی نامشخص';
      toast.error(`خطا در به‌روزرسانی اطلاعات: ${msg}`);
      options?.onError?.(error);
    },
  });
};