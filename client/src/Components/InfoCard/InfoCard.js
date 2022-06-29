import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { followPerson } from '../../Actions/user'
import { LOGOUT } from '../../Constants/actionTypes'
import EditIcon from '../../Images/Icons/EditIcon'
import EditProfileModal from "./EditProfileModal"
import './styles.css'

const InfoCard = ({ profileUser }) => {
    const [ModalOpened, setModalOpened] = useState(false);
    const { user } = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleClick = () => {
        if(user?.username === profileUser?.username) {
            dispatch({type: LOGOUT})
            navigate('/auth')
        } else {
            dispatch(followPerson(profileUser.username))
        }
    }
    return (
        <div className='infoCard'>
            <div className='infoHead'>
                <h2>Information</h2>
                {user?.username === profileUser?.username && <>
                <button onClick={() => setModalOpened(true)}>
                    <EditIcon />
                </button>
                <EditProfileModal ModalOpened={ModalOpened} setModalOpened={setModalOpened} data={user} />
                </>}
            </div>
            <div className='infoBody'>
                {profileUser?.bio && <div className="info">
                    <span>
                        <b>Bio </b>
                    </span>
                    <span>{profileUser.bio}</span>
                </div>}
                {profileUser?.livesIn && <div className="info">
                    <span>
                        <b>Lives in </b>
                    </span>
                    <span>{profileUser.livesIn}, {profileUser.country}</span>
                </div>}
                {profileUser?.worksAt && <div className="info">
                    <span>
                        <b>Works at </b>
                    </span>
                    <span>{profileUser.worksAt}</span>
                </div>}
            </div>
            <button onClick={handleClick}>{user?.username === profileUser?.username ? "Logout" : user?.followings.includes(profileUser?._id) ? "Unfollow" : "Follow" }</button>
        </div>
    )
}

export default InfoCard