import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
function Home({ search, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
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
  return (
    <div>
      <ProductGrid products={filteredProducts} onAddToCart={onAddToCart}/>
    </div>
  );
}

export default Home;
