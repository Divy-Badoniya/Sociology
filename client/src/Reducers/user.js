import { AUTH, FOLLOW_USER, LOGOUT, UPDATE_USER } from "../Constants/actionTypes"

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null }
        case FOLLOW_USER:    
        case UPDATE_USER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        default:
            return state;
    }
}

export default authReducer