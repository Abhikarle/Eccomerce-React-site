import { useState, useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import Toast from './components/Toast'
import './App.css'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
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
  const [toast, setToast] = useState({
    message: "",
    type: ""
  });
  const [showToast, setShowToast] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedDarkMode ?? false;
  });
  const toastTimer = useRef(null);
   useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
   }, [cartItems]);
  useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}, [darkMode]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  }
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (!existingItem) {
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
      return prevItems.map(item =>
        item.id === product.id
          ? {
            ...item,
            quantity: item.quantity + (product.quantity || 1)
          }
          : item
      );
    });
    setToast({
      message: "✅ Product added to cart!",
      type: "success"
    });
    setShowToast(true);
    if (toastTimer.current) {
    clearTimeout(toastTimer.current);
    }
    toastTimer.current = setTimeout(() => {
      setShowToast(false);

      setTimeout(() => {
        setToast({
          message: '',
          type: ''
        });
      },300);
    },4000);
  };
  const showToastMessage = (message, type) => {
  setToast({
    message,
    type,
  });

  setShowToast(true);

  if (toastTimer.current) {
    clearTimeout(toastTimer.current);
  }

  toastTimer.current = setTimeout(() => {
    setShowToast(false);
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
  const clearCart = () => {
    setCartItems([]);
  }
  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-black min-h-screen'}>
      <Navbar search={search} setSearch={setSearch} cartItems={cartItems} wishlist={wishlist} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      {toast.message && (<Toast message={toast.message} type={toast.type} showToast={showToast} />)}
      <Routes>
        <Route path="/" element={<Home search={search} onAddToCart={addToCart} removeFromCart={removeFromCart}/>} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} totalItems={totalItems} totalPrice={totalPrice} darkMode={darkMode} />} />
        <Route path='/checkout' element={<Checkout cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice} showToastMessage={showToastMessage} clearCart={clearCart} />} />
        <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path='/wishlist' element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} onAddToCart={addToCart} />} />
        <Route path='/order-success' element={<OrderSuccess totalItems={totalItems} totalPrice={totalPrice} />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
