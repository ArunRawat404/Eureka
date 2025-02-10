import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  cartQuantity: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, cartQuantity }) => {
  return (
    <div className="flex flex-col gap-3 pb-3 w-[200px]">
      <div
        className="w-full h-[200px] bg-center bg-no-repeat bg-cover rounded-xl"
        style={{ backgroundImage: `url("${product.image}")` }}
      />
      <div className="flex flex-col gap-2">
        <p className="text-[#1C1C21] text-base font-medium leading-6">{product.name}</p>
        <p className="text-[#3D404A] text-sm leading-[21px]">${product.price.toFixed(2)}</p>
        <div className="flex flex-col gap-1">
          <p className="text-[#3D404A] text-xs">
            Available: {product.availableQuantity - cartQuantity}
          </p>
          <button
            onClick={() => onAddToCart(product.id)}
            className="flex h-10 max-w-fit items-center justify-center my-4 p-4 bg-[#617AFA] rounded-[20px]"
            disabled={cartQuantity >= product.availableQuantity}
          >
            <span className="text-[#FAFAFA] text-sm font-bold leading-[21px]">
              {cartQuantity >= product.availableQuantity ? 'Sold Out' : 'Add To Cart'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};