import { useNavigate } from 'react-router-dom';
import { FaCode, FaLightbulb, FaUsers } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-blue-700">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Share Your Developer Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              A platform where developers connect, share experiences, and grow together
            </p>
            <button
              onClick={handleButton}
              className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-indigo-100 transform hover:scale-105 transition duration-300"
            >
              Start Blogging Now
            </button>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 z-10 relative">
                <div className="w-64 h-64 bg-indigo-100 rounded-lg overflow-hidden">
                  <div className="p-6 border-b border-indigo-200">
                    <h3 className="text-xl font-bold text-indigo-800">My Coding Journey</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 line-clamp-5">
                      Today I solved a complex problem using React hooks and learned how important 
                      it is to understand the component lifecycle...
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 -right-4 w-64 h-64 bg-indigo-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Bloggering?
          </h2>
          <div className="flex flex-col md:flex-row justify-around">
            <div className="bg-gray-50 rounded-xl p-8 shadow-md mb-8 md:mb-0 md:w-1/3 md:mx-4 text-center">
              <div className="flex justify-center mb-4">
                <FaCode className="text-4xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Developer Focused</h3>
              <p className="text-gray-600">
                Built by developers, for developers. Share code snippets, technical insights, and programming wisdom.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 shadow-md mb-8 md:mb-0 md:w-1/3 md:mx-4 text-center">
              <div className="flex justify-center mb-4">
                <FaLightbulb className="text-4xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Simple & Powerful</h3>
              <p className="text-gray-600">
                Easy to use interface with all the tools you need to express your technical ideas clearly.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 shadow-md md:w-1/3 md:mx-4 text-center">
              <div className="flex justify-center mb-4">
                <FaUsers className="text-4xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Growing Community</h3>
              <p className="text-gray-600">
                Join a vibrant community of developers sharing knowledge and supporting each other.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">
            Ready to start your blogging journey?
          </h2>
          <p className="text-xl text-indigo-600 mb-8">
            Join thousands of developers who are already sharing their insights
          </p>
          <button
            onClick={handleButton}
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            Get Started for Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">Bloggering</h3>
              <p className="mt-2 text-gray-400">Where developers share their journey</p>
            </div>
            <div>
              <p className="text-gray-400">&copy; {new Date().getFullYear()} Bloggering. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;