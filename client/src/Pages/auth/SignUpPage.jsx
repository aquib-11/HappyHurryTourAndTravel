import React from "react";
import { Eye } from "lucide-react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl flex max-w-4xl w-full overflow-hidden">
        {/* Left side with illustration */}
        <div className="flex-1 p-8 hidden md:block relative">
          <div className="relative h-full flex items-center justify-center">
            <div className="absolute top-10 left-10">
              <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-20 right-10">
              <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
            </div>
            <div className="w-full max-w-md">
              <img
                src="/api/placeholder/400/320"
                alt="Sign up illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Right side with form */}
        <div className="flex-1 p-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-white mb-2">
              Create new account
            </h1>
            <p className="text-gray-400 mb-8">
              Already a member?{" "}
              <a href="#" className="text-indigo-400 hover:text-indigo-300">
                Log in
              </a>
            </p>

            <form className="space-y-6">
              <div>
                <label className="text-gray-300 block mb-2">
                  Enter email id
                </label>
                <input type="email" className="inputText" />
              </div>
              <div>
                <label className="text-gray-300 block mb-2">
                  Enter password
                </label>
                <div className="relative">
                  <input type="password" className="inputText" />
                  <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <div>
                <label className="text-gray-300 block mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <input type="password" className="inext" />
                  <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200"
              >
                Sign up
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              Copyright © 2025 Booking. Build by Stackbros.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
