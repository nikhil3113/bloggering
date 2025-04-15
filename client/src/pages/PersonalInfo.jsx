import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import { MdOutlineAddBox } from "react-icons/md";
// import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import jwt_decode from "jwt-decode";
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
    <>
      {loading? <Loader /> :
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-center relative xl:top-10 top-10 text-[#293241] font-serif ">
          Hello {username}
        </h1>
        <div className="flex  mt-16 xl:mt-16 border-2 border-[#98C1D9] w-[90%] xl:w-[35%] justify-center items-center p-5 rounded-lg shadow-lg ">
          <div className="flex flex-col justify-center items-center">
            <div className="mt-3 w-full">
              <label className=" text-[#3D5A80] text-4xl font-semibold">
                Username
                <br />
                <input
                  className="border font-normal text-xl border-[#98C1D9]  rounded-lg w-full"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled
                />
              </label>
            </div>
            <div className="mt-5 w-full">
              <label className=" text-[#3D5A80] text-4xl font-semibold">
                Email
                <br />
                <input
                  className="border font-normal text-xl border-[#98C1D9]  rounded-lg w-full"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </label>
            </div>
          </div>
        </div>
      </div>
}

      <h1 className="text-5xl font-bold text-left ml-10 relative mt-10 text-[#293241] font-serif ">
        Your Articles
      </h1>
    {loading ? <Loader /> : 
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
        {blog.filter((item) => item.author === username).map((item) => (
          <div key={item._id}  className="mx-auto">
            {isCurrentUserAuthor(item.author) && (
              <div className="shadow-lg m-5 p-4 rounded-3xl">
                <div className="text-xl font-bold mb-2">
                  <h2>{item.title}</h2>
                </div>
                <div className="text-lg mb-2">
                  <h4>{truncateText(item.content, 20)}</h4>
                </div>
                <div className="flex">
                  <h4>By: {item.author} </h4>
                  <Link className="ml-3" to={`/home/detail/${item._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
                  </Link>
                </div>
                <div className="flex justify-end items-center gap-x-4 mt-4 p-4">
                  <>
                    <Link to={`/home/edit/${item._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
                    </Link>
                    <Link to={`/home/delete/${item._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
                    </Link>
                  </>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
}
    </>
  );
};

export default PersonalInfo;
