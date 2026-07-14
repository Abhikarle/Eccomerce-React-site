import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import SkeletonCard from "../components/SkeletonCard";
import { SearchX } from "lucide-react";
import useDebounce from '../hooks/useDebounce';
function Home({ search, setSearch, currentPage, setCurrentPage }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState("All");
  const [sortOption, setSortOption] = useState("default");
   const debounceSearch = useDebounce(search, 300);
  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setPriceRange('All');
    setSortOption('default');
    setCurrentPage(1);
   }
  const filteredProducts = products.filter(product => {

    const matchesCategory = selectedCategory === 'All' ?
   true : product.category === selectedCategory;


    const searchText = debounceSearch.toLowerCase().trim();

    const matchesSearch = product.title?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText) ||
      product.description?.toLowerCase().includes(searchText);

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

  }, [debounceSearch, selectedCategory, sortOption, setCurrentPage]);

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
      <div className=' flex flex-col sm:flex-row flex-wrap gap-4 items-center mb-6'>
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
      {currentProducts.length > 0 ? (
        <ProductGrid products={currentProducts} />
      ) : (
          <div className='text-center py-16'>
            <SearchX className="w-20 h-20 text-slate-300 mx-auto mb-5" />
            <h2 className="text-3xl font-bold mt-4">
                No Products Found
            </h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Try changing your search, category or price filter.
            </p>
            <button
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={clearFilters}
            >
                Clear Filters
            </button>
          </div>

      )}
      <div className='flex flex-wrap justify-center gap-2 mt-8'>
         <button className={`px-4 py-3 rounded transition ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-800 cursor-pointer'}`} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>← Previous</button>
        {Array(totalPages)
          .fill()
          .map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-3 rounded
                    ${currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-400'
                  }`}
              >
                {index + 1}
                </button>
            )
          })}
          <button disabled={currentPage === totalPages}  className={`px-4 py-3 rounded transition ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-800 cursor-pointer'}`} onClick={() => setCurrentPage(currentPage + 1)}>Next →</button>
      </div>
    </div>
  );
}

export default Home;
