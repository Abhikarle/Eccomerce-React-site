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
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [toast, setToast] = useState({
    message: "",
    type: ""
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
  const [showToast, setShowToast] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedDarkMode ?? false;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const toastTimer = useRef(null);
  useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}, [darkMode]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  }
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


  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-black min-h-screen'}>
      <Navbar search={search} setSearch={setSearch} wishlist={wishlist} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      {toast.message && (<Toast message={toast.message} type={toast.type} showToast={showToast} />)}
      <Routes>
        <Route path="/" element={<Home search={search}  currentPage={currentPage} setCurrentPage={setCurrentPage} setSearch={setSearch} />} />
        <Route path="/cart" element={<Cart darkMode={darkMode} />} />
        <Route path='/checkout' element={<Checkout  showToastMessage={showToastMessage} />} />
        <Route path="/product/:id" element={<ProductDetails wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path='/wishlist' element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path='/order-success' element={<OrderSuccess />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
