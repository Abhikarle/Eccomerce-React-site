import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from './context/ToastContext.jsx';
import './index.css'
import App from './App.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
                <App />
            </WishlistProvider>
          </CartProvider>
          </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
