import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import { User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const initialFormData = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleRegister = () => {
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
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some(
     (existingUser) => existingUser.email === formData.email
    );
    if (emailExists) {
      showToastMessage("Email already registered", "error");
      return;
    }
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    showToastMessage("Registration successful!", "success");
    setFormData(initialFormData);

    navigate("/login");
  }
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8'>
      <h1>
        Create Account
      </h1>
      <div className="space-y-5">
        <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"/>
        <input type="text" name="name" value={formData.name} onChange={handleChange}  placeholder="FullName" className="w-full pl-11 pr-4 py-3 border bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white
        dark:border-gray-700 dark:placeholder:text-gray-400  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"/>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full pl-11 bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-700 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"/>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full pl-11 pr-4 py-3 bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"/>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full pl-11 pr-4 bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-700 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button className='w-full bg-blue-600 hover:bg-blue-800 text-white rounded-lg font-semibold transition py-3
        ' type="button" onClick={handleRegister}>
          Register
          </button>
          <Link>already have an account?</Link>
          <Link>Login</Link>
    </div>
    </div>
    </div>
  )
}

export default Register
