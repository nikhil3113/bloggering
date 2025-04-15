import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth`,
        {
          username,
          email,
          password,
        }
      );
      console.log(response.data);
      navigate("/auth/login");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 p-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white">Bloggering</h2>
            <p className="text-blue-100 mt-2">Join our community of writers</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white">Create Account</h1>
              <p className="text-blue-100 text-sm">
                Start your blogging journey
              </p>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      type="text"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                  >
                    Create Account
                  </button>
                </div>
              </form>

              <p className="mt-6 text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
