import { Link } from 'react-router-dom'
import useCart from "../hooks/useCart";
import useTheme from "../hooks/useTheme";
function Cart() {
   const { darkMode } = useTheme();
  const {
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  totalItems,
  totalPrice,
  } = useCart();
  if (cartItems.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h2 className='text-2xl font-bold mb-4'>🛒 Your cart is empty</h2>
        <p className='text-lg'>Looks like you haven't added any items to your cart yet.</p>
        <Link
          to="/"
          className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
                >
          🛍 Continue Shopping
        </Link>
      </div>
    )
  }
  return (
    <>
     <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4'>
      {cartItems.map((product) => (
        <div key={product.id} className={`
            flex flex-col sm:flex-row gap-5 p-5 rounded-2xl
            transition-all duration-300
            border
            ${
              darkMode
                ? "bg-gray-800 border-gray-700 shadow-xl shadow-black/30"
                : "bg-white border-gray-200 shadow-lg"
            }
          `}>
            <img src={product.thumbnail} alt={product.title} width={100} className='h-36 w-36 object-contain'/>
            <div className="flex flex-col flex-1 space-y-2">
              <h2  className={`text-xl font-bold line-clamp-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>{product.title}
              </h2>
              <p className='font-semibold text-xl text-green-600'>Price: ${(product.price).toFixed(2)}</p>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Quantity: {product.quantity}
              </p>
            <p className='text-xl text-amber-500 font-semibold'>Subtotal: ${(product.price * product.quantity).toFixed(2)}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-3">
                {/* Decrease Quantity */}
                <button disabled={product.quantity === 1} className={`w-8 h-8 rounded transition
                ${darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-black"
                }`} onClick={() => decreaseQuantity(product.id)}>
                  -
                </button>
                {/* Quantity */}
                <span className="font-bold">{product.quantity}</span>
                {/* Increase Quantity */}
                <button className={`w-8 h-8 rounded transition
                ${darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-black"
                }`} onClick={() => increaseQuantity(product.id)}>
                  +
                </button>
               </div>
              <button type='button' onClick={() => removeFromCart(product.id)}
              className=" px-4 py-2
                rounded-lg
                bg-red-600
                hover:bg-red-700
                text-white
                font-medium
                cursor-pointer
                transition-all
                hover:scale-105
                ">🗑 Remove</button>
              </div>
         </div>
        </div>
      ))}
      </div>
      <div className={`mt-6 shadow rounded-lg p-5 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
       <h2 className={`
          max-w-5xl mx-auto mt-6
          rounded-2xl
          p-6
          border
          transition-all duration-300
          ${ darkMode
            ? "bg-gray-800 border-gray-700 shadow-xl shadow-black/30"
            : "bg-white border-gray-200 shadow-lg"
          }
        `}>
         Cart Summary
        </h2>
        <div className="mt-6 rounded-xl bg-gray-50 dark:bg-gray-900 p-5">
        <div className="flex justify-between mb-4">
          <span className="text-gray-500 dark:text-gray-900">
            Total Items
          </span>
          <span className="font-bold text-lg text-white">
            {totalItems}
          </span>
        </div>
          <div className="border-t border-dashed border-gray-300 dark:border-gray-700 my-4"></div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Grand Total
              </p>
              <p className="text-3xl font-black text-green-500">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full">
              <span className="text-green-700 dark:text-green-300 font-bold">
                ✔ Ready to Checkout
              </span>
            </div>
          </div>
        </div>
        <Link
          to="/checkout"
          className="block w-full mt-6 py-3 bg-amber-500 rounded-xl  font-semibold text-center text-white  transition-all duration-300 hover:scale-[1.02]"
        >
          Proceed to Checkout
        </Link>
    </div>
    </>
  );
}

export default Cart;
