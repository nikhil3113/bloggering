import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const UpdateBlog = ({ token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => {
        alert(error.response);
        console.log(error);
      });
  }, [token, navigate, id]);

  const handleEditBlog = (e) => {
    e.preventDefault();
    console.log("for submited");
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/${id}`,
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
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with decorative element */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Update Your Post
          </h1>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 bg-indigo-500 rounded-full"></div>
          </div>
        </div>

        {/* Card container */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Form header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-400 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Edit your content
            </h2>
            <p className="text-amber-100 text-sm mt-1">
              Make changes to your post below and save when you&apos;re ready
            </p>
          </div>

          {/* Form body */}
          <div className="p-6">
            <form onSubmit={handleEditBlog}>
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition-colors duration-200 text-gray-900"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition-colors duration-200 text-gray-900"
                  placeholder="Write your blog post content here..."
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use clear paragraphs for better readability
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => history.back()}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Optional: Tips section */}
        <div className="mt-6 bg-amber-50 rounded-lg p-4 text-sm text-amber-800 border border-amber-100">
          <p className="font-medium">Remember:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-amber-700">
            <li>Your changes will be visible to all readers</li>
            <li>Original publication date will remain unchanged</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
