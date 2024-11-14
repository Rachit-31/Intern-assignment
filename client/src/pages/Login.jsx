// import React from 'react'

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Login
        </h2>
        
        <form className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your email
            </label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm font-medium"
          >
            Create an account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          New User ?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
