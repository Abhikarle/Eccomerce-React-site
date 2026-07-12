import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
function Home({ search, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredProducts = products.filter(product => {

    const matchesCategory = selectedCategory === 'All' ?
   true : product.category === selectedCategory;

   const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());

   return matchesCategory && matchesSearch;

});
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

  if (loading) {
    return <p>Loading...</p>;
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
      <div className='mb-6'>
        <label className='mr-3 font-semibold'>Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          className='border rounded-lg p-2'
        >
          {categories.map(category => {
            return (
              <option key={category} value={category}>{category}</option>
            )
          })}
        </select>
      </div>
           <ProductGrid products={filteredProducts} onAddToCart={onAddToCart}/>
    </div>
  );
}

export default Home;
