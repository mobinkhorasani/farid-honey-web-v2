import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/authContext'
import { getCartInfo } from '@/api/cart/cartServices'



export const useCartCount = () => {
    const { token } = useAuth()

    return useQuery<any>({
        queryKey: ['cart'],
        queryFn: () => getCartInfo(token ?? undefined),
        enabled: !!token,
        staleTime: 1000 * 60,
        refetchInterval: 1000 * 60 * 5,
    })
}