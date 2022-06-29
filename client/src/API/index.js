import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const signUp = (formData) => API.post("/user/signup", formData);
export const signIn = (formData) => API.post("/user/signin", formData);
export const getUser = (username) => API.get(`/user/${username}`);
export const updateUser = (formData) => API.patch(`/user`, formData);
export const getSuggestedUsers = () => API.get('/user/suggestions');
export const followPerson = (username) => API.patch(`/user/${username}`)
export const getUserList = (username, type) => API.get(`/user/${username}/${type}`)

export const createPost = (postData) => API.post("/post", postData);
export const getUserPosts = (username) => API.get(`/post/${username}`);
export const getTimelinePosts = () => API.get("/post/timeline");
export const likePost = (id) => API.patch(`/post/${id}/like`);