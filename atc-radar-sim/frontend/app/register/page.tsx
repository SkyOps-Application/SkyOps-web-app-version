
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    age: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Backend expects: email, password, first_name, last_name, age
      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           email: formData.email,
           password: formData.password,
           first_name: formData.first_name,
           last_name: formData.last_name,
           age: parseInt(formData.age) || 0
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      // Automatically login or redirect to login
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C2D57] px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-[#0C2D57] mb-6">Create Account</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Left Column */}
           <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                  First Name
                </label>
                <input
                  id="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="John"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  id="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Doe"
                  required
                />
              </div>

               <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="25"
                />
              </div>
           </div>

           {/* Right Column */}
           <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="pilot@skyops.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="******************"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="******************"
                  required
                />
              </div>
           </div>

           {/* Full Width Button */}
           <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#0C2D57] hover:bg-[#1a3d6f] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
           </div>
        </form>

        <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
                Already have an account? <Link href="/login" className="text-blue-500 hover:text-blue-700 font-bold">Login</Link>
            </p>
        </div>
      </div>
    </div>
  );
}
