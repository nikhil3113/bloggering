import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth", {
        username,
        email,
        password,
      });
      console.log(response.data);
      navigate("/auth/login");
    } catch (error) {
      alert("error")
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-700">
      <div className="w-full max-w-md ">
        <div className="bg-white p-8 rounded-lg shadow-md ">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            SignUp
          </h1>
          <form onSubmit={handleSignUp} className="space-y-4 ">
            <div>
              <label className="text-gray-700">Username:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-gray-700">Email:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-gray-700">Password:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Signup
            </button>
          </form>
          <p className="mt-4 text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
