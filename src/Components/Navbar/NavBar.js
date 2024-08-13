import React from 'react'
import "./NavBar.css"
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { API_END_POINT } from '../../utils/constants';
import axios from 'axios';
import { setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const user = useSelector((store)=>store.app.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logouthandler = async ()=> {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`)
      dispatch(setUser(null));
      navigate("/");
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
    }

  }

  const searchhandler = () =>{
    
  }

  return (
    <div className='navbar '>
        <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix" />

        {
          user && (
            <div className='abt'>
          <h1 className='text'>{user.fullName}</h1>
          <div className='ml-5'>
          <button className='btn' onClick={logouthandler}>Logout</button>
          <button className='btn' onClick={searchhandler}>Search</button>
          </div>
        <img className='avatar' src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar" />
        </div>
          )
        }
        
    </div>

  )
}

export default NavBar