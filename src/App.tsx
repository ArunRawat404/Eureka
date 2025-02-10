import { useReducer, useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { CartTable } from './components/CartTable';
import { products } from './data/products';
import { cartReducer, initialCartState } from './reducers/cartReducer';
import { calculateDiscountFromCode } from './utils/helpers';
import Loader, { showLoader } from "./components/Loader";

function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const [promoCode, setPromoCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.items.find(item => item.productId === productId);

    if (product && cartItem) {
      if (cartItem.quantity >= product.availableQuantity) {
        setErrorMessage(`Can't add more, only ${product.availableQuantity} ${product.name} available`);
        return;
      }
    }

    dispatch({ type: 'ADD_TO_CART', productId });
    setErrorMessage(null);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);

    if (product && quantity > product.availableQuantity) {
      setErrorMessage(`Can't add more, only ${product.availableQuantity} ${product.name} available`);
      return;
    }

    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
    setErrorMessage(null);
  };

  const handleApplyPromo = async () => {
    if (promoCode) {
      const discount = await calculateDiscountFromCode(promoCode);
      dispatch({ type: 'APPLY_DISCOUNT', discountPercent: discount });
      showLoader()
    }
  };

  const subtotal = cart.items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const discount = (subtotal * cart.discountPercent) / 100;
  const total = subtotal - discount + (cart.shippingMethod === 'standard' ? 5.99 : cart.shippingMethod === 'express' ? 12.99 : 0);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-['Plus_Jakarta_Sans']">
      {errorMessage && (
        <div className="fixed px-4 py-2 text-red-700 transform -translate-x-1/2 bg-red-100 border border-red-400 rounded-md shadow-md top-4 left-1/2">
          {errorMessage}
        </div>
      )}
      <Loader />
      <div className="flex flex-col">
        <div className="flex flex-row justify-center gap-1 p-5">
          {/* Products Section */}
          <div className="flex w-[449px] max-w-[920px] flex-col">
            <div className="flex flex-wrap items-start justify-between gap-3 p-4">
              <h1 className="w-[288px] min-w-[288px] text-[36px] font-extrabold leading-[45px] tracking-[-1px] text-[#1C1C21]">
                Shopping Spree
              </h1>
            </div>

            <div className="flex flex-col gap-3 p-4">
              <div className="flex flex-row gap-3">
                <div className="grid grid-cols-2 gap-3">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      cartQuantity={cart.items.find(item => item.productId === product.id)?.quantity || 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="flex w-[360px] flex-col">
            <div className="flex flex-wrap items-start justify-between gap-3 p-4">
              <h2 className="w-[288px] min-w-[288px] text-[32px] font-bold leading-[40px] text-[#1C1C21]">
                Cart
              </h2>
            </div>

            <div className="p-3">
              <CartTable
                items={cart.items}
                products={products}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </div>

            <div className="flex flex-wrap items-end p-3 gap-4 max-w-[480px]">
              <label className="flex flex-col min-w-[160px] flex-1">
                <span className="text-[#1C1C21] text-base font-medium pb-2">Promo Code</span>
                <input
                  placeholder="Enter promo code"
                  className="w-full h-8 px-[15px] rounded-xl border border-[#D6D6DE] bg-white text-[#1C1C21] placeholder-[#3D404A]"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  onBlur={handleApplyPromo}

                />
              </label>
            </div>

            <div className="p-4">
              <div className="flex justify-between py-2">
                <span className="text-[#3D404A] text-sm">Discount</span>
                <span className="text-[#1C1C21] text-sm">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#3D404A] text-sm">Subtotal</span>
                <span className="text-[#1C1C21] text-sm">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#3D404A] text-sm">Shipping</span>
                <select
                  className="text-[#1C1C21] text-sm text-right bg-transparent"
                  value={cart.shippingMethod || ''}
                  onChange={(e) => {
                    showLoader();
                    dispatch({
                      type: "SET_SHIPPING",
                      method: e.target.value as "standard" | "express",
                    });
                  }}
                >
                  <option value="">Pick an option</option>
                  <option value="standard">Standard ($5.99)</option>
                  <option value="express">Express ($12.99)</option>
                </select>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#3D404A] text-sm">Total</span>
                <span className="text-[#1C1C21] text-sm">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3">
              <button
                onClick={() => {
                  dispatch({ type: 'CLEAR_CART' });
                  setErrorMessage(null);
                  showLoader()
                }}
                className="w-full h-10 flex items-center justify-center px-4 bg-[#617AFA] text-[#FAFAFA] text-sm font-bold rounded-full"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;