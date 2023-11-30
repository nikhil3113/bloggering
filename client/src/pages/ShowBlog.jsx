import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
// import { PiBookOpenTextLight } from "react-icons/pi";
import { MdOutlineAddBox } from "react-icons/md";
// import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import jwt_decode from "jwt-decode";



// eslint-disable-next-line react/prop-types
const ShowBlog = ({token}) => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if(!token){
      navigate("/");
      return;
    }
    axios
    .get('https://bloggering-app.onrender.com/home', {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      setBlog(response.data.data);
      // console.log(response.data);
    })
    .catch((error) => {
      alert(error.response.data.message);
      console.log(error.response.data);
    });
  },[token, navigate]);

  const handleLogout = async() =>{
    try {
      await axios.post("http://localhost:5000/auth/logout");
      localStorage.removeItem('token')
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  
  const userToken = jwt_decode(token);

  const isCurrentUserAuthor = (author) => {
    const decodedToken = jwt_decode(token);
    const loggedInUsername = decodedToken.username;
    return loggedInUsername === author;
  };

  const truncateText = (text, maxLength) => {
    const words = text.split(' ');
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(' ') + '...';
    }
    return text;
  }

  


  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img src={logo} className="h-16 rounded-lg" alt="Logo" />

          <div className=" md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  className="text-xl block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                  to={`/home/${userToken.id}`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className=" text-xl block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <div className="text-right">
        <Link to={'/home/create'}>
            <MdOutlineAddBox className="text-green-500 text-4xl m-5  " />
        </Link>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blog.map((item) => (
          <div key={item._id} className="shadow-lg m-5 p-4 rounded-3xl">
            <div className="text-xl font-bold mb-2">
              <h2>{item.title}</h2>
            </div>
            <div className="text-lg mb-2">
              <h4>{truncateText(item.content, 20)}</h4>
            </div>
            <div className="flex">
            <h4>By: {item.author} </h4>
              <Link className="ml-3" to={`/home/detail/${item._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
                  </Link>
            </div>
            <div className='flex justify-end items-center gap-x-4 mt-4 p-4'>
              {isCurrentUserAuthor(item.author) && (
                <>
                  <Link to={`/home/edit/${item._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
                  </Link>
                  <Link to={`/home/delete/${item._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowBlog;
