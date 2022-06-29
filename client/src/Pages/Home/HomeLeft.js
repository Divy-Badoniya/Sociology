import React from 'react'
import { useSelector } from 'react-redux'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import './styles.css'

const HomeLeft = ({ setPersons }) => {
  const { user } = useSelector((store) => store.authReducer.authData)
  return (
    <div className='homeLeft'>
      <ProfileCard user={user} setPersons={setPersons}/>
    </div>
  )
}

export default HomeLeft