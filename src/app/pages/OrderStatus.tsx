
import { useParams } from "react-router-dom";
import OrderStatusDetail from "../../modules/order/components/OrderStatusDetail";
import OrderStatusHeader from "../../modules/order/components/OrderStatusHeader";
import { useGetMyOrders } from "../../modules/order/api/API";
import { useEffect, useState } from "react";

const OrderStatus = () => {
    const { id } = useParams()
    const { order } = useGetMyOrders(id as string);
    const [orderData, setOrderData] = useState({})

    useEffect(() => {
        order && setOrderData({...order?.data?.data.order,...order?.data?.data.restaurant})
    }, [order])


    if (!order || order.length === 0) {
        return "No orders found";
    }

    return (
        <div className="space-y-10">
            <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
                <OrderStatusHeader order={orderData} />
                <div className="grid gap-10 md:grid-cols-2">
                    <OrderStatusDetail order={orderData} />
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;