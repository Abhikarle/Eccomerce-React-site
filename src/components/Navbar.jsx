import { Link } from 'react-router-dom';
import useCart from "../hooks/useCart";
import useTheme from "../hooks/useTheme";
import useWishlist  from '../hooks/useWishlist';
import logo from '../assets/logo.svg';
import SiteLogo from '../assets/SiteLogo.png';
import SearchBar from "./SearchBar";
import useAuth from "../hooks/useAuth";
import { User } from 'lucide-react'
function Navbar({ search, setSearch }) {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="flex flex-wrap justify-between items-center bg-gray-400 gap-4 shadow-md backdrop:blur px-4 py-4 text-white">
      <div className="flex items-center justify-center min-w-20">
        <img src={SiteLogo} alt=" Site Logo" width={100} className='w-20 sm:w-24 md:w-24 h-auto object-contain'/>
      </div>
      <div className='flex-1 flex justify-center px-4'>
      <SearchBar
        search={search}
        setSearch={setSearch}
      />
      </div>
      <div className="flex flex-wrap justify-center sm:gap-5 items-center gap-6 text-sm md:text-base lg:text-lg">
        <Link to="/" className='hover:text-gray-700 transition-colors'>Home</Link>
        <Link to='/wishlist' className='relative inline-block hover:text-gray-700 transition-colors'>
          ❤️
           {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold rounded-full min-w-4.5 h-4.5 px-1 flex items-center justify-center shadow-md border border-white">
              {wishlist.length}
            </span>
          )}
        </Link>
        <Link to="/cart" className='relative inline-block p-1 hover:text-gray-200 transition-colors'>
          <img src={logo} alt="Cart Icon" width={50} className='w-6 sm:w-8 h-auto object-contain inline-block' />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold rounded-full min-w-4.5 h-4.5 px-1 flex items-center justify-center shadow-md border border-white">
              {cartItems.length}
            </span>
          )}
          </Link>
        <button onClick={() => {
          toggleDarkMode();
        }} className="hover:scale-200 transition-transform">{darkMode ? '☀️' : '🌙'}</button>
        <div className="flex items-center gap-3">
          {user ? (
              <div className='flex items-center gap-4'>
                <Link to="/profile" className="flex items-center gap-2 font-semibold hover:text-gray-200 transition-colors"
                >
                <User size={30} className='text-white text-xl' />
                <span>Hello, {user.displayName}</span>
                </Link>
                <button onClick={logout} className='px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded-lg transition hover:cursor-pointer'>Logout</button>
              </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-white/40 text-white rounded-lg hover:bg-white hover:text-gray-900 hover:cursor-pointer transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:cursor-pointer px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
