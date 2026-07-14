import { createContext, useState, useEffect } from "react";
const CartContext = createContext();
function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  return savedCartItems || [];
  });
  useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
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
    const clearCart = () => {
    setCartItems([]);
  }
    const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const value = {
  cartItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  totalItems,
  totalPrice,
};

  return (
    <CartContext.Provider value={ value }>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
