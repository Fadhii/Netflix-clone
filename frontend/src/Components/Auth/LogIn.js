import React, { useState } from 'react';
import axios from 'axios';
import { API_END_POINT } from '../../utils/constants';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/userSlice';

const LogIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(store=>store.app.isLoading);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  const getInputData = async (e)=>{
    e.preventDefault();
    dispatch(setLoading(true))
    if(isLogin){
      //login
      const user = {email,password};
    try {
      const res= await axios.post(`${API_END_POINT}/login`,user,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });

      console.log(res);
      if(res.data.success){
        toast.success(res.data.message)
      }
      dispatch(setUser(res.data.user))
      navigate("/home")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
    }else{
      //register
      dispatch(setLoading(true));
      const user = {fullName,email,password};
    try {
      const res= await axios.post(`${API_END_POINT}/register`,user,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      })
      if(res.data.success){
        toast.success(res.data.message)
      }
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      dispatch(setLoading(false));
    }
    }
    setFullName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="relative min-h-screen pt-0 flex justify-center items-center">
      <img
        src="https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg"
        alt="background"
        className="absolute w-full h-full object-cover z-[-1]"
      />
      <form onSubmit={getInputData} className="w-[30%] bg-black bg-opacity-80 p-8 rounded-lg flex flex-col items-center">
        <h1 className="text-3xl text-white mb-3 font-bold">{isLogin ? "Login" : "Sign Up"}</h1>
        <div className="w-full text-white mb-12">
          {!isLogin && (
            <div>
              <label className="block mb-2">Full Name</label>
              <input type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)} className="outline-none w-full p-2 rounded-lg bg-gray-800 text-white" />
            </div>
          )}
          <div>
            <label className="block mb-2">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 rounded-lg outline-none bg-gray-800 text-white" />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 rounded-lg outline-none bg-gray-800 text-white" />
          </div>
        </div>
        <button type="submit" className="px-4 py-2 rounded-lg bg-red-700 text-white hover:bg-red-800">
          {`${isLoading ? "Loading..." :(isLogin?"Login":"Signup")}`}
        </button>
        <p className="text-white mt-2">
          {isLogin ? "New to Netflix?" : "Already have an account?"}
          <span onClick={loginHandler} className="ml-1 text-blue-900 font-medium cursor-pointer">
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
