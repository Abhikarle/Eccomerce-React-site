import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Home from './pages/Home'
import useTheme from './hooks/useTheme'
import ProductDetails from './pages/ProductDetails'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  return (
      <div
        className={
         darkMode
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-white text-black"
        }
       >
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search}  currentPage={currentPage} setCurrentPage={setCurrentPage} setSearch={setSearch} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/checkout' element={
          <ProtectedRoute>
            <Checkout />
            </ProtectedRoute>} />
        <Route path="/product/:id" element={<ProductDetails  />} />
        <Route path='/wishlist' element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>} />
        <Route path='/order-success' element={<OrderSuccess />} />
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
