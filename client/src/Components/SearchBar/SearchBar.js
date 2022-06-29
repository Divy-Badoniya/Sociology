import React from 'react'
import SearchIcon from '../../Images/Icons/SearchIcon'
import './styles.css'

const SearchBar = () => {
  return (
    <div className='searchBar'>
        <input type="text" />
        <SearchIcon />
    </div>
  )
}

export default SearchBar