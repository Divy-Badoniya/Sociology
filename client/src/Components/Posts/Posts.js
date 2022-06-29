import React from 'react'
import { useSelector } from 'react-redux'
import Post from "./Post/Post"
import "./styles.css"

const Posts = () => {
  const { posts } = useSelector((store) => store.postReducer)
  return (
    <div className='posts'>
      {posts.map((post) => {
        return (
          <Post post={post} key={post._id}/>
        )
      })}
    </div>
  )
}

export default Posts