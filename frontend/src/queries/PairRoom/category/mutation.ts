import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addCategory, deleteCategory, updateCategory } from '@/apis/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useAddCategory = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CATEGORIES] });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CATEGORIES] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CATEGORIES] });
    },
    onError: (error) => {
      addToast({ status: 'ERROR', message: error.message });
    },
  });
};
