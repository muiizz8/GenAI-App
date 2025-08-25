'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text(); // Get raw response for debugging
        // console.error('Signup response:', text);
        try {
          const data = JSON.parse(text);
          setError(data.error || 'Failed to signup');
        } catch (jsonError) {
          console.error('JSON parse error:', jsonError);
          setError('Invalid response from server');
        }
        return;
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      router.push('/chat');
    } catch (error) {
      console.error('Signup fetch error:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex items-center justify-center p-4">
      <form onSubmit={handleSignup} className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Signup</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
        <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg hover:opacity-90 transition-opacity">
          Signup
        </button>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-violet-400 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;