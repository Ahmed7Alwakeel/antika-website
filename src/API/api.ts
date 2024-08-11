import { axiosInstance } from "../config/axiosConfig"

export const generalUpdate = async (props: any) => {
	const { route, values } = props
	const response = await axiosInstance.patch(route, values)
	return response
}
export const generalDelete = async (route: string) => {
	const response = await axiosInstance.delete(route)
	return response
}
export const generalCreate = async (props: any) => {
	const { route, values } = props

	const response = await axiosInstance.post(route, values)
	return response
}

export const authReq = async (props: any) => {
	const { route, values } = props
	const response = await axiosInstance.post(route, values)
	return response
}

export const generalGet = async (route: string): Promise<any> => {
	const response = await axiosInstance.get(route)
	return response
}
