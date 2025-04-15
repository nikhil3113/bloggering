import { useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const UpdateBlog = ({token}) => {
  const[title, setTitle] = useState('');
  const[content, setContent] = useState('');

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    if(!token){
      navigate('/');
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/${id}`,{
      headers:{
        Authorization: token
      }
    })
          .then((response) =>{
            setTitle(response.data.title)
            setContent(response.data.content)
          })
          .catch((error)=>{
            alert(error.response);
            console.log(error);
          })
  },[token, navigate, id])

  const handleEditBlog = (e) =>{
    e.preventDefault()
    console.log("for submited");
    axios.put(`${import.meta.env.VITE_API_URL}/${id}`, {
      title,
      content
    },{
      headers:{
        Authorization: token
      }
    })
          .then(()=>{
            navigate('/home')
          })
          .catch((error)=>{
            console.log(error);
          })
  }


  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-center relative xl:top-28 top-14 text-[#293241] font-serif ">Update</h1>
        <div className="flex  mt-32 xl:mt-44 border-2 border-[#98C1D9] w-[90%] xl:w-[35%] justify-center items-center p-5 rounded-lg shadow-lg ">
          <form onSubmit={handleEditBlog} className="flex flex-col justify-center items-center">
            <div className="mt-5 w-full" >
              <label className=" text-[#3D5A80] text-4xl font-semibold">
                Title
                <br />
                <input
                  className="border font-normal text-xl border-[#98C1D9]  rounded-lg w-full"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </div>
            <div className="my-5">
              <label className="text-[#3D5A80] text-4xl font-semibold ">
                Content 
                <textarea
                  className="border border-[#98C1D9] font-normal text-lg  h-40  rounded-lg w-full xl:w-[100%]"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </label>
              <div>
                
              </div>
            </div>
            <button type="submit" className="bg-[#98C1D9] text-xl text-[#293241] font-semibold rounded-md py-1 px-3 mt-8 w-full hover:opacity-70" onClick={handleEditBlog}>Update</button>
          </form>
          
        </div>
      </div>
    </>
  )
}

export default UpdateBlog