export type IProduct = {
	_id: string
	name: string
	price: number
}

export interface ICategory {
	slug: string
	name: string
	description: string
	bannerImage: {
		path: string
		name: string
	}
	cardImage: {
		path: string
		name: string
	}
	products: IProduct[]
}

export type Restaurant = {
	_id: string
	user: string
	restaurantName: string
	city: string
	area?: string
	deliveryPrice: number
	estimatedDeliveryTime: number
	cuisines: string[]
	menuItems: IProduct[]
	imageUrl: string
	lastUpdated: string
}
