import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setProduct(data);
        const relatedResponse = await fetch(`https://dummyjson.com/products/category/${data.category}`);
        const relatedData = await relatedResponse.json();
        const filteredRelatedProducts = relatedData.products.filter(
            item => item.id !== data.id
        );
        setRelatedProducts(filteredRelatedProducts);
        setSelectedImage(data.thumbnail);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

    };
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <h2>Loading....</h2>
  }
  if (error) {
    return <p>Error: {error}</p>
  }
  if (!product) {
    return <p>Product is not found.</p>
  }
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const rating = Math.round(product.rating);
  return (
    <>
      <div className='max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-10'>
        {/* Left Side */}
      <div>
        <img src={selectedImage} alt={product.title} className='h-96 w-full object-contain transition-all duration-300' />
        {/* Images Gallery */}
        <div className='flex gap-3 mt-3'>
          {product.images.map((image, index) => (
            <img src={image} key={index} onClick={() => setSelectedImage(image)} className={`w-20 h-20 object-contain border rounded cursor-pointer transition-all duration-300 hover:scale-105 ${selectedImage === image ? 'border-blue-600 border-2' : 'border-gray-300'}`} alt={`${product.title} ${index + 1}`} />
          ))}
        </div>
      </div>
      <div className='max-w-7xl mx-auto p-8 space-y-5'>
        <h2 className='text-4xl font-bold'>{product.title}</h2>
        <div className='flex items-center gap-4'>
          <p className='text-4xl font-bold text-orange-500'>${product.price.toFixed(2)}</p>
          <p className='text-gray-500 text-xl line-through'>${originalPrice}</p>
          <span className=' text-white bg-red-500 px-2 py-1 font-semibold rounded-full'>{product.discountPercentage}% OFF</span>
        </div>
        <div className='flex'>
          {Array.from({ length: 5 }).map((index) => {
            <span key={index}>
              {index < rating ? "⭐" : "☆"}
            </span>
          })}
        </div>
        <p>
          <span className="font-semibold">Brand: </span>{product.brand}
        </p>
        <p>
          <span className='font-semibold'>Category: </span>{product.category}
        </p>
        <div>
          <h3 className="font-semibold mb-1">Description: </h3>
          <p className="text-gray-600">
            {product.description}
          </p>
        </div>
        {product.stock > 0 ? (
          <p className="text-green-600 font-semibold">
            ✅ In Stock ({product.stock})
          </p>
        ) : (
          <p className="text-red-600 font-semibold">
            ❌ Out of Stock
          </p>
        )}
        <p><span className="font-semibold">SKU: </span>{product.sku}</p>
        <div className='flex flex-wrap gap-3'>
          {product.tags.map((tag) => (
              <span key={tag} className='bg-gray-300 px-3 py-2 rounded-full font-semibold text-sm'>{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-3">
            {/* Decrease Quantity */}
            <button disabled={quantity === 1} className={`w-10 h-10 rounded ${
              quantity === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-400"
            }`} onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1)
              }
            }}>
              -
            </button>
            {/* Quantity */}
            <span className="font-bold text-xl w-8 text-center">{quantity}</span>
            {/* Increase Quantity */}
            <button className="bg-gray-300 px-3 w-10 h-10 hover:bg-gray-400 py-1 rounded" onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>
        <button className='w-full mt-5 bg-indigo-700 text-white py-2 rounded-lg hover:bg-black' onClick={() => {
          console.log('Button Clicked')
          console.log(product)
          console.log(quantity)
          onAddToCart({ ...product, quantity })
          }}
          >
            🛍 Add to Cart
          </button>
        </div>
        </div>
      <div className='max-w-7xl mx-auto p-7'>
        <h2 className='text-2xl font-bold mt-10 mb-5'>
          Related  Products
        </h2>
       <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        {relatedProducts.map((item) => {
          return (
          <Link key={item.id} to={`/product/${item.id}`} className="border rounded-lg p-4 shadow hover:shadow-xl hover:-translate-y-1 transition duration-300 block h-full">
            <img
              src={item.thumbnail}
              alt={item.title}
              className='h-40 w-full object-contain mx-auto'/>
            <h3 className='font-semibold mt-2 line-clamp-2'>
              {item.title}
            </h3>
            <p className='text-orange-500 font-bold'>
              ${item.price}
            </p>
          </Link>
        )})}
      </div>
      </div>
     </>
  );
}
export default ProductDetails
