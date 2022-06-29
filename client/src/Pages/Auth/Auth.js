import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { signIn, signUp } from '../../Actions/user'
import { useNavigate } from 'react-router-dom'
import './styles.css'

const Auth = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isSignUp, setIsSignUp] = useState(false)

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        isSignUp ? dispatch(signUp(formData, navigate)) : dispatch(signIn(formData, navigate))
    }

    const switchMode = (event) => {
        event.preventDefault()
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={handleSubmit}>
                <h4>{isSignUp ? "Sign Up" : "Sign In"}</h4>
                {isSignUp && <div>
                    <input required type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} />
                    <input required type="text" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} />
                </div>}
                <input required type="text" name="email" value={formData.email} placeholder="Email" onChange={handleChange} />
                {isSignUp && <input required type="text" name="username" value={formData.username} placeholder="Username" onChange={handleChange} />}
                <input required type="text" name="password" value={formData.password} placeholder="Password" onChange={handleChange} />
                {isSignUp && <input required type="text" name="confirmPassword" value={formData.confirmPassword} placeholder="confirmPassword" onChange={handleChange} />}
                <button type="submit" >{isSignUp ? "Sign Up" : "Sign In"}</button>
                <button onClick={switchMode} >{isSignUp ? "Already have an account. Sign In!!" : "Don't have an account. Sign Up!!"}</button>
            </form>
        </div>
    )
}

export default Auth