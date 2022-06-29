import React, { useEffect, useState } from 'react'
import ProfileLeft from './ProfileLeft'
import ProfileCenter from './ProfileCenter'
import ProfileRight from './ProfileRight'
import { getUser } from '../../API'
import { useParams } from 'react-router-dom'
import './styles.css'

const Profile = () => {
  const params = useParams()
  const [profileUser, setProfileUser] = useState(null);
  const [persons, setPersons] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      const { username } = params
      const { data } = await getUser(username);
      setProfileUser(data)
    }
    fetchUser()
  }, [params])
  return (
    <div className='profile'>
        <ProfileLeft profileUser={profileUser} setProfileUser={setProfileUser}/>
        <ProfileCenter profileUser={profileUser} setPersons={setPersons}/>
        <ProfileRight persons={persons}/>
    </div>
  )
}

export default Profile