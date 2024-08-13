import React, { useEffect } from 'react'
import NavBar from './Components/Navbar/NavBar'
import './App.css'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/RowPost'
import { originals,action,comedy,horror,romance} from './urls'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


function Home() {
  const user = useSelector(store=>store.app.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      navigate("/");
    }
  },[]);
  

  

  return (
    <div>
      <Banner />
      <RowPost   url={originals} title='Netflix Originals'/>
      <RowPost  url={action} title='Action' isSmall/>
      <RowPost  url={comedy} title='Comedy' isSmall/>
      <RowPost  url={horror} title='Horror' isSmall/>
      <RowPost  url={romance} title='Romance' isSmall/>

    </div>
  )
}

export default Home