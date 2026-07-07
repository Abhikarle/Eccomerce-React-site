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
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  const increaseQuantity = (id) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item;
    }))
  };
  const decreaseQuantity = (id) => {
     setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === id);

        if (existingItem.quantity > 1) {
          return prevItems.map(item => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 }
            }
            return item;
          });
        }

        return prevItems.filter(item => item.id !== id);
      });
  };
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return (
    <>
      <Navbar search={search} setSearch={setSearch} cartItems={cartItems}/>
      <Routes>
        <Route path="/" element={<Home search={search} onAddToCart={ addToCart} removeFromCart={removeFromCart}/>} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} totalItems={totalItems} totalPrice={totalPrice}/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
