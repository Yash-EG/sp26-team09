//imports react hooks for state and nav, and necessary components
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import MapBackground from '../components/MapBackround';
import CloudLayer from '../components/CloudLayer';

//creates signup component with form state and navigation
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: ''
  });
//function to handle form submission, currently just logs data and navigates to feed
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', formData);
    navigate('/feed');
  };

  return (
    <div className="relative w-full min-h-screen">
      <MapBackground />
      <CloudLayer />
      <div className="fixed inset-0 bg-gradient-to-b from-gray-800 to-black z-10" />
      
      <div className="relative z-20">
        <Navbar />
        
        <div className="px-6 pt-28 pb-12 max-w-md mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            <h1 className="text-white font-bold text-3xl tracking-widest uppercase mb-2 text-center">Sign Up</h1>
            <p className="text-white/70 text-sm text-center mb-6">Join the local music scene</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/80 text-sm font-bold mb-2 block">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400/40 placeholder-white/40"
                  placeholder="John Doe"
                  required
                />
              </div>

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
                <label className="text-white/80 text-sm font-bold mb-2 block">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400/40 placeholder-white/40"
                  placeholder="Greensboro, NC"
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

              <div>
                <label className="text-white/80 text-sm font-bold mb-2 block">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400/40 placeholder-white/40"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all mt-6"
              >
                Create Account
              </button>
            </form>

            <p className="text-white/70 text-sm text-center mt-6">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-purple-400 hover:text-purple-300 font-bold"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
