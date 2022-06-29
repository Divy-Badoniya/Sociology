import userModel from "../Models/user.js"
import postModel from "../Models/post.js"
import mongoose from "mongoose";

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new postModel({ ...post, creator: req.userId })
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { _id } = await userModel.findOne({username: req.params.username})
        const posts = await postModel.find({ creator: _id })
        res.status(200).json(posts.sort((a, b) => b.createdAt - a.createdAt))
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}

export const getTimelinePosts = async (req, res) => {
    try {
        const currUserPosts = await postModel.find({ creator: req.userId })
        const followingsPosts = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.userId)
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "followings",
                    foreignField: "creator",
                    as: "followingsPosts"
                }
            },
            {
                $project: {
                    followingsPosts: true,
                    _id: false
                }
            }
        ])
        res.status(200).json(currUserPosts.concat(followingsPosts[0].followingsPosts).sort((a, b) => {
            return b.createdAt - a.createdAt;
        }))
    } catch (error) {
        res.status(500).json(error)
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params
    try {
        if (!req.userId) {
            return res.json({ message: UnAuthenticated })
        }
        const post = await postModel.findById(id)
        const index = post.likes.findIndex((id) => id === String(req.userId))
        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((id) => {
                return id !== String(req.userId)
            })
        }
        const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true })
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json(error)
    }
}