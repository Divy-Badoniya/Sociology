import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProfileCard from "../../Components/ProfileCard/ProfileCard"
import Posts from "../../Components/Posts/Posts"
import { useDispatch } from "react-redux"
import { getUserPosts } from "../../Actions/post"

const ProfileCenter = ({ profileUser, setPersons }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(getUserPosts(profileUser?.username))
    }
    if(profileUser) {
      fetchPosts()
    }
  }, [profileUser, dispatch])
  return (
    <div className='profileCenter'>
      <Navbar />
      <ProfileCard user={profileUser} setPersons={setPersons}/>
      <Posts username={profileUser?.username} />
    </div>
  )
}

export default ProfileCenter