import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '@/services/api';
import { setCurrentUser, getUserDetails } from '@/store/actions/auth';
import { addError, removeError } from '@/store/actions/error';
import ErrorDisplay from '@/components/Error/ErrorDisplay';
import TitleComponent from '@/container/DefaultLayout/TitleComponent';
import { useToast } from '@/hooks/useToast';
import Dropzone from '@/components/Dropzone';

function EditProfile() {
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.error);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const INITIAL_STATE = {
    name: '',
    surname: '',
    email: '',
    two_factor: user?.twoFactorEnable,
  };

  const [value, setValue] = useState(INITIAL_STATE);

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await apiRequest('put', '/api/auth/account/edit', value);
      const { name, surname, email, twoFactorEnable } = result?.updatedUser;
      let profile = user?.profileImage;

      if (files.length > 0) {
        profile = await uploadProfileImage();
      }

      dispatch(
        setCurrentUser({
          ...user,
          name,
          surname,
          email,
          twoFactorEnable,
          profileImage: profile,
        }),
      );
      dispatch(removeError());
      setLoading(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      setLoading(false);
      setIsSuccess(false);
      dispatch(addError(error));
    }
  };

  const uploadProfileImage = async () => {
    try {
      const data = new FormData();
      data.append('file', files[0]);

      await apiRequest('put', '/api/auth/account/edit/profile', data);
      // get current user data
      const current = await getUserDetails();
      const { profileImage } = current;

      // mock
      // dispatch(setCurrentUser({ ...user, profileImage: 'no-image.jpg' }));
      // dispatch(setCurrentUser({ ...user, profileImage }));
      // return toast?.success('Profile image updated');
      return profileImage;
    } catch (error) {
      // return toast?.error('Profile image not updated');
      return user?.profileImage;
    }
  };

  return (
    <>
      <TitleComponent title="Edit Profile" />
      <section className="default-inner__end--shared shadow">
        <form
          action="#"
          method="POST"
          onSubmit={handleSubmit}
          className="p-2 w-100"
        >
          {isSuccess && (
            <div class="alert alert-success">Profile updated successfully</div>
          )}
          <ErrorDisplay error={error} />
          <fieldset disabled={loading}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="nameField">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="nameField"
                    onChange={handleChange}
                    defaultValue={user?.name}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="surNameField">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    name="surname"
                    id="surnameField"
                    onChange={handleChange}
                    defaultValue={user?.surname}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="emailField">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="emailField"
                onChange={handleChange}
                defaultValue={user?.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profile-image">Profile Image</label>
              <Dropzone files={files} setFiles={setFiles} />
            </div>
            <div className="form-group">
              <div className="custom-control custom-switch mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="toggle2Factor"
                  name="two_factor"
                  defaultChecked={user?.twoFactorEnable}
                  onChange={(e) => {
                    setValue({ ...value, two_factor: !value.two_factor });
                  }}
                />
                <label className="custom-control-label" htmlFor="toggle2Factor">
                  Enable 2-Factor Auth
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default EditProfile;
