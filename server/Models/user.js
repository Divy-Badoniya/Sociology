import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    name: String,
    profilePicture: String,
    coverPicture: String,
    bio: String,
    livesIn: String,
    country: String,
    worksAt: String,
    followings: [String],
    followers: [String],
})

const userModel = mongoose.model('User', userSchema)

export default userModel;