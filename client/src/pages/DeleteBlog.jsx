// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


// eslint-disable-next-line react/prop-types
const DeleteBlog = ({token}) => {
  const navigate = useNavigate();
  const {id} = useParams();

  
  useEffect(() => {
    // Check if the token is not available, redirect to login page
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleDeleteBook = ()=>{
    axios
      .delete(`http://localhost:5000/${id}`,{
        headers:{
          Authorization: token
        }
      })
      .then(()=>{
        navigate('/home');
      })
      .catch((error)=>{
        alert("An Error occured")
        console.log(error);
      })
  }

  return (
    <div className='p-4 '>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>
          Are You Sure You want to delete this book?
        </h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' 
          onClick={handleDeleteBook}
        >       
            Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBlog