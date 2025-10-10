'use client';

import { useMutation } from '@tanstack/react-query';
import {
  addAddress,
  editAddress,
  deleteAddress,
  type Address,
} from '@/api/address/addressServices';

type MaybeToken = string | undefined;

type BaseOptions = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  refetch?: () => void;
};

export function useAddAddress(token?: MaybeToken, options?: BaseOptions) {
  return useMutation({
    mutationFn: (data: Address) => addAddress(data, token),
    
    onSuccess: () => {
      options?.refetch?.();
      options?.onSuccess?.();
    },
    
    onError: (error) => {
      options?.onError?.(error);
    },
  });
}

export function useEditAddress(token?: MaybeToken, options?: BaseOptions) {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) =>
      editAddress(id, data, token),
    
    onSuccess: () => {
      options?.refetch?.();
      options?.onSuccess?.();
    },
    
    onError: (error) => {
      options?.onError?.(error);
    },
  });
}

export function useDeleteAddress(token?: MaybeToken, options?: BaseOptions) {
  return useMutation({
    mutationFn: (id: number) => deleteAddress(id, token),
    
    onSuccess: () => {
      options?.refetch?.();
      options?.onSuccess?.();
    },
    
    onError: (error) => {
      options?.onError?.(error);
    },
  });
}