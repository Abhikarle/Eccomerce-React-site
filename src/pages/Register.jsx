import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import { auth } from "../firebase/firebase";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
function Register() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const firebaseRegisterErrors = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/network-request-failed": "Please check your internet connection.",
  };
      const initialFormData = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleRegister = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      showToastMessage("All fields are required", "error");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      showToastMessage("Please enter a valid email", "error");
      return;
    }
    if (formData.password.length < 6) {
      showToastMessage("Password must be at least 6 characters", "error");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showToastMessage("Passwords do not match", "error");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      })
      await userCredential.user.reload();
      setUser(auth.currentUser);
      showToastMessage("Registration successful!", "success");
      setFormData(initialFormData);

      navigate("/");
    } catch (error) {
        showToastMessage(
          firebaseRegisterErrors[error.code] || "Registration failed.",
          "error"
        );
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8'>
      <h1 className='text-3xl font-bold text-center mb-2 text-black dark:text-white'>
        Create Account
      </h1>
      <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
            <User size={30} className="text-white" />
          </div>
      </div>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Register to continue shopping
      </p>
      <div className="space-y-5">
        <div className='relative'>
          <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"/>
          <input type="text" autoComplete='name' name="name" value={formData.name} onChange={handleChange}  placeholder="FullName" className="w-full pl-11 pr-4 py-3 border bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white focus:border-blue-500 transition-all duration-300
          dark:border-gray-700 dark:placeholder:text-gray-400  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className='relative'>
          <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"/>
          <input type="email" autoComplete='email' name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full pl-11 bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-700 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 transition-all duration-300 focus:ring-blue-500" />
          </div>
        <div className='relative'>
          <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"/>
            <input type={showPassword ? "text" : "password"} autoComplete='new-password' name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full pl-11 pr-4 py-3 bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
        <div className='relative'>
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"/>
            <input type={showPassword ? "text" : "password"} autoComplete='new-password' name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full pl-11 pr-4 bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-700 py-3 border rounded-lg focus:outline-none focus:border-blue-500  transition-all duration-300 focus:ring-2 focus:ring-blue-500" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
          <button className='w-full bg-blue-600 hover:bg-blue-800  text-white rounded-lg font-semibold hover:cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 py-3
        ' type="button" onClick={handleRegister}>
          Register
          </button>
          <div className="text-center mt-6">
            <span className="text-gray-500 dark:text-gray-400">
                Already have an account?
            </span>

            <Link to="/login" className="ml-2 text-blue-600 hover:text-blue-800 font-semibold">
                Login
            </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Register
