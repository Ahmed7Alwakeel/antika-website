

import { CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import { Trash } from "lucide-react";
import { CartItem } from "../../../app/pages/RestaurantDetails";
import { Restaurant } from "../types/types";

type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart: (cartItem: CartItem) => void;
    setCartItems: (cartItem: CartItem[]) => void
    setToStorage: (updatedCart: CartItem[]) => void
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart, setCartItems, setToStorage }: Props) => {

    const getTotalCost = () => {
        const totalInPence = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

        return (totalWithDelivery).toFixed(2);
    };

    const removeOne = (cartItem: CartItem) => {
        if (cartItem.quantity == 1) {
            removeFromCart(cartItem)
        } else {
            setCartItems((cartData: CartItem[]) => {
                let updatedCart = [...cartItems]
                updatedCart = cartData.map(item => item._id == cartItem._id ? { ...item, quantity: item.quantity - 1 } : item)

                setToStorage(updatedCart)

                return updatedCart
            })
        }
    }

    const increaseOne = (cartItem: CartItem) => {
        setCartItems((cartData: CartItem[]) => {
            let updatedCart = [...cartItems]
            updatedCart = cartData.map(item => item._id == cartItem._id ? { ...item, quantity: item.quantity + 1 } : item)

            setToStorage(updatedCart)

            return updatedCart
        })
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your Order</span>
                    {cartItems.length > 0 && <span>£{getTotalCost()}</span>}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item) => (
                    <div className="flex justify-between" key={item.name}> 
                        <span className="flex">
                            <Badge className="mr-2 cursor-pointer" onClick={() => removeOne(item)}>-</Badge>
                            <Badge variant="outline" className="">
                                {item.quantity}
                            </Badge>
                            <Badge className="mr-2 ml-2 cursor-pointer" onClick={() => increaseOne(item)}>+</Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash
                                className="cursor-pointer"
                                color="red"
                                size={20}
                                onClick={() => removeFromCart(item)}
                            />
                            £{((item.price * item.quantity)).toFixed(2)}
                        </span>
                    </div>
                ))}
                {cartItems.length > 0 &&
                    <>
                        <Separator />
                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>£{(restaurant.deliveryPrice).toFixed(2)}</span>
                        </div>
                    </>
                }
                <Separator />
            </CardContent>
        </>
    );
};

export default OrderSummary;