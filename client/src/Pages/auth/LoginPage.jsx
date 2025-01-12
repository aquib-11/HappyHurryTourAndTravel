import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import loginImage from "../../assets/images/loginImage.jpg";
import { Form } from "react-router-dom";

import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import customFetch from "../../utils/customFetch";
export const LoginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post("/auth/login", data);
    toast.success("Logged in");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="border-r-2 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 p-8 bg-[var(--bs-border-color-translucent)] rounded-[20px]">
        {/* Left side - Illustration */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src={loginImage}
            alt="Login illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back admin!
            </h1>
          </div>

          <Form className="space-y-6" method="post">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Enter email id
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="inputText"
                placeholder="user@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Enter password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="inputText"
                  placeholder="password"
                />
                {showPassword ? (
                  <EyeOff
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={togglePassword}
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={togglePassword}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 text-sm"
              >
                Forgot password?
              </a>
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 text-sm"
              >
                Change password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Login
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
