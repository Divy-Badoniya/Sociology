import React, { useState } from 'react'
import FileBase from "react-file-base64"
import { useDispatch } from "react-redux"
import { createPost } from '../../Actions/post'
import "./styles.css"

const Share = () => {
  const [postData, setPostData] = useState({
    message: "",
    selectedFile: ""
  })
  const dispatch = useDispatch()
  const { user } = JSON.parse(localStorage.getItem('profile'))

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost({ ...postData, creatorUsername: user?.username }))
  }

  return (
    <form className='shareContainer' onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setPostData({ ...postData, message: e.target.value })} placeholder="What's Happening" value={postData.message} />
      <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Share