import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    selectedFile: String,
    message: String,
    creator: String,
    creatorUsername: String, 
    likes: [String],
    comments: [{String, String}]
}, {timestamps: true})

const postModel = mongoose.model('post', postSchema)

export default postModel