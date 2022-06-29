import React from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Persons from "../../Components/Persons/Persons"


const HomeRight = ({ persons }) => {
  return (
    <div className='homeRight'>
      <SearchBar />
      <Persons persons={persons} />
    </div>
  )
}

export default HomeRight