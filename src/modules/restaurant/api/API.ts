import { useQuery } from "react-query"
import { API_URL } from "../../../config/APIs"
import { SearchState } from "../../../app/pages/SearchPage"
import { generalGet } from "../../../API/api"
import axios from "axios"

interface ILocation {
	ip: string
	hostname: string
	city: string
	region: string
	country: string
	loc: string
	org: string
	timezone: string
	readme: string
}
const getUserCoordinates = async (): Promise<string> => {
	const response = await axios.get<ILocation>("https://ipinfo.io/json")
	return response.data.loc
}
export const useGetMyRestaurant = () => {
	const getMyRestaurantRequest = async () => {
		const data = await generalGet(`/restaurant`)
		return data.data.data
	}

	const { data: restaurant, isLoading } = useQuery(
		"fetchMyRestaurant",
		getMyRestaurantRequest
	)

	return { restaurant, isLoading }
}

export const useGetBranchesWithin = () => {
	const getMyRestaurantRequest = async () => {
		const userLocation = await getUserCoordinates()
		const data = await generalGet(
			`/restaurant/branch-within?center=${userLocation}`
		)
		return data.data.data
	}

	const { data: restaurantsWithin, isLoading } = useQuery(
		"fetchMyRestaurantWithin",
		getMyRestaurantRequest
	)

	return { restaurantsWithin, isLoading }
}

export const useSearchRestaurants = (
	searchState: SearchState,
	city?: string
) => {
	const createSearchRequest = async (): Promise<any> => {
		const params = new URLSearchParams()
		searchState.searchQuery &&
			params.set("searchQuery", searchState.searchQuery)
		searchState.selectedCuisines &&
			params.set("cuisines", searchState.selectedCuisines.join(","))
		searchState.sortOption && params.set("sort", searchState.sortOption)
		searchState.page && params.set("page", searchState.page.toString())

		const response = await fetch(
			`${API_URL}/restaurants/city/${city}?${params.toString()}`
		)

		if (!response.ok) {
			throw new Error("Failed to get restaurant")
		}

		return response.json()
	}

	const { data: results, isLoading } = useQuery(
		["searchRestaurants", searchState],
		createSearchRequest,
		{ enabled: !!city }
	)

	return {
		results,
		isLoading,
	}
}

export const useGetMenu = (selectedCuisines: string[], refetch: boolean) => {
	let name = null
	if (selectedCuisines.length > 0) name = selectedCuisines.join(",")
	const getMenu = async () => {
		const data = await generalGet(
			name != null
				? `/category?published=true&categoryName=${name}`
				: `/category?published=true`
		)

		return data.data.data
	}

	// const { data: menu, isLoading } = useQuery("getMenu", getMenu)

	const { data: menu, isLoading } = useQuery({
		queryKey: ["getMenu", refetch],
		queryFn: getMenu,
		refetchOnWindowFocus: false,
	})

	return { menu, isLoading }
}
export const useGetCuisines = () => {
	const getMenu = async () => {
		const data = await generalGet(`/category?published=true`)

		return data.data.data
	}

	const { data: cuisines, isLoading } = useQuery("cuisines", getMenu)

	return { cuisines, isLoading }
}
export const useGetSingleRestaurant = (id: string) => {
	const getRestaurant = async () => {
		const data = await generalGet(`/restaurant/${id}`)
		return data.data.data.data
	}

	const { data: restaurant, isLoading } = useQuery(
		"getRestaurantData",
		getRestaurant
	)

	return { restaurant, isLoading }
}
