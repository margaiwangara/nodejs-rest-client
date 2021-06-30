import React from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { profileOverlay } from '@/utils/styling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logoutUser } from '@/store/actions/auth';
import { loadProfileImage } from '@/utils/loadProfileImage';

function DefaultSideBar({ sidebarOpen }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const signOut = () => {
    // e.preventDefault();
    //
    logoutUser(dispatch).then(() => history.push('/login'));
  };

  return (
    <section className="default-inner__start">
      <article className="default-inner__start__user shadow">
        <figure className="user__avatar">{loadProfileImage(user, 40)}</figure>
        <section className="default-inner__start__user__content">
          <h5 className="user__title">
            {user?.name} {user?.surname}
          </h5>
          <h6 className="user__subtitle">{user?.email}</h6>
        </section>
      </article>
      <aside className="default-inner__start__sidenav shadow">
        <ul className="sidenav-list">
          <li className="sidenav-list__item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="sidenav-list__link"
            >
              <span>
                <FontAwesomeIcon icon="columns" />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="sidenav-list__item">
            <NavLink
              exact
              to="/edit-profile"
              activeClassName="active"
              className="sidenav-list__link"
            >
              <span>
                <FontAwesomeIcon icon="user-edit" />
              </span>
              <span>Edit Profile</span>
            </NavLink>
          </li>
          <li className="sidenav-list__item">
            <NavLink
              to="/change-password"
              className="sidenav-list__link"
              exact
              activeClassName="active"
            >
              <span>
                <FontAwesomeIcon icon="unlock-alt" />
              </span>
              <span>Change Password</span>
            </NavLink>
          </li>
          <li className="sidenav-list__item">
            <a
              href="#dashboard"
              className="sidenav-list__link"
              style={{ borderBottomColor: 'transparent' }}
              onClick={(e) => {
                e.preventDefault();

                signOut();
              }}
            >
              <span>
                <FontAwesomeIcon icon="sign-out-alt" />
              </span>
              <span>Log Out</span>
            </a>
          </li>
        </ul>
      </aside>
    </section>
  );
}

export default DefaultSideBar;
