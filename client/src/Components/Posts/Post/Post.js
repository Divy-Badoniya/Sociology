import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import NotLikedIcon from "../../../Images/Icons/NotLikedIcon"
import LikedIcon from "../../../Images/Icons/LikedIcon"
import CommentIcon from '../../../Images/Icons/CommentIcon'
import './styles.css'
import { likePost } from '../../../Actions/post'

const Post = ({ post }) => {
  const { _id } = useSelector((store) => store.authReducer.authData.user)
  const [liked, setLiked] = useState(post.likes.includes(_id))
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likePost(post._id))
    setLiked((prev) => !prev)
  }

  return (
    <div className='post'>
      <div className='postImageDisplayBox'>
        <img src={post.selectedFile} className='postImage' alt="" />
      </div>
      <div className='postActions'>
        <div className='action'>
          {liked ? <LikedIcon handleLike={handleLike} /> : <NotLikedIcon handleLike={handleLike} />}
          <span>
            {post.likes.length} likes
          </span>
        </div>
        <div className='action'>
          <CommentIcon />
          <span>
            {post.comments.length} Comments
          </span>
        </div>
      </div>
    </div>
  )
}

export default Post