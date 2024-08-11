import { Separator } from "@radix-ui/react-separator";

const OrderStatusDetail = ({ order }: any) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Branch</span>
        <span className="capitalize">{order?.deliveryDetails?.branch || "-"}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order?.deliveryDetails?.name}</span>
        <span>
          {order?.deliveryDetails?.address}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Order</span>
        <ul>
          {order?.cartItems?.map((item: any) => (
            <li>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>{order.totalAmount ? `£${(order.totalAmount).toFixed(2)}` : "-"}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;