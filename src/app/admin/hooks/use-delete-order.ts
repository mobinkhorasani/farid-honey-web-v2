import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteOrder as deleteOrderApi } from '@/api/admin/admin-sevices'

export const useDeleteOrder = (token?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (id: string) => deleteOrderApi(id, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Cart'] })

        },
        onError: (error: any) => {
            console.error('حذف سفارش با خطا مواجه شد:', error)
        },
    })

    return mutation
}
