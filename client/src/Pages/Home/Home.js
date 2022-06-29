import React, { useState } from 'react'
import HomeCenter from './HomeCenter'
import HomeLeft from './HomeLeft'
import HomeRight from './HomeRight'
import "./styles.css"

const Home = () => {
  const [persons, setPersons] = useState(null)
  return (
    <div className='home'>
      <HomeLeft setPersons={setPersons}/>
      <HomeCenter />
      <HomeRight persons={persons}/>
    </div>
  )
}

export default Home