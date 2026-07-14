import { Link } from 'react-router-dom'
import useCart from "../hooks/useCart";
function Cart({ darkMode }) {
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
     <div className='max-w-5xl mx-auto p-4 space-y-4'>
      {cartItems.map((product) => (
        <div key={product.id} className={`rounded-lg shadow-lg p-5 flex gap-5 ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-black"
        }`}>
            <img src={product.thumbnail} alt={product.title} width={100} className='h-36 w-36 object-contain'/>
            <div className="flex flex-col flex-1 space-y-2">
              <h2 className='font-semibold text-xl text-left line-clamp-2'>{product.title}</h2>
              <p className='font-semibold text-xl text-green-600'>Price: ${(product.price).toFixed(2)}</p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Quantity: {product.quantity}
              </p>
            <p className='text-xl text-amber-500 font-semibold'>Subtotal: ${(product.price * product.quantity).toFixed(2)}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-3">
                {/* Decrease Quantity */}
                <button disabled={product.quantity === 1} className={`w-8 h-8 rounded ${
                  product.quantity === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-400"
                }`} onClick={() => decreaseQuantity(product.id)}>
                  -
                </button>
                {/* Quantity */}
                <span className="font-bold">{product.quantity}</span>
                {/* Increase Quantity */}
                <button className="bg-gray-200 px-3 w-8 h-8 hover:bg-gray-400 py-1 rounded" onClick={() => increaseQuantity(product.id)}>
                  +
                </button>
               </div>
                <button type='button' onClick={() => removeFromCart(product.id)} className='bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white px-2 py-2  rounded-lg  transition-colors duration-300'>🗑 Remove</button>
              </div>
         </div>
        </div>
      ))}
      </div>
      <div className={`mt-6 shadow rounded-lg p-5 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
       <h2 className="text-2xl font-bold mb-4">
         Cart Summary
        </h2>
        <div className='border-t pt-4'>
          <div className="flex justify-between">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between mt-3">
            <span>Total Price</span>
            <span className="font-bold text-green-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
        </div>
        <Link
          to="/checkout"
          className="block w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-lg font-semibold transition"
        >
          Proceed to Checkout
        </Link>
    </div>
    </>
  );
}

export default Cart;
