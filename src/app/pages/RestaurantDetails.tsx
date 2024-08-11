

import { Card, CardFooter } from "../../components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCuisines, useGetMenu, useGetSingleRestaurant } from "../../modules/restaurant/api/API";
import { ICategory, IProduct } from "../../modules/restaurant/types/types";
import { UserFormData } from "../../modules/user/components/UserProfileForm";
import MenuItemWrapper from "../../modules/restaurant/components/MenuItemWrapper";
import OrderSummary from "../../modules/restaurant/components/OrderSummary";
import CheckoutButton from "../../modules/restaurant/components/CheckoutButton";
import { useCreateCheckoutSession } from "../../modules/order/api/API";
import SearchPage from "./SearchPage";
import CategoryFilter from "./CategoryFilter";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

const RestaurantDetails = () => {
    const { id } = useParams();
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
    const [refetch, setRefetch] = useState(false)
    const { menu } = useGetMenu(selectedCuisines, refetch);
    const { cuisines } = useGetCuisines();
    const { restaurant } = useGetSingleRestaurant(id);
    const { createCheckoutSession, isLoading: isCheckoutLoading } =
        useCreateCheckoutSession();

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${id}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const setToStorage = (updatedCart: CartItem[]) => {
        sessionStorage.setItem(
            `cartItems-${id}`,
            JSON.stringify(updatedCart)
        );
    }

    const addToCart = (menuItem: IProduct) => {

        setCartItems((cartItems: CartItem[]) => {

            const existingCartItem = cartItems.find(
                (cartItem) => cartItem._id === menuItem._id
            );
            let updatedCart = [...cartItems]
            if (existingCartItem) {
                updatedCart = cartItems.map(item => item._id == menuItem._id ? { ...item, quantity: item.quantity + 1 } : item)
            } else {
                updatedCart = [...updatedCart,
                {
                    _id: menuItem._id,
                    name: menuItem.name,
                    price: menuItem.price,
                    quantity: 1,
                }]
            }

            setToStorage(updatedCart)

            return updatedCart
        })
    };

    const removeFromCart = (cartItem: CartItem) => {

        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item) => cartItem._id !== item._id
            );

            setToStorage(updatedCartItems)

            return updatedCartItems;
        });

    };

    const onCheckout = async (userFormData: UserFormData) => {
        if (!restaurant) {
            return;
        }

        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                product: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
                price: cartItem.price
            })),
            restaurant: restaurant._id,
            totalAmount: getTotalCost(),
            deliveryPrice: restaurant.deliveryPrice,
            deliveryDetails: {
                name: userFormData.name,
                address: userFormData.address,
                email: userFormData.email as string,
                mobile: userFormData.mobile,
                branch: restaurant.area
            },
        };

        const data = await createCheckoutSession(checkoutData);
        sessionStorage.removeItem(`cartItems-${id}`)
        window.location.href = data?.data?.url;
    };


    const getTotalCost = () => {
        const totalInPence = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

        return (totalWithDelivery).toFixed(2);
    };

    if (!menu) {
        return <div className="spinner">
            <div className="loader"></div>
        </div>;
    }


    return (
        <div className="flex flex-col gap-10">
            <div>
                <CategoryFilter
                    cuisinesList={cuisines?.map((item: { name: string }) => item.name)}
                    selectedCuisines={selectedCuisines}
                    onChange={(value: string[]) => { setSelectedCuisines(value); setRefetch(!refetch) }}
                />
            </div>
            <div className="grid md:grid-cols-[4fr_2fr] gap-10">
                <div className="flex flex-col gap-4">
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {menu.map((menuItem: ICategory, index: number) => (
                        <MenuItemWrapper
                            menuItem={menuItem}
                            addToCart={addToCart}
                            key={index}
                        />
                    ))}
                </div>
                <div>
                    {
                        cartItems.length > 0 &&
                        <Card>
                            <OrderSummary
                                restaurant={restaurant}
                                cartItems={cartItems}
                                removeFromCart={removeFromCart}
                                setCartItems={setCartItems}
                                setToStorage={setToStorage}
                            />
                            <CardFooter>
                                <CheckoutButton
                                    disabled={cartItems?.length === 0}
                                    onCheckout={onCheckout}
                                    isLoading={isCheckoutLoading}
                                />
                            </CardFooter>
                        </Card>
                    }
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;
