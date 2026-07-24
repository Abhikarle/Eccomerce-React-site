import { lazy, Suspense, useState } from "react";
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import Loading from './components/LoadingSpinner';
import Home from './pages/Home'
import Cart from './pages/Cart'
const Profile = lazy(() => import('./pages/Profile'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import ("./pages/Register"));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const NotFound = lazy(() => import("./pages/NotFound"));
import useTheme from './hooks/useTheme'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  return (
      <div
        className={
         darkMode
          ? "min-h-screen flex flex-col bg-gray-900 text-white"
          : "min-h-screen flex flex-col bg-white text-black"
        }
       >
      <Navbar search={search} setSearch={setSearch} />
      <main className='flex-1'>
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
