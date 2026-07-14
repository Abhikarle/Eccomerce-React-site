import { Link } from 'react-router-dom';
import useCart from "../hooks/useCart";
import useToast from '../hooks/useToast'
import useWishlist from "../hooks/useWishlist";
function Wishlist() {
  const { addToCart } = useCart();
  const { showToastMessage } = useToast();
  const { wishlist, toggleWishlist } = useWishlist();
  if (wishlist.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center  text-center px-6 min-h-[70vh]'>
        <div className="text-7xl mb-6">💖</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Your Wishlist is Empty!
        </h1>
        <p className="mt-3 text-gray-500 text-lg max-w-md">
          Looks like you haven't added any products yet.
          Browse our collection and save your favorite items here.
        </p>
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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
      {wishlist.map((item) => {
          const rating = Math.round(item.rating);
          return(
              <div key={item.id} className='border rounded-lg shadow p-4 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 text-black dark:text-white dark:border-gray-700 dark:shadow-black/40 '>
              <img src={item.thumbnail} alt={item.title} className='w-full h-48 object-contain mx-auto'/>
              <h2 className='text-lg font-bold mt-2 line-clamp-2'>{item.title}</h2>
                <p className='text-gray-600 dark:text-gray-300 text-sm'>{item.brand}</p>
              {Array.from({ length: 5 }).map((_, index) =>  (
                  <span key={index}>
                    {index < rating ? "⭐" : "☆"}
                  </span>
                ))}
                {item.stock > 0 ? (
                  <p className="text-green-600 font-semibold">
                    ✅ In Stock ({item.stock})
                  </p>
                  ) : (
                  <p className="text-red-600 font-semibold">
                    ❌ Out of Stock
                  </p>
                )}
              <p className='text-2xl font-bold text-orange-600 mt-2'>${item.price.toFixed(2)}</p>
              <div className="flex gap-3 mt-5">
                <button className='w-full mt-5 bg-green-400 text-white py-2 rounded-lg hover:bg-black' onClick={() => {
                  addToCart(item);
                  showToastMessage("✅ Product added to cart!", "success");
                }}>Add To cart</button>
                <button className='w-full mt-5 bg-indigo-700 text-white py-2 rounded-lg hover:bg-black' onClick={() => toggleWishlist(item)}>🗑 Remove</button>
              </div>
            </div>
        )})}
      </div>
  )
}

export default Wishlist
