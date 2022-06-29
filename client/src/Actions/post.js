import * as API from "../API/index"
import { CREATE_POST, FETCH_POSTS, LIKE_POST } from "../Constants/actionTypes"

export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = await API.createPost(postData)
        dispatch({ type: CREATE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getUserPosts = (username) => async (dispatch) => {
    try {
        const { data } = await API.getUserPosts(username)
        dispatch({ type: FETCH_POSTS, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getTimelinePosts = () => async (dispatch) => {
    try {
        const { data } = await API.getTimelinePosts()
        dispatch({type: FETCH_POSTS, payload: data})
    } catch (error) {
        console.log(error)
    }
}


export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await API.likePost(id);
        dispatch({ type: LIKE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}

