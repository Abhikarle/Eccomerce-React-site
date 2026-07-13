import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import SkeletonCard from "../components/SkeletonCard";
function Home({ search, onAddToCart, currentPage, setCurrentPage }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const filteredProducts = products.filter(product => {

    const matchesCategory = selectedCategory === 'All' ?
   true : product.category === selectedCategory;

    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());

    const matchesPrice = priceRange === 'All' ? true : priceRange === '0-100' ? product.price >= 0 && product.price <= 100 : priceRange === '100-500' ? product.price >= 100 && product.price <= 500 : priceRange === '500+' ? product.price >= 500 : false;

   return matchesCategory && matchesSearch && matchesPrice;

  });
  const sortedProducts = [...filteredProducts];
  if (sortOption === "low-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  else if (sortOption === "rating") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  else if (sortOption === "name") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  }
  const productsPerPage = 8;
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = sortedProducts.slice(firstProductIndex, lastProductIndex);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.products);
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [])
  useEffect(() => {
    setCurrentPage(1);

  }, [search, selectedCategory, sortOption, setCurrentPage]);

  if (loading) {
    return (
      <div className='grid grid-cols-4 gap-6'>
        {Array(8)
          .fill()
          .map((_, index) => (
            <SkeletonCard key={index} />

        ))}
      </div>
    );
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  const categories = [
    "All",
    ...new Set(products.map(product => product.category))
  ];
  return (
    <div>
      <div className=' flex flex-wrap gap-4 items-center mb-6'>
        <label className='mr-3 mt-4 font-semibold'>Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          className='border mt-3.5 rounded-lg p-2'
        >
          {categories.map(category => {
            return (
              <option key={category} value={category}>{category}</option>
            )
          })}
        </select>
        <div className='mt-4'>
          <label className='mr-3 font-semibold'>
            Price:
          </label>
          <select
            value={priceRange}
            onChange={(e) =>
              setPriceRange(e.target.value)}
            className='border rounded-lg p-2'
          >
            <option value="All">All</option>
            <option value="0-100">$0 - $100</option>
            <option value="100-500">$100- $500</option>
            <option value="500+">$500+</option>

          </select>
        </div>
        <div className='mt-4'>
          <label className='mr-3 font-semibold'>
            Sort By:
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className='border rounded-lg p-2'
          >
            <option value='default'>Default</option>
            <option value='low-high'>Price: Low → High</option>
            <option value='high-low'>Price: High → Low</option>
            <option value='rating'>Highest Rating</option>
            <option value='name'>Name(A-Z)</option>
          </select>
        </div>
      </div>
      <ProductGrid products={currentProducts} onAddToCart={onAddToCart} />
      <div className='flex justify-center gap-2 mt-8'>
        {Array(totalPages)
          .fill()
          .map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-3 rounded
                  ${
                currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-400'
                }`}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
}

export default Home;
