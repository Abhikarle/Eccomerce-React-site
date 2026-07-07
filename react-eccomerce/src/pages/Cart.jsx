function Cart({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalItems, totalPrice }) {
  return (
    <>
     <div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {cartItems.map((item) => (
        <div key={item.id} className='rounded-lg shadow-lg p-4 bg-white flex flex-col items-center'>
          <img src={item.image} alt={item.title} width={100} className='h-32 w-full object-contain'/>
          <h2 className='font-bold text-lg text-center line-clamp-2'>{item.title}</h2>
          <p className='font-semibold text-xl text-green-600'>Price: ${item.price}</p>
          <div className="flex items-center gap-3 mt-3">
            {/* Decrease Quantity */}
            <button className="bg-gray-200 px-3 py-1 w-8 h-8  rounded hover:bg-gray-400" onClick={() => decreaseQuantity(item.id)}>
              -
            </button>
            {/* Quantity */}
            <span className="font-bold">{item.quantity}</span>
            {/* Increase Quantity */}
            <button className="bg-gray-200 px-3 w-8 h-8 hover:bg-gray-400 py-1 rounded" onClick={() => increaseQuantity(item.id)}>
              +
            </button>
          </div>
          <button type='button' onClick={() => removeFromCart(item.id)} className='bg-fuchsia-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 transition-colors duration-300'>Remove Item</button>
        </div>
      ))}
      </div>
      <div className='mt-4 p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto'>
        <h2 className='text-2xl font-bold mb-2'>Cart Summary</h2>
        <p className='text-lg'>Total Items: {totalItems}</p>
        <p className='text-lg'>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
    </>
  );
}

export default Cart;
