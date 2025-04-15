import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import { MdOutlineAddBox } from "react-icons/md";
// import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import Loader from "../components/Loader";

// eslint-disable-next-line react/prop-types
const PersonalInfo = ({ token }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [blog, setBlog] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error);
      });
  }, [token, navigate, id]);

  useEffect(() => {
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

  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Profile Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="text-center pt-12 pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome, <span className="text-indigo-600">{username}</span>
            </h1>
            <div className="mt-3 flex justify-center">
              <div className="h-1 w-16 bg-indigo-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Profile Card */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-10">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-5 flex items-center">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-indigo-600">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                  <p className="text-indigo-100 text-sm">Your personal account details</p>
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 text-gray-800 font-medium">
                    {username}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 text-gray-800 font-medium">
                    {email}
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Your Articles Section */}
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 px-4">
              Your Articles
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader />
              </div>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {blog.filter((item) => item.author === username).length > 0 ? (
                  blog.filter((item) => item.author === username).map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                      {/* Article Header */}
                      <div className="p-5 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                      </div>
                      
                      {/* Article Content */}
                      <div className="p-5">
                        <p className="text-gray-600 line-clamp-3 mb-4">
                          {truncateText(item.content, 30)}
                        </p>
                        
                        {/* View Link */}
                        <Link 
                          to={`/home/detail/${item._id}`}
                          className="text-indigo-600 hover:text-indigo-800 flex items-center group text-sm"
                        >
                          Read full article
                          <BsInfoCircle className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </div>
                      
                      {/* Article Actions */}
                      <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-3">
                        <Link 
                          to={`/home/edit/${item._id}`}
                          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                          title="Edit article"
                        >
                          <AiOutlineEdit className="text-amber-600" />
                        </Link>
                        <Link 
                          to={`/home/delete/${item._id}`}
                          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                          title="Delete article"
                        >
                          <MdOutlineDelete className="text-red-600" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500 mb-4">You haven&apos;t created any articles yet.</p>
                    <Link 
                      to="/home/create"
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Your First Article
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
