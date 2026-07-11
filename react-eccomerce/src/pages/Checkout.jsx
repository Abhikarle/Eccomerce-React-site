function Checkout({cartItems, totalItems, totalPrice}) {
  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h1 className='text-4xl font-bold mb-8'>Checkout</h1>
      <div className='flex gap-8'>
        <div className='flex-1 bg-white rounded-xl shadow-md p-6'>
          <h2>Shipping Information</h2>

        </div>
        <div className='w-96'>
            <h3>Order Summary</h3>
        </div>
      </div>
    </div>
  )
}

export default Checkout
