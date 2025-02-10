import React from 'react';
import { Product } from '../types';

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ product, quantity, onUpdateQuantity }) => {
  return (
    <div className="flex items-center gap-4 bg-[#F9FAFA] px-4 min-h-[72px] py-2 justify-between">
      <div className="flex flex-col justify-center">
        <p className="text-[#1C1D22] text-base font-medium leading-normal line-clamp-1">
          {product.name}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-[#3C3F4A] text-sm font-normal leading-normal">Quantity:</p>
          <button
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            className="text-[#607AFB] px-2"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            className="text-[#607AFB] px-2"
          >
            +
          </button>
        </div>
      </div>
      <div className="shrink-0">
        <p className="text-[#1C1D22] text-base font-normal leading-normal">
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};