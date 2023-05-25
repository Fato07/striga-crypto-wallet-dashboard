import React, { useState } from 'react';

const Index = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const handleSubmit = (e) => {
  e.preventDefault();
  // Implement the login logic here using Striga API
 };

 return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
   <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
    <h2 className="text-2xl font-bold mb-6">Log In</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
     <div>
      <label htmlFor="email" className="block text-sm font-medium">Email</label>
      <input
       id="email"
       type="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className="w-full border-2 rounded p-2 mt-1"
       placeholder="Enter your email"
       required
      />
     </div>
     <div>
      <label htmlFor="password" className="block text-sm font-medium">Password</label>
      <input
       id="password"
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className="w-full border-2 rounded p-2 mt-1"
       placeholder="Enter your password"
       required
      />
     </div>
     <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded">
      Log In
     </button>
    </form>
   </div>
  </div >
 );
};

export default Index;
