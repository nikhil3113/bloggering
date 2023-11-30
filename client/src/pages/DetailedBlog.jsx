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
      .get(`http://localhost:5000/${id}`, {
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
    <>
      <div>
        <h1 className="text-5xl font-bold text-center mt-10 text-[#293241] font-seriftext-4xl">
    {title}
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[100%] xl:w-[70%] mt-6 ">
          <p className="text-xl border border-red-100 p-5 rounded-lg shadow-lg">{content}</p>
          <p className="text-2xl mt-10">Author: <span className="font-bold">{author}</span></p>
        </div>
      </div>
    </>
  );
};

export default DetailedBlog;
