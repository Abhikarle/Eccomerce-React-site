import { useLocation, useNavigate } from "react-router-dom";
function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state || {
      totalItems: 0,
      totalPrice: 0,
  };
  const handleContinueShopping = () => {
    navigate('/');
  }
  return (
    <div className='min-h-screen flex items-center justify-center px-6 py-12'>
      <div className='w-full max-w-3xl  rounded-3xl bg-white dark:bg-gray-800 text-black dark:text-white shadow-xl dark:shadow-black/40 p-10 text-center transition-all duration-300'>
        <h1 className='text-4xl font-extrabold text-green-600 mb-4'>🎉 Order Placed Successfully!</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border-gray-200dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

        <div className="flex justify-between mb-2">
          <span>Total Items</span>
          <span>{orderData.totalItems}</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Total Price</span>
          <span>${orderData.totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={handleContinueShopping} className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Continue Shopping</button>
      </div>
      </div>
    </div>
  )
}

export default OrderSuccess
