import React from 'react'
import SearchBar from "../../Components/SearchBar/SearchBar"
import Persons from "../../Components/Persons/Persons"
import "./styles.css"

const ProfileRight = ({ persons }) => {
  return (
    <div className='profileRight'>
      <SearchBar />
      <Persons persons={persons} />
    </div>
  )
}

export default ProfileRight