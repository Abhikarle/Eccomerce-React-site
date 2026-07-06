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
    setCartItems(prevItems => [...prevItems, product]);
  }
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
