import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-700">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Bloggering</h1>
        <p className="text-lg mb-8">Where Developers post their thoughts!</p>
        <button
          type="submit"
          onClick={handleButton}
          className="bg-red-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-800 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
