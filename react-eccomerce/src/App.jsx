import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Toast from './components/Toast'
import './App.css'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Wishlist from './pages/Wishlist'
function App() {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState(() => {
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  return savedCartItems || [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [toast, setToast] = useState("");
   useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
   }, [cartItems]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (!existingItem) {
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
      const updatedCartItems = prevItems.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + (product.quantity || 1) }
        }
        return item;
      })
      return updatedCartItems;
    });
    setToast({
      message: "✅ Product added to cart!",
      type: "success"
    });
    setTimeout(() => {
      setToast({
        message: '',
        type: ''
      });
    }, 4000);
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
      <Navbar search={search} setSearch={setSearch} cartItems={cartItems} wishlist={wishlist} />
      {toast.message && ( <Toast message={toast.message} type={toast.type} />)}
      <Routes>
        <Route path="/" element={<Home search={search} onAddToCart={addToCart} removeFromCart={removeFromCart}/>} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} totalItems={totalItems} totalPrice={totalPrice}/>} />
        <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path='/wishlist' element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} onAddToCart={addToCart} />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
