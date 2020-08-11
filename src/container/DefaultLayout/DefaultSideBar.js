import React from 'react';
import me from '@/assets/images/me2.jpg';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { profileOverlay } from '@/utils/styling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logoutUser } from '@/store/actions/auth';

function DefaultSideBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const signOut = (e) => {
    // e.preventDefault();
    console.log('Signed Out');
    logoutUser(dispatch).then(() => history.push('/login'));
  };

  return (
    <div className="card w-100">
      <div className="card-body text-center">
        <div className="image-area d-flex justify-content-center">
          <figure
            className="m-0"
            style={{ height: '150px', width: '150px', position: 'relative' }}
          >
            <span style={profileOverlay} className="rounded-circle bg-primary">
              <FontAwesomeIcon
                icon="pencil-alt"
                color="#ffffff"
                style={{ fontSize: '20px' }}
              />
            </span>
            <img
              src={me}
              alt="portrait"
              className="w-100 h-100 rounded-circle"
              style={{ objectFit: 'cover' }}
            />
          </figure>
        </div>
        <h3 className="text-center mt-3">
          {user.name} {user.surname}
        </h3>
        <p>{user.email}</p>
        <hr />
        <div className="list-group">
          <NavLink
            activeClassName="active"
            to="/"
            exact
            className="list-group-item list-group-item-action"
          >
            Dashboard
          </NavLink>
          <NavLink
            activeClassName="active"
            to="/edit-profile"
            className="list-group-item list-group-item-action"
          >
            Edit Profile
          </NavLink>
          <NavLink
            activeClassName="active"
            to="/change-password"
            className="list-group-item list-group-item-action"
          >
            Change Password
          </NavLink>
        </div>
        <hr />
        <button className="btn btn-danger btn-block" onClick={signOut}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default DefaultSideBar;
