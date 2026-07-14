import { createContext, useState, useEffect } from "react";
const WishlistContext = createContext();

function WishlistProvider({ children }) {
   const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
   });
   useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
   }, [wishlist]);
  const toggleWishlist = (product) => {
  setWishlist(prevWishlist => {
    const existingItem = prevWishlist.find(
      item => item.id === product.id
    );

    if (existingItem) {
      return prevWishlist.filter(item => item.id !== product.id);
    }

    return [...prevWishlist, product];
  });
  };

  const clearWishlist = () => {
    setWishlist([]);
  }
   const value = {
    wishlist,
    toggleWishlist,
    clearWishlist,
  };
  return (
       <WishlistContext.Provider value={ value }>
            {children}
        </WishlistContext.Provider>
  );
}

export { WishlistContext, WishlistProvider };
