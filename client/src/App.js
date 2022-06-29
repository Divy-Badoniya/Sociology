import React from 'react'
import Auth from './Pages/Auth/Auth'
import { Routes, Route, Navigate } from "react-router-dom"
import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile'
import './styles.css'
import { useSelector } from 'react-redux'

const App = () => {
  const user = useSelector((store) => store?.authReducer?.authData?.user)
  return (
    <div className='app'>
      <Routes>
        <Route exact path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/auth" />} />
        <Route exact path="/home" element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route exact path="/auth" element={user ? <Navigate to="/home" /> : <Auth />} />
        <Route exact path="/profile/:username" element={user ? <Profile /> : <Navigate to="/auth" />} />
      </Routes>
    </div>
  )
}

export default App