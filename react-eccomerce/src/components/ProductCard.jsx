function ProductCard({ product }) {
  return (
    <div>
        <div className='p-4 h-full w-full object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
          <img src={product.image} alt={product.title} width={200} />
          <h2>{product.title}</h2>
          <p className='font-bold'>${product.price}</p>
          <p>{product.category}</p>
          <button className='bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 transition-colors duration-300'>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductCard
