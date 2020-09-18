import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '@/services/api';
import { setCurrentUser } from '@/store/actions/auth';
import { addError, removeError } from '@/store/actions/error';
import ErrorDisplay from '@/components/Error/ErrorDisplay';
import TitleComponent from '@/container/DefaultLayout/TitleComponent';
import { useToasts } from 'react-toast-notifications';
import FullLoading from '@/components/Loading/Loading';

function EditProfile() {
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.error);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const INITIAL_STATE = {
    name: user.name ? user.name : '',
    surname: user.surname ? user.surname : '',
    email: user.email ? user.email : '',
    two_factor: user.twoFactorEnable,
  };

  const [value, setValue] = useState(INITIAL_STATE);

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    apiRequest('put', '/api/auth/account/edit', value)
      .then(({ updatedUser }) => {
        const { name, surname, email, twoFactorEnable } = updatedUser;
        dispatch(
          setCurrentUser({ ...user, name, surname, email, twoFactorEnable }),
        );
        dispatch(removeError());
        setLoading(false);
        console.log('Data updated');
        const content = 'Profile data updated successfully';
        addToast(content, {
          appearance: 'success',
          autoDismiss: true,
        });
      })
      .catch((error) => {
        setLoading(false);
        dispatch(addError(error));
      });
  };

  return (
    <div className="card" style={{ position: 'relative' }}>
      {loading && <FullLoading />}
      <TitleComponent title="Edit Profile" />
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <ErrorDisplay error={error} />
          <h4 className="pb-2 mb-3 border-bottom">Edit Profile</h4>
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
                  value={value.name}
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
                  value={value.surname}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="emailField">E-Mail</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="emailField"
              onChange={handleChange}
              value={value.email}
            />
          </div>
          <div className="form-group">
            <div className="custom-control custom-switch mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="toggle2Factor"
                name="two_factor"
                checked={value.two_factor}
                onChange={() =>
                  setValue({ ...value, two_factor: !value.two_factor })
                }
              />
              <label className="custom-control-label" htmlFor="toggle2Factor">
                Enable 2-Factor Auth
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
