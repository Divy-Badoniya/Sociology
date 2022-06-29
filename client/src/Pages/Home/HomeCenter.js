import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Share from '../../Components/Share/Share'
import Posts from '../../Components/Posts/Posts'
import "./styles.css"
import { useDispatch } from 'react-redux'
import { getTimelinePosts } from '../../Actions/post'

const HomeCenter = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchTimelinePosts = () => {
      dispatch(getTimelinePosts())
    }
    fetchTimelinePosts()
  }) 
  return (
    <div className="homeCenter" >
        <Navbar />
        <Share />
        <Posts />
    </div>
  )
}

export default HomeCenter