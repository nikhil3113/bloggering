// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const DeleteBlog = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Check if the token is not available, redirect to login page
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleDeleteBook = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        alert("An Error occured");
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header with decorative element */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Delete Post</h1>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* Confirmation card */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Alert header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 flex items-center">
            <div className="mr-4 bg-white bg-opacity-20 rounded-full p-2">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Confirm Deletion
              </h2>
              <p className="text-red-100 text-sm">
                This action cannot be undone
              </p>
            </div>
          </div>

          {/* Confirmation body */}
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this blog post? Once deleted, all
              of its content will be permanently removed and cannot be
              recovered.
            </p>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => history.back()}
                className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteBook}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
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
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlog;
