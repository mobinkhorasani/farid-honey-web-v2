'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addAddress,
  editAddress,
  deleteAddress,
  type Address,
} from '@/api/address/addressServices';

type MaybeToken = string | undefined;

type OnSuccess<TData = unknown, TVariables = unknown, TContext = unknown> =
  (data: TData, variables: TVariables, context: TContext | undefined) => void;
type OnError<TError = unknown, TVariables = unknown, TContext = unknown> =
  (error: TError, variables: TVariables, context: TContext | undefined) => void;

type BaseOptions<TData = any, TVariables = any, TError = any, TContext = any> = {
  onSuccess?: OnSuccess<TData, TVariables, TContext>;
  onError?: OnError<TError, TVariables, TContext>;
};

const ADDRESSES_QUERY_KEY = ['myAddresses'] as const;

export function useAddAddress(token?: MaybeToken, options?: BaseOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Address) => addAddress(data, token),
    
    onMutate: async (newAddress) => {
      await queryClient.cancelQueries({ queryKey: ADDRESSES_QUERY_KEY });
      
      const previousAddresses = queryClient.getQueryData<Address[]>(ADDRESSES_QUERY_KEY);
      

      if (previousAddresses) {
        queryClient.setQueryData<Address[]>(ADDRESSES_QUERY_KEY, [
          ...previousAddresses,
          { ...newAddress, id: Date.now() }
        ]);
      }
      
      return { previousAddresses };
    },
    
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<Address[]>(ADDRESSES_QUERY_KEY, (old) => {
        if (!old) return [data];
        return old.map(addr => 
          addr.id === context?.previousAddresses?.length 
            ? data 
            : addr
        );
      });
      
      options?.onSuccess?.(data, variables, context);
    },
    
    onError: (error, variables, context) => {
      if (context?.previousAddresses) {
        queryClient.setQueryData(ADDRESSES_QUERY_KEY, context.previousAddresses);
      }
      options?.onError?.(error, variables, context);
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}

export function useEditAddress(token?: MaybeToken, options?: BaseOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) =>
      editAddress(id, data, token),
    
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ADDRESSES_QUERY_KEY });
      
      const previousAddresses = queryClient.getQueryData<Address[]>(ADDRESSES_QUERY_KEY);
      
      if (previousAddresses) {
        queryClient.setQueryData<Address[]>(ADDRESSES_QUERY_KEY, 
          previousAddresses.map(addr => 
            addr.id === id ? { ...addr, ...data } : addr
          )
        );
      }
      
      return { previousAddresses };
    },
    
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<Address[]>(ADDRESSES_QUERY_KEY, (old) => {
        if (!old) return [data];
        return old.map(addr => addr.id === variables.id ? data : addr);
      });
      
      options?.onSuccess?.(data, variables, context);
    },
    
    onError: (error, variables, context) => {
      if (context?.previousAddresses) {
        queryClient.setQueryData(ADDRESSES_QUERY_KEY, context.previousAddresses);
      }
      options?.onError?.(error, variables, context);
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}

export function useDeleteAddress(token?: MaybeToken, options?: BaseOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAddress(id, token),
    
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ADDRESSES_QUERY_KEY });
      
      const previousAddresses = queryClient.getQueryData<Address[]>(ADDRESSES_QUERY_KEY);
      
      if (previousAddresses) {
        queryClient.setQueryData<Address[]>(ADDRESSES_QUERY_KEY, 
          previousAddresses.filter(addr => addr.id !== deletedId)
        );
      }
      
      return { previousAddresses };
    },
    
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    
    onError: (error, variables, context) => {
      if (context?.previousAddresses) {
        queryClient.setQueryData(ADDRESSES_QUERY_KEY, context.previousAddresses);
      }
      options?.onError?.(error, variables, context);
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}