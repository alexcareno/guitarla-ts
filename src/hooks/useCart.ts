import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import { Guitar, CartItem } from "../interfaces";

export function useCart() {

    const initialCart = () : CartItem[] => {
		const localStorageCart = localStorage.getItem('cart');
		return localStorageCart ? JSON.parse(localStorageCart) : [];
	}

	const [data] = useState(db);
	const [cart, setCart] = useState(initialCart);

	const MAX_CART_ITEMS = 5;
	const MIN_CART_ITEMS = 1;


	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	function addToCart(item: Guitar) {
		const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
		if (itemExist >= 0) {
			const updatedCart = [...cart];
			if (updatedCart[itemExist].quantity >= MAX_CART_ITEMS) return;
			updatedCart[itemExist].quantity++;
			setCart(updatedCart);

		} else {
			const newItem: CartItem = {...item, quantity: 2}
			setCart([...cart, newItem]);
		}

	}

	function removeFromCart(id : Guitar['id']) {
		setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
	}

	function increaseItem(id : Guitar['id']) {
		const updateCart = cart.map(item => {
			if (item.id === id && item.quantity < MAX_CART_ITEMS) {
				return {
					...item,
					quantity: item.quantity + 1
				};
			}
			return item;
		});
		setCart(updateCart);
	}

	function decreaseItem(id : Guitar['id']) {
		const updateCart = cart.map(item => {
			if (item.id === id && item.quantity > MIN_CART_ITEMS) {
				return {
					...item,
					quantity: item.quantity - 1
				};
			}
			return item;
		});
		setCart(updateCart);
	}

	function clearCart() {
		setCart([]);
	}

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseItem,
        decreaseItem,
        clearCart,
        isEmpty,
        cartTotal
    }

}