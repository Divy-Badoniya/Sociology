import express from "express"
import { getUser, signIn, signUp, updateUser, getSuggestedUsers, followUser, getFollowings, getFollowers } from "../Controllers/user.js"
import { auth } from "../MiddleWares/auth.js"

const router = express.Router()

router.get('/suggestions', auth, getSuggestedUsers)
router.get('/:username', auth, getUser);
router.get('/:username/followings', auth, getFollowings)
router.get('/:username/followers', auth, getFollowers)
router.post('/signup', signUp);
router.post('/signin', signIn);
router.patch('/', auth, updateUser)
router.patch('/:username', auth, followUser)

export default router