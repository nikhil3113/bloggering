import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CreateBlog = ({ token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is not available, redirect to login page
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleBlog = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/home`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with decorative element */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Create New Post
          </h1>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 bg-indigo-500 rounded-full"></div>
          </div>
        </div>

        {/* Card container */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Form header */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-400 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Share your thoughts
            </h2>
            <p className="text-indigo-100 text-sm mt-1">
              Fill in the details below to create your new blog post
            </p>
          </div>

          {/* Form body */}
          <div className="p-6">
            <form onSubmit={handleBlog}>
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-colors duration-200 text-gray-900"
                  placeholder="Enter post title..."
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-colors duration-200 text-gray-900"
                  placeholder="Write your blog post content here..."
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use clear paragraphs and keep your content engaging
                </p>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Optional: Tips section */}
        <div className="mt-6 bg-indigo-50 rounded-lg p-4 text-sm text-indigo-800 border border-indigo-100">
          <p className="font-medium">Tips for a great blog post:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-indigo-700">
            <li>Use a clear, attention-grabbing title</li>
            <li>Break content into paragraphs for readability</li>
            <li>Proofread before publishing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
