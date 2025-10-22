import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/auth-context'
import { getCartInfo } from '@/api/cart/cart-services'



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