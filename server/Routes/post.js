import express from "express"
import { createPost, getTimelinePosts, getUserPosts, likePost } from "../Controllers/post.js";
import { auth } from "../MiddleWares/auth.js"

const router =  express.Router()

router.post('/', auth, createPost)
router.get('/timeline', auth, getTimelinePosts)
router.get('/:username', auth, getUserPosts)
router.patch('/:id/like', auth, likePost)

export default router;