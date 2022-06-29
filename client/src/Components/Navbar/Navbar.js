import React from 'react'
import { useSelector } from 'react-redux'
import HomeIcon from '../../Images/Icons/HomeIcon'
import MessageIcon from '../../Images/Icons/MessageIcon'
import UserLogo from '../../Images/Icons/UserLogo'
import sociologyLogo from "../../Images/SociologyLogo.png"

import './styles.css'

const Navbar = () => {
  const { username, profilePicture } = useSelector((store) => store.authReducer.authData.user)
  return (
    <div className='navbar'>
      <div className='navItem' >
        <img src={sociologyLogo} alt="" className='navLogo' />
        <h2>
          Sociology
        </h2>
      </div>
      <div className='navItem' style={{ marginRight: "5rem" }}>
        <HomeIcon />
        <MessageIcon />
        <UserLogo username={username} profilePicture={profilePicture} />
      </div>
    </div>
  )
}

export default Navbar