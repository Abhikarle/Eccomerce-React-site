import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
function App() {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (!existingItem) {
        return [...prevItems, { ...product, quantity: 1 }];
      }
      const updatedCartItems = prevItems.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item;
      })
      return updatedCartItems;
    });
  };
  return (
    <>
      <Navbar search={search} setSearch={setSearch} cartItems={cartItems}/>
      <Routes>
        <Route path="/" element={<Home search={search} onAddToCart={ addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems}/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
