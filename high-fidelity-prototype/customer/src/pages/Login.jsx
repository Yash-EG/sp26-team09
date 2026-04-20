//nav hooks and necessary components
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import MapBackground from '../components/MapBackround';
import CloudLayer from '../components/CloudLayer';

//login form component
export default function Login() {
  const navigate = useNavigate();
  //object for email password form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  //function to handle form submission, currently just logs data and navigates to profile
const handleSubmit = async (e) => {
  //prevent reloading page on form submit
  e.preventDefault();

  // Send GET request to backend to retrieve customer by email
  try {
    const response = await fetch(`http://localhost:8080/api/customers/email/${encodeURIComponent(formData.email)}`);

    if (!response.ok) {
      throw new Error("Customer not found");
    }

    const customer = await response.json();

    console.log("Customer returned from backend:", customer);
    console.log("Saving customerId:", customer.userId);

    //store relevant customer data in local storage for later use
    localStorage.setItem("customerId", customer.userId);
    localStorage.setItem("customerEmail", customer.email);
    localStorage.setItem("customerName", customer.name);

    //navigate to profile on sign in
    navigate('/profile');
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your email.");
  }
};

  return (
    //outer layer for positioning
    <div className="relative w-full min-h-screen">
      <MapBackground />
      <CloudLayer />
      <div className="fixed inset-0 bg-gradient-to-b from-gray-800 to-black z-10" />
      
      <div className="relative z-20">
        <Navbar />
        <div className="px-6 pt-28 pb-12 max-w-md mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            <h1 className="text-white font-bold text-3xl tracking-widest uppercase mb-2 text-center">Log In</h1>
            <p className="text-white/70 text-sm text-center mb-6">Welcome back to the scene</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/80 text-sm font-bold mb-2 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400/40 placeholder-white/40"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-bold mb-2 block">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400/40 placeholder-white/40"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all mt-6"
              >
                Log In
              </button>
            </form>

            <p className="text-white/70 text-sm text-center mt-6">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/signup')}
                className="text-purple-400 hover:text-purple-300 font-bold"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
