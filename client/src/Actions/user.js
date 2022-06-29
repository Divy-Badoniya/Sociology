import * as API from "../API/index"
import { AUTH, FOLLOW_USER, UPDATE_USER } from "../Constants/actionTypes"

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await API.signUp(formData);
        dispatch({ type: AUTH, data: data });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await API.signIn(formData);
        dispatch({ type: AUTH, data: data });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const updateUserInfo = (id, formData) => async (dispatch) => {
    try {
        const { data } = await API.updateUser(id, formData)
        dispatch({ type: UPDATE_USER, data: data })
    } catch (error) {
        console.log(error)
    }
}

export const getSuggestedUsers = () => async (dispatch) => {
    try {
        const { data } = await API.getSuggestedUsers()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const followPerson = (username) => async (dispatch) => {
    try {
        const { data } = await API.followPerson(username)
        dispatch({type: FOLLOW_USER, data: data})
    } catch(error) {
        console.log(error)
    }
}

export const getUserList = (username, type) => async (dispatch) => {
    try {
        const { data } = await API.getUserList(username, type)
        return data
    } catch {

    }
}