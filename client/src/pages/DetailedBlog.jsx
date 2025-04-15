import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const DetailedBlog = ({ token }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setContent(response.data.content);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  }, [token, id]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#293241] font-serif leading-tight">
          {title}
        </h1>
        <div className="flex items-center justify-center mb-10">
          <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full lg:w-4/5 mb-10">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-10 prose prose-lg max-w-none">
              {content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-4/5 flex items-center justify-between py-6 px-8 bg-gray-50 rounded-lg shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-500">
              Written by
            </p>
            <p className="text-xl font-bold text-gray-800">{author}</p>
          </div>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedBlog;
