import userModel from "../Models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
    const user = req.body
    try {
        const existingUserWithEmail = await userModel.findOne({ email: user.email })
        if (existingUserWithEmail) {
            return res.status(403).json("User with this email Already Exist")
        }
        const existingUserWithUsername = await userModel.findOne({ username: user.username })
        if (existingUserWithUsername) {
            return res.status(403).json("User with this username Already Exist")
        }
        if (user.password !== user.confirmPassword) {
            return res.status(403).json("Password doesn't match");
        }
        const hashedPassword = await bcrypt.hash(user.password, 12)
        const result = await userModel.create({ ...user, password: hashedPassword, name: `${user.firstName} ${user.lastName}` })
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "2hr" })
        const { email, password, ...rest } = result._doc
        res.status(200).json({ user: result, token })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const signIn = async (req, res) => {
    const user = req.body;
    try {
        const existingUser = await userModel.findOne({ email: user.email })
        if (!existingUser) {
            return res.status(404).json("User doesn't exist with this email")
        }
        const isPasswordCorrect = await bcrypt.compare(user.password, existingUser.password)
        if (!isPasswordCorrect) {
            return res.status(400).json("Invalid credentials")
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "2hr" })
        const { email, password, ...rest } = existingUser._doc
        res.status(200).json({ user: rest, token })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getUser = async (req, res) => {
    const { username } = req.params
    try {
        if (!req.userId) {
            return res.status(403).json("Sign In to visit profile!!")
        }
        const person = await userModel.findOne({ username: username });
        if (person) {
            const { email, password, ...rest } = person._doc
            res.status(200).json(rest);
        } else {
            res.status(404).json("No User Found");
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getSuggestedUsers = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId)
        const followings = await userModel.find({ _id: { $in: user.followings } }).select('followings')
        let suggestionIdList = []
        for (let index = 0; index < followings.length; index++) {
            const element = followings[index];
            suggestionIdList = [...suggestionIdList, ...element.followings]
        }
        suggestionIdList = suggestionIdList.filter((id) => user.followings.includes(id))
        let suggestedUsers = await userModel.find({ _id: { $in: suggestionIdList } }).select("name username profilePicture")
        if (suggestedUsers.length > 0) {
            res.status(200).json(suggestedUsers)
        } else {
            let randomUsers = await userModel.find({ _id: { $nin: user.followings } }).limit(8 - suggestedUsers).select("name username profilePicture")
            randomUsers = randomUsers.filter((u) => {
                return String(u._id) !== req.userId
            })
            res.status(200).json(randomUsers)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(403).json('Not Allowed to Edit Details');
        }
        const updatedPerson = await userModel.findByIdAndUpdate(req.userId, req.body, { new: true })
        const token = jwt.sign({ email: updatedPerson.email, id: updatedPerson._id }, 'test', { expiresIn: "2hr" })
        res.status(200).json({ user: updatedPerson, token })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const followUser = async (req, res) => {
    try {
        let currUser = await userModel.findById(req.userId)
        let otherUser = await userModel.findOne({ username: req.params.username })
        if (!currUser.followings.includes(otherUser._id)) {
            currUser.followings.push(otherUser._id)
            otherUser.followers.push(currUser._id)
        } else {
            currUser.followings = currUser.followings.filter((person) => person._id === otherUser._id)
            otherUser.followers = otherUser.followers.filter((person) => person._id === currUser._id)
        }
        const updatedUser = await userModel.findByIdAndUpdate(req.userId, currUser, { new: true })
        await userModel.findByIdAndUpdate(otherUser._id, otherUser, { new: false })
        const token = jwt.sign({ email: updatedUser.email, id: updatedUser._id }, 'test', { expiresIn: "2hr" })
        res.status(200).json({ user: updatedUser, token })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getFollowings = async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.params.username })
        const followings = await userModel.find({ _id: { $in: user.followings } }).select("profilePicture name username")
        res.status(200).json(followings)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getFollowers = async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.params.username })
        const followings = await userModel.find({ _id: { $in: user.followers } }).select("profilePicture name username")
        res.status(200).json(followings)
    } catch (error) {
        res.status(500).json(error)
    }
}