import { createContext, useState, useRef, useEffect } from 'react'
import Toast from '../components/Toast';
const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toast, setToast] = useState({
  message: "",
  type: "",
});

const [showToast, setShowToast] = useState(false);

const toastTimer = useRef(null);
useEffect(() => {
  return () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
  };
}, []);
  const showToastMessage = (message, type) => {
      console.log("Toast:", message, type);

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

      setTimeout(() => {
       setToast({
         message: "",
         type: "",
        });
      }, 300); // matches the fade-out animation
    }, 4000);
  }

  return (
       <ToastContext.Provider value={{ showToastMessage } }>
        {children}
        {toast.message && (<Toast message={toast.message} type={toast.type} showToast={showToast} />)}
        </ToastContext.Provider>
  )
}

export {ToastContext, ToastProvider }
