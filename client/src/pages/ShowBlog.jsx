import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { PiBookOpenTextLight } from "react-icons/pi";
import { MdOutlineAddBox } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
// import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import jwt_decode from "jwt-decode";
import Loader from "../components/Loader";

// eslint-disable-next-line react/prop-types
const ShowBlog = ({ token }) => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/home`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBlog(response.data.data);
        // console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error.response.data);
      });
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const userToken = jwt_decode(token);

  const isCurrentUserAuthor = (author) => {
    const decodedToken = jwt_decode(token);
    const loggedInUsername = decodedToken.username;
    return loggedInUsername === author;
  };

  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to={"/"} className="flex items-center">
              <FaBlog className="h-7 w-7"/>
              <span className="ml-3 text-xl font-semibold text-gray-800">Bloggering</span>
            </Link>
            <div className="flex items-center">
              <Link
                to={`/home/${userToken.id}`}
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
  
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Latest Posts</h1>
          <Link 
            to="/home/create"
            className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
          >
            <MdOutlineAddBox className="mr-2 text-xl" />
            <span>New Post</span>
          </Link>
        </div>
      </div>
  
      {/* Blog Posts Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blog.map((item) => (
              <div 
                key={item._id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                {/* Card Header with Title */}
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{item.title}</h2>
                </div>
                
                {/* Card Content */}
                <div className="p-5">
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {truncateText(item.content, 30)}
                  </p>
                  
                  {/* Author and Details Link */}
                  <div className="flex items-center justify-between mt-6 text-sm">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
                        {item.author[0]}
                      </div>
                      <span className="ml-2 text-gray-700">{item.author}</span>
                    </div>
                    
                    <Link 
                      to={`/home/detail/${item._id}`}
                      className="text-indigo-600 hover:text-indigo-800 flex  items-center group"
                    >
                      Read more
                      <BsInfoCircle className="ml-1 group-hover:translate-x-1 transition-transform duration-200 mt-1" />
                    </Link>
                  </div>
                </div>
                
                {/* Card Footer with Actions */}
                {isCurrentUserAuthor(item.author) && (
                  <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-3">
                    <Link 
                      to={`/home/edit/${item._id}`}
                      className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                    >
                      <AiOutlineEdit className="text-amber-600" />
                    </Link>
                    <Link 
                      to={`/home/delete/${item._id}`}
                      className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                    >
                      <MdOutlineDelete className="text-red-600" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {blog.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No blog posts yet. Create your first post!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowBlog;
