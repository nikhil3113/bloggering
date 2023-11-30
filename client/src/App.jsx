import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ShowBlog from './pages/ShowBlog'
import CreateBlog from './pages/CreateBlog'
import UpdateBlog from './pages/UpdateBlog'
import DeleteBlog from './pages/DeleteBlog'
import { useState, useEffect } from 'react'
import PersonalInfo from './pages/PersonalInfo'
import DetailedBlog from './pages/DetailedBlog'

const App = () => {
  const [token, setToken] = useState(() => {
    // Get the token from localStorage on component mount
    return localStorage.getItem("token") || null;
  });

  useEffect(() => {
    // Update the token in state if it changes in localStorage
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token") || null);
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<SignUp />} />
      <Route path='/auth/login' element={<Login setToken={setToken} />} />
      <Route path='/home' element={<ShowBlog token={token} />} />
      <Route path='/home/create' element={<CreateBlog token={token}/>} />
      <Route path='/home/edit/:id' element={<UpdateBlog token={token} />} />
      <Route path='/home/delete/:id' element={<DeleteBlog token={token} />} />
      <Route path='/home/:id' element={<PersonalInfo token={token} />} />
      <Route path='/home/detail/:id' element={<DetailedBlog token={token} />} />
    </Routes>
  )
}

export default App