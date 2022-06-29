import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux"
import FileBase from "react-file-base64"
import { updateUserInfo } from "../../Actions/user";
import { useNavigate } from "react-router-dom";

function EditProfileModal({ ModalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const [formData, setFormData] = useState(data)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { username } = useSelector((store) => store.authReducer.authData.user)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    dispatch(updateUserInfo(formData))
    setModalOpened(false)
    navigate(`/profile/${username}`)
  }

  return (
    <Modal overlayColor={
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[2]
    } overlayOpacity={0.55} overlayBlur={3} opened={ModalOpened} onClose={() => setModalOpened(false)} size="50%" >
      <form className="editInfoForm" onSubmit={handleSubmit}>
        <h3>Your Information</h3>
        <div>
          <input type="text" placeholder="First Name" className="infoInput" name="firstname" onChange={handleChange} value={formData.name.split(' ')[0]} />
          <input type="text" placeholder="Last Name" className="infoInput" name="lastname" onChange={handleChange} value={formData.name.split(' ')[1]} />
        </div>
        <div>
          <input type="text" placeholder="Username" className="infoInput" name="username" onChange={handleChange} value={formData.username} />
        </div>
        <div>
          <input type="text" placeholder="Works At" className="infoInput" name="worksAt" onChange={handleChange} value={formData.worksAt ? formData.worksAt : ""} />
        </div>
        <div>
          <input type="text" placeholder="Lives in" className="infoInput" name="livesIn" onChange={handleChange} value={formData.livesIn ? formData.livesIn : ""} />
          <input type="text" placeholder="Country" className="infoInput" name="country" onChange={handleChange} value={formData.country ? formData.country : ""} />
        </div>
        <div>
          <input type="text" placeholder="Bio" className="infoInput" name="bio" onChange={handleChange} value={formData.bio ? formData.bio : ""} />
        </div>
        <div>
          <div>
            <span>
              Profile Image
            </span>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, profilePicture: base64 })} />
          </div>
          <div>
            <span>
              Cover Image
            </span>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, coverPicture: base64 })} />
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </Modal>
  );
}

export default EditProfileModal;
