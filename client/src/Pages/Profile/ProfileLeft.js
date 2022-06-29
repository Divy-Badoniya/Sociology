import React from 'react'
import InfoCard from '../../Components/InfoCard/InfoCard'


const ProfileLeft = ({ profileUser }) => {
  return (
    <div className='profileLeft'>
      <InfoCard profileUser={profileUser} />
    </div>
  )
}

export default ProfileLeft