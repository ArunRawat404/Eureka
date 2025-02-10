import { CartState, CartAction } from '../types';

export const initialCartState: CartState = {
    items: [],
    discountPercent: 0,
    shippingMethod: undefined,
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItem = state.items.find(item => item.productId === action.productId);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.productId === action.productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { productId: action.productId, quantity: 1 }],
            };
        }

        case "UPDATE_QUANTITY": {
            if (action.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.productId !== action.productId),
                };
            }
            return {
                ...state,
                items: state.items.map(item =>
                    item.productId === action.productId
                        ? { ...item, quantity: action.quantity }
                        : item
                ),
            };
        }

        case "APPLY_DISCOUNT": {
            return {
                ...state,
                discountPercent: action.discountPercent,
            };
        }

        case "SET_SHIPPING": {
            return {
                ...state,
                shippingMethod: action.method,
            };
        }

        case "CLEAR_CART": {
            return initialCartState;
        }

        default: {
            return state;
        }
    }
};