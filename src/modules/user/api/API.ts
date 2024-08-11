import { useMutation } from "react-query"
import {  generalUpdate } from "../../../API/api"
import { TUser } from "../types/types"
import { toast } from "react-toastify"
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux"
import { setUserData } from "../store/redux/authData"

export const useUpdateMyUser = () => {
	const dispatch = useDispatch()
	const updateMyUserRequest = async (formData: TUser) => {
		generalUpdate({ route: "/user/edit-profile", values: formData }).then((res)=>{
			Cookies.set('user_data', JSON.stringify(res?.data?.data.user));
			dispatch(setUserData(res?.data?.data.user))
			toast.success("User profile updated!")

		})
	}

	const {
		mutateAsync: updateUser,
		isLoading,
		error,
		reset,
	} = useMutation(updateMyUserRequest)

	if (error) {
		toast.error(error.toString())
		reset()
	}

	return { updateUser, isLoading }
}
