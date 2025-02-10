export interface Product {
    id: string;
    name: string;
    price: number;
    availableQuantity: number;
    image: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    discountPercent: number;
    shippingMethod?: "standard" | "express";
    promoCode?: string;
}

export type CartAction =
    | { type: "ADD_TO_CART"; productId: string }
    | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
    | { type: "APPLY_DISCOUNT"; discountPercent: number }
    | { type: "SET_SHIPPING"; method: "standard" | "express" }
    | { type: "CLEAR_CART" };