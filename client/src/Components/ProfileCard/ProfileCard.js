import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import defaultCover from "../../Images/noPostsYet.png"
import defaultProfile from "../../Images/SociologyLogo.png"
import "./styles.css"
import { getUserList, getSuggestedUsers } from '../../Actions/user'

const ProfileCard = ({ user, setPersons }) => {
  const location = useLocation()
  const numberOfPosts = useSelector((store) => store.postReducer.posts.length)
  const dispatch = useDispatch()

  const handleClick = async (event) => {
    if(user && location.pathname !== '/home') {
      if(event.target.innerText === 'Followers') {
        const data = await dispatch(getUserList(user?.username, 'followers'))
        setPersons({text: "Followers", data: data})
      } else {
        const data = await dispatch(getUserList(user?.username, 'followings'))
        setPersons({text: "Followings", data: data})
      }
    } 
  }

  useEffect(() => {
    const fetchPersons = async () => {
      if(user && location.pathname !== '/home') {
        const data = await dispatch(getUserList(user?.username, 'followings'))
        setPersons({text: "Followings", data: data})
      } else {
        const data = await dispatch(getSuggestedUsers())
        setPersons({text: "Suggestions", data: data})
      }
    }
    fetchPersons()
  }, [user, dispatch, setPersons, location.pathname])
  
  return (
    <div className='profileCard'>
      <div className='profileImages'>
        <img src={user?.coverPicture ? user.coverPicture : defaultCover} alt="" />
        <img src={user?.profilePicture ? user.profilePicture : defaultProfile} alt="" />
      </div>
      <div className='profileName'>
        <span>{user?.name}</span>
        <span> <Link to={`/profile/${user?.username}`} className='link'>@{user?.username}</Link> </span>
      </div>
      <div className='profileStatus'>
        <hr />
        <div>
          {location.pathname !== '/home' && (
            <>
              <div className='statusBox'>
                <span>{numberOfPosts}</span>
                <span>Posts</span>
              </div>
              <div className='verticalLine'></div>
            </>
          )}
          <div className="statusBox">
            <span>{user?.followings.length}</span>
            <span onClick={handleClick}>Followings</span>
          </div>
          <div className='verticalLine'></div>
          <div className="statusBox">
            <span>{user?.followers.length}</span>
            <span onClick={handleClick}>Followers</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  )
}

export default ProfileCard