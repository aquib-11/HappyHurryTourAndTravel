import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({ type: 'error', message: 'Please provide email' });
      return;
    }

    try {
      setIsLoading(true);
      // Add your API call here to handle password reset
      // await customFetch.post('/auth/forgot-password', { email });
      setStatus({
        type: 'success',
        message: 'Please check your email for reset instructions'
      });
      setEmail('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: error?.response?.data?.msg || 'Something went wrong'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="max-w-md w-full space-y-8 bg-[var(--bs-card-bg)] p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h1    className="font-sans font-bold text-white">Forgot Password?</h1>
          <p className="mt-2 text-gray-400">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        {/* Status Alert */}
        {status.message && (
          <div className={`p-4 rounded-lg ${
            status.type === 'error' 
              ? 'bg-red-900/50 text-red-200 border border-red-800' 
              : 'bg-green-900/50 text-green-200 border border-green-800'
          }`}>
            {status.message}
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
          </button>

          {/* Footer Links */}
          <div className="flex items-center justify-center space-x-4 text-sm">
            <button
              onClick={() => window.location.href = '/login'}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Remember your password?
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={() => window.location.href = '/register'}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Create account
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>
            For security reasons, we'll send a link to your email that expires in 1
            hour.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;