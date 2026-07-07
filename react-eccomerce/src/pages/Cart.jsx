function Cart({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalItems, totalPrice }) {
  if (cartItems.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h2 className='text-2xl font-bold mb-4'>🛒 Your cart is empty</h2>
        <p className='text-lg'>Looks like you haven't added any items to your cart yet.</p>
      </div>
    )
  }
  return (
    <>
     <div className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
      {cartItems.map((product) => (
        <div key={product.id} className='rounded-lg shadow-lg p-4 bg-white flex flex-col items-center'>
          <img src={product.thumbnail} alt={product.title} width={100} className='h-48 w-48 object-contain'/>
          <h2 className='font-bold text-lg text-center line-clamp-2'>{product.title}</h2>
          <p className='font-semibold text-xl text-green-600'>Price: ${(product.price * product.quantity).toFixed(2)}</p>
          <div className="flex items-center gap-3 mt-3">
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
          <button type='button' onClick={() => removeFromCart(product.id)} className='bg-fuchsia-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 transition-colors duration-300'>Remove Item</button>
        </div>
      ))}
      </div>
      <div className="mt-6 bg-white shadow rounded-lg p-5">
       <h2 className="text-2xl font-bold mb-4">
         Cart Summary
       </h2>
      <div className="flex justify-between">
        <span>Total Items</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between mt-2">
        <span>Total Price</span>
        <span className="font-bold text-green-600">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
         <button
          className="w-full mt-5 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Proceed to Checkout
        </button>
    </div>
    </>
  );
}

export default Cart;
