

import { Progress } from "../../../components/ui/progress";
import { ORDER_STATUS } from "../config";

const OrderStatusHeader = ({ order }: any) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span> Order Status : <span className={`${getOrderStatusInfo().progressValue == 100 ? "text-green-600" : "text-yellow-500"}`}>{getOrderStatusInfo().label}</span></span>
        {getOrderStatusInfo().progressValue != 100 && <span> Expected by: {getExpectedDelivery()}</span>}
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;