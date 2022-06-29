import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import "./styles.css"
import { followPerson } from '../../../Actions/user'
import UserLogo from '../../../Images/Icons/UserLogo'


const Person = ({ person }) => {
  const [isFollowed, setIsFollowed] = useState(false)
  const dispatch = useDispatch()
  const handleClick = () => {
    setIsFollowed((prev) => !prev)
    dispatch(followPerson(person.username))
  }
  return (
    <div className='person'>
      <Link className='info link' to={`/profile/${person.username}`}>
        <img style={{width: "2.5rem", height: "2.5rem", borderRadius: "50%"}} src={person?.profilePicture ? person.profilePicture : <UserLogo />} alt="" />
        <div className='name'>
          <span>{person.name}</span>
          <span>{person.username}</span>
        </div>
      </Link>
      <div>
        <button onClick={handleClick} >{isFollowed ? 'Unfollow' : 'Follow'}</button>
      </div>
    </div>
  )
}

export default Person