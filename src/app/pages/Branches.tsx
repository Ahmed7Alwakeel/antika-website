import { Link } from "react-router-dom";
import { useGetBranchesWithin, useGetMyRestaurant } from "../../modules/restaurant/api/API";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useEffect, useState } from "react";
import { Restaurant } from "../../modules/restaurant/types/types";

const Branches = () => {
    const { restaurant } = useGetMyRestaurant()
    const { restaurantsWithin } = useGetBranchesWithin()
    const [unAvailable, setUnAvailable] = useState([])

    useEffect(() => {
        setUnAvailable(restaurant?.filter((res: Restaurant) => !restaurantsWithin?.some((r: Restaurant) => r._id == res._id)))
    }, [restaurant, restaurantsWithin])

    return (
        <>
            <p className="mb-4 text-black">Note: Delivery Availability according to your location </p>
            <div className="grid grid-cols-2 gap-5 group">

                {restaurantsWithin?.map((item: { area: string, _id: string, city: string, estimatedDeliveryTime: number, deliveryPrice: number }, index: number) => (
                    <Link
                        key={index}
                        to={`/restaurant/${item._id}`}
                    >
                        <Card className="cursor-pointer mb-4" >
                            <CardHeader className="flex justify-between flex-row items-center">
                                <CardTitle className="capitalize">{item.city}, {item.area}</CardTitle>
                                <p className="m-0 text-xs bg-green-500 p-2 rounded-sm text-white">Available Delivery </p>
                            </CardHeader>
                            <CardContent >
                                <div>Delivery price: <span className="font-bold">£{(item.deliveryPrice).toFixed(2)}</span></div>
                                <div>
                                    Estimated time: <span className="font-bold">{item.estimatedDeliveryTime} mins</span>
                                </div>
                            </CardContent>

                        </Card>
                    </Link>
                ))}
                {unAvailable?.map((item: { area: string, _id: string, city: string, estimatedDeliveryTime: number, deliveryPrice: number }, index: number) => (
                    <div key={index}>
                        <Card className="mb-4" >
                            <CardHeader className="flex justify-between flex-row items-center">
                                <CardTitle className="capitalize">{item.city}, {item.area}</CardTitle>
                                <p className="m-0 text-xs text-white p-2 rounded-sm bg-red-600">Delivery Unavailable</p>
                            </CardHeader>
                            <CardContent >
                                <div>Delivery price: <span className="font-bold">£{(item.deliveryPrice).toFixed(2)}</span></div>
                                <div>
                                    Estimated time: <span className="font-bold">{item.estimatedDeliveryTime} mins</span>
                                </div>
                            </CardContent>

                        </Card>
                    </div>
                ))}
            </div>
        </>

    )
}

export default Branches;