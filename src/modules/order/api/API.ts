import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { generalCreate, generalGet } from "../../../API/api"

type CheckoutSessionRequest = {
	cartItems: {
		product: string
		name: string
		quantity: string
	}[]
	deliveryDetails: {
		email: string
		name: string
		address: string
		mobile: string
	}
	restaurant: string
	deliveryPrice: number
}
export const useCreateCheckoutSession = () => {
	const createCheckoutSessionRequest = async (
		checkoutSessionRequest: CheckoutSessionRequest
	) => {
		const res = await generalCreate({
			route: "order/checkout/create-checkout-session",
			values: checkoutSessionRequest,
		})
		return res
	}

	const {
		mutateAsync: createCheckoutSession,
		isLoading,
		error,
		reset,
	} = useMutation(createCheckoutSessionRequest)

	if (error) {
		toast.error("Something went wrong, Please try again later")
		reset()
	}

	return {
		createCheckoutSession,
		isLoading,
	}
}

export const useGetMyOrders = (id: string) => {
	const getMyOrdersRequest = async () => {
		const response = await generalGet(`/order/${id}`)

		return response
	}

	const { data: order, isLoading } = useQuery(
		"fetchMyOrders",
		getMyOrdersRequest,
		{
			refetchInterval: 5000,
		}
	)

	return { order, isLoading }
}

export const useGetAllOrders = () => {
	const getMyOrdersRequest = async () => {
		const response = await generalGet(`/order/my-orders`)

		return response
	}

	const { data: order, isLoading } = useQuery(
		"getAllOrders",
		getMyOrdersRequest,
	)

	return { order, isLoading }
}
