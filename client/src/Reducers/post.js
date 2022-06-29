import { CREATE_POST, FETCH_POSTS, LIKE_POST } from "../Constants/actionTypes"

const postReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case CREATE_POST:
            return { ...state, posts: [action.payload, ...state.posts]}
        case FETCH_POSTS:
            return { ...state, posts: action.payload }
        case LIKE_POST:
            return {...state, posts: state.posts.map((post => post._id===action.payload._id ? action.payload : post))}
        default:
            return state
    }
}

export default postReducer