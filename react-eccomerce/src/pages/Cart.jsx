function Cart({ cartItems, removeFromCart }) {
  return (
    <div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {cartItems.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.title} width={100} />
          <h2>{item.title}</h2>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button type='button' onClick={() => removeFromCart(item.id)} className='bg-fuchsia-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 transition-colors duration-300'>Remove Cart</button>
        </div>
      ))}
      <p>Total Items: {cartItems.length}</p>
    </div>
  );
}

export default Cart;
