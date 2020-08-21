import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '@/services/api';
import { addError } from '@/store/actions/error';
import ErrorDisplay from '@/components/Error/ErrorDisplay';
import { getUserDetails, setCurrentUser } from '@/store/actions/auth';
import TitleComponent from '@/container/DefaultLayout/TitleComponent';

function EditProfilePicture() {
  const [profile, setProfile] = useState(null);
  // const [profileDisplay, setProfileDisplay] = useState('');
  const { error } = useSelector((state) => state.error);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log('target', e.target.files[0]);

    setProfile(file);

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', profile);

    apiRequest('put', '/api/auth/account/edit/profile', data)
      .then((res) => {
        alert('Profile image updated successfully');
        // update dispatch
        getUserDetails()
          .then((res) => {
            const { profileImage } = res;
            console.log('profileImage', profileImage);
            dispatch(setCurrentUser({ ...user, profileImage }));
          })
          .catch((error) => alert(console.log(error)));
      })
      .catch((error) => {
        dispatch(addError(error));
      });
  };
  return (
    <div className="card">
      <TitleComponent title="Edit Profile Picture" />
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <h4 className="pb-2 mb-3 border-bottom">Edit Profile Picture</h4>
          <ErrorDisplay error={error} />
          <div className="form-group">
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="profileUploadField"
                  name="profile_image"
                  onChange={handleChange}
                />
                <label
                  htmlFor="profileUploadField"
                  className="custom-file-label"
                >
                  Choose file
                </label>
              </div>
              <div className="input-group-append">
                <button type="submit" className="btn btn-secondary">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePicture;
