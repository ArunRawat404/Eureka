import React from 'react';
import { Product, CartItem as CartItemType } from '../types';

interface CartTableProps {
    items: CartItemType[];
    products: Product[];
    onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const CartTable: React.FC<CartTableProps> = ({ items, products, onUpdateQuantity }) => {
    return (
        <div className="w-full border border-[#D6D6DE] rounded-xl bg-[#FAFAFA]">
            <div className="flex border-b border-[#E6E8EB] bg-white">
                <div className="w-20 p-3">
                    <span className="text-sm font-medium text-[#1C1C21]">Item</span>
                </div>
                <div className="w-[154px] p-3 text-center">
                    <span className="text-sm font-medium text-[#1C1C21]">Quantity</span>
                </div>
                <div className="w-[92px] p-3">
                    <span className="text-sm font-medium text-[#1C1C21]">Total</span>
                </div>
            </div>

            {items.map((item) => {
                const product = products.find(p => p.id === item.productId);
                if (!product) return null;

                return (
                    <div key={item.productId} className="flex border-b border-[#E6E8EB]">
                        <div className="flex items-center justify-center w-20 p-2">
                            <span className="text-sm text-[#1C1C21]">{product.name}</span>
                        </div>
                        <div className="w-[154px] p-2 flex items-center justify-center">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => onUpdateQuantity(product.id, item.quantity - 1)}
                                    className="text-[#617AFA]"
                                >
                                    -
                                </button>
                                <span className="text-sm font-medium text-[#1C1C21]">{item.quantity}</span>
                                <button
                                    onClick={() => onUpdateQuantity(product.id, item.quantity + 1)}
                                    className="text-[#617AFA]"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="w-[92px] p-2 flex items-center justify-center">
                            <span className="text-sm text-[#3D404A]">
                                ${(product.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};