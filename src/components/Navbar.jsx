import { Link } from 'react-router-dom';
import useCart from "../hooks/useCart";
import useTheme from "../hooks/useTheme";
import useWishlist  from '../hooks/useWishlist';
import logo from '../assets/logo.svg';
import SiteLogo from '../assets/SiteLogo.png';
import SearchBar from "./SearchBar";
function Navbar({ search, setSearch }) {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="flex justify-between items-center bg-gray-400 text-white shadow-md px-8 py-4 dark:bg-gray-900">
      <div className="flex items-center justify-center min-w-20">
        <img src={SiteLogo} alt=" Site Logo" width={100} className='w-20 sm:w-24 md:w-24 h-auto object-contain'/>
      </div>
      <SearchBar
        search={search}
        setSearch={setSearch}
      />
      <div className="flex items-center gap-6 text-sm md:text-base lg:text-lg">
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
        <button onClick={toggleDarkMode} className="hover:scale-200 transition-transform">{darkMode ? '☀️' : '🌙'}</button>
      </div>
    </nav>
  );
}

export default Navbar;
