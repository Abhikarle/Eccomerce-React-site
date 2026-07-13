import { Link } from 'react-router-dom';
import useCart from "../hooks/useCart";
function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className='p-4 h-full w-full object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
        <div className="flex justify-center">
           <img src={product.thumbnail} alt={product.title} width={200} />
        </div>
          <h2 className="font-semibold line-clamp-2">{product.title}</h2>
          <p className='font-bold'>${product.price}</p>
          <p>{product.category}</p>
          <p>
          {Array(5)
          .fill()
          .map((_, index) => {
            return (
              <span key={index}>
                {index < Math.floor(product.rating)
                  ? "⭐" : "☆"
                }</span>
            )
          })} {product.rating}
          </p>
          <button type='button' className='bg-red-500 text-white  px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 transition-colors duration-300' onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <Link to={`/product/${product.id}`}
            className='bg-indigo-600 text-white px-4 py-2 rounded-lg mt-2  ml-2.5 hover:bg-blue-600 transition-colors duration-300'>
            View Details
          </Link>
    </div>
  );
}

export default ProductCard;
