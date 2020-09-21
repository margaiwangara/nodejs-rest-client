import React from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { profileOverlay } from '@/utils/styling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logoutUser } from '@/store/actions/auth';
import { BASE_URL } from '@/utils/env';
import Identicon from 'react-identicons';

function DefaultSideBar({ sidebarOpen }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const signOut = (e) => {
    // e.preventDefault();
    console.log('Signed Out');
    logoutUser(dispatch).then(() => history.push('/login'));
  };

  const profileImage =
    user.profileImage === 'no-image.jpg' ||
    user.profileImage.toLowerCase().startsWith('http') ? (
      <Identicon string={user.email} size={80} />
    ) : (
      <img
        src={`${BASE_URL}/uploads/${user.profileImage}`}
        alt="potrait"
        className="w-100 h-100 rounded-circle"
        style={{ objectFit: 'cover' }}
      />
    );

  return (
    <div
      className="sidebar bg-light"
      style={{ width: sidebarOpen ? '300px' : 0 }}
    >
      <div className="sidebar-top p-3 d-flex flex-column align-items-center justify-content-center border-bottom border-grey">
        <figure
          className="m-0 mt-3"
          style={{ height: '80px', width: '80px', position: 'relative' }}
        >
          <Link
            to="/edit-profile-picture"
            style={profileOverlay}
            className="rounded-circle bg-primary"
          >
            <FontAwesomeIcon
              icon="pencil-alt"
              color="#ffffff"
              style={{ fontSize: '15px' }}
            />
          </Link>
          {profileImage}
        </figure>
        <h5 className="text-center mt-4 mb-2 text-dark">
          {user.name} {user.surname}
        </h5>
        <p className="mb-3 text-secondary">{user.email}</p>
        <button className="btn btn-danger btn-block mb-2" onClick={signOut}>
          Logout
        </button>
      </div>
      <div className="sidebar-bottom">
        <ul className="list-unstyled sidebar-ul d-flex flex-column py-3 px-4">
          <li className="sidbar-li">
            <NavLink
              exact
              className="sidebar-a"
              activeClassName="sidebar-active"
              to="/"
            >
              <FontAwesomeIcon icon="tachometer-alt" className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li className="sidebar-li">
            <NavLink
              exact
              className="sidebar-a"
              activeClassName="sidebar-active"
              to="/edit-profile"
            >
              <FontAwesomeIcon icon="user-edit" className="mr-3" />
              Edit Profile
            </NavLink>
          </li>
          <li className="sidebar-li">
            <NavLink
              exact
              className="sidebar-a"
              activeClassName="sidebar-active"
              to="/change-password"
            >
              <FontAwesomeIcon icon="key" className="mr-3" />
              Change Password
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DefaultSideBar;
