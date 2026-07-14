import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useToast  from '../hooks/useToast'
import useCart from "../hooks/useCart";
function Checkout() {
  const { showToastMessage } = useToast();
  const {
    cartItems,
    totalItems,
    totalPrice,
    clearCart,
} = useCart();
  const initialFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
};

const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "Enter your phone number",
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      name: "pincode",
      label: "Pincode",
      type: "number",
      placeholder: "Enter your pincode",
    },
  ];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  const handlePlaceOrder = () => {
   const emptyField = fields.find(
      (field) => !formData[field.name]
   );
    if (emptyField) {
      showToastMessage(
        `${emptyField.label} is required`,
        "error"
      );
      return;
    }
    if (!emailRegex.test(formData.email)) {
      showToastMessage(
      "Please enter a valid email address.",
      "error"
      );
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      // show phone error toast
      showToastMessage(
      "Phone number must be exactly 10 digits.",
      "error"
      );
      return;
    }
    if (!formData.address) {
      showToastMessage("Address is required", "error");
      return;
    }
    setLoading(true);
     setTimeout(() => {
    setLoading(false);
    const orderData = {
      totalItems,
      totalPrice,
      };

      clearCart();

    showToastMessage(
    "🎉 Order placed successfully!",
    "success"
    );
    setFormData(initialFormData);
    navigate('/order-success', {
      state: orderData,
    });
  }, 3000);
  }
  return (
    <div className='max-w-7xl mx-auto p-6 min-h-screen'>
      <h1 className='text-4xl font-bold mb-8'>Checkout</h1>
      <div className='flex flex-col lg:flex-row gap-8'>
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 dark:bg-gray-800 text-black dark:text-white dark:shadow-black/40 transition-all duration-300">
      { fields.map((field) => (
          <div key={field.name} className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {field.label}
            </label>

            <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            disabled={loading}
            placeholder={field.placeholder}
            className={`w-full p-4 border transition rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed" : "bg-white dark:bg-gray-900"} border-gray-300 dark:border-gray-700 text-black dark:text-white placeholder-gray-400`}
            />
          </div>
        ))
      }
        <div className="mb-5">
            <label className="block text-sm font-medium text-white mb-2">
              Address
            </label>

            <textarea
              name="address"
              rows="4"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your address"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
      </div>
        <div className="w-full lg:w-96 bg-white rounded-2xl dark:bg-gray-800 text-black dark:text-white shadow-lg transition-all duration-300 p-6">
          <h2 className='text-2xl font-bold mb-6'>Order Summary</h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='flex gap-4 border-b border-gray-200 py-4 dark:border-gray-700'>
              <img src={item.thumbnail} alt={item.title} className='w-20 h-20 object-cover rounded-lg border shrink-0' />
              <div className='flex-1'>
                <h3 className="font-semibold line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: {item.quantity}
                </p>

                <p className="font-bold text-lg">
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
          <div className='mt-6 pt-6 border-t border-gray-200 dark:border-gray-700'>
            <div className='flex justify-between font-semibold mt-2'>
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className='flex justify-between text-xl items-center py-3 font-bold mt-4 rounded-xl bg-gray-100 dark:bg-gray-900 px-4'>
              <span>Total Price:</span>
              <span className='text-2xl font-black text-green-500'>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={loading}

              className={`w-full mt-6 text-white py-3 rounded-xl font-bold transition-all duration-300 hover:scale-[1.04] ${loading ? "bg-gray-500 cursor-not-allowed opacity-70" : "bg-blue-600 hover:bg-blue-800"}`}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
