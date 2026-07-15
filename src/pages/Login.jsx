import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import useToast from "../hooks/useToast";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const { setUser } = useAuth();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const initialFormData = {
    email: '',
    password:'',
  }

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      showToastMessage("All fields are required", "error");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      showToastMessage("Please enter a valid email", "error");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((existingUser) => existingUser.email === formData.email);
    if (!user) {
      showToastMessage("User not found", "error");
      return;
    }
    if (user.password !== formData.password) {
      showToastMessage("Incorrect password", "error");
      return;
    }
    setUser(user);
    showToastMessage("Login successful!", "success");
    setFormData(initialFormData);
    navigate("/");
  }
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-8'>
        <h1 className="text-3xl font-bold text-center mb-2 text-black dark:text-white">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Login to continue shopping
        </p>
        <form className="space-y-5" onSubmit={(e) => {
          e.preventDefault();
            handleLogin();
        }}>
          <label className="block mb-2 text-black dark:text-white font-medium">
              Email Address
          </label>
          <div className='relative'>
            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input type="email" autoComplete='username' name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full pl-11 bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-700 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 transition-all duration-300 focus:ring-blue-500" />
          </div>
          <label className="block mb-2 font-medium text-black dark:text-white">
              Password
          </label>
          <div className='relative'>
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"/>
            <input type={showPassword ? "text" : "password"} autoComplete='current-password' name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full pl-11 pr-4 py-3 bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
            <div className="text-right">
              <button
                type="button"
                className="text-sm mt-3 text-blue-600 hover:underline hover:cursor-pointer"
              >
                Forgot Password?
              </button>
              <button type='submit' className=" w-full bg-blue-600 hover:bg-blue-800 text-white py-3 mt-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:cursor-pointer duration-300 font-semibold">
                     Login
              </button>
            </div>
        </form>
        <div className="text-center mt-6">
          <span className="text-gray-500 dark:text-gray-400">
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="ml-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            Register
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Login
