import { useState } from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
function Navbar({search, setSearch}) {
  return (
    <nav className="flex justify-between items-center bg-gray-400 text-white shadow-md px-8 py-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" width={50} />
        <h1>React Store</h1>
      </div>
      <div>
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className='border border-gray-300 rounded-lg px-4 py-2 w-96'/>
      </div>
      <div className="flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        <button onClick={() => alert('Login functionality not implemented yet.')}>🌙</button>
      </div>
    </nav>
  );
}

export default Navbar;
