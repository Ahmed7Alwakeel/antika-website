
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllOrders } from "../../modules/order/api/API";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const OrderStatus = () => {
    const navigate= useNavigate()
    const { order,isLoading } = useGetAllOrders();
    const [orderData, setOrderData] = useState([])
    const [customLoading,setCustomLoading]=useState(true)

    useEffect(() => {
        setTimeout(()=>{
          setCustomLoading(false)
        },2000)
      }, [])

    useEffect(() => {
        order && setOrderData(order?.data?.data)
    }, [order])
    

    if (!order || orderData.length === 0) {
        return "No orders found";
    }
    if ( isLoading || customLoading) {
        return <div className="spinner">
            <div className="loader"></div>
        </div>;
    }

    return (
        <div className="space-y-10">
            <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
                <div className="flex gap-4 flex-col">
                    {orderData.map((order: any, index: number) => (
                        <Card className="cursor-pointer"  onClick={()=>navigate(`/order-status/${order._id}`)} key={index}>
                            <CardHeader>
                                <CardTitle className="capitalize text-xl flex justify-between">
                                    <p>{order.deliveryDetails.branch}</p>
                                    <p>{(order.totalAmount || 0).toFixed(2)}$</p>
                                </CardTitle>
                            </CardHeader>
                            <div className="mb-4 flex flex-col gap-4">
                                {order?.cartItems?.map((item: any,index:number,) => (
                                    <CardContent className="flex flex-row items-center justify-between pb-0" key={index}>
                                        <p ><span className="capitalize">{item.name}</span> x {item.quantity}</p>
                                    </CardContent>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;