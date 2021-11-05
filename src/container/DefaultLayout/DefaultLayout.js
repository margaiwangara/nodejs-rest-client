import React, { useState, useEffect } from 'react';
import routes from '@/routes';
import Loading from '@/utils/Loading';
import { Route, Switch, NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loadProfileImage } from '@/utils/loadProfileImage';
import { SCRAPER_BASE_URL, SCRAPER_IMAGES_BASE_URL } from '@/utils/env';
import Image from '@/components/Image';
import { logoutUser } from '@/store/actions/auth';

const DefaultSideBar = React.lazy(() => import('./DefaultSideBar'));
// const FancyRoute = React.lazy(() => import('@/components/FancyRoute'));

function DefaultLayout() {
  const [articles, setArticles] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setFetching(true);
    async function fetchArticles() {
      try {
        const result = await axios.get('/api/articles', {
          baseURL: SCRAPER_BASE_URL,
          params: {
            limit: 5,
            sort: '-datePublished',
          },
        });
        const articles = await result.data;

        setArticles(articles?.data || []);
        setFetching(false);
      } catch (error) {
        setFetching(false);
        setHasError(true);
      }
    }

    fetchArticles();
  }, []);

  // check for image in article and replace part of it with our own
  const match = /[a-zA-Z0-9-_\s]+\.(png|jpg|jpeg|gif)/gi;

  const paths = articles?.map((a) => {
    return a?.image?.match(match)[0];
  });

  const signOut = () => {
    // e.preventDefault();
    //
    logoutUser(dispatch).then(() => history.push('/login'));
  };

  return (
    <DefaultLayoutWrapper>
      <section className="default-inner">
        <DefaultSideBar />
        <section className="default-inner__end">
          <React.Suspense fallback={Loading()}>
            <Switch>
              {routes.map((route, index) =>
                route.component ? (
                  <Route
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    key={index}
                    render={(props) => <route.component {...props} />}
                  />
                ) : (
                  ''
                ),
              )}
            </Switch>
          </React.Suspense>
        </section>
        <section className="default-inner__center">
          <h6 className="heading">TECH NEWS</h6>
          <section className="default-inner--box shadow">
            <ul className="default-inner__center__list">
              {fetching ? (
                <Spinner />
              ) : (
                articles?.map((article, i) => (
                  <li
                    className="default-inner__center__item"
                    key={article?._id}
                  >
                    <figure className="user__avatar">
                      <Image
                        src={`${SCRAPER_IMAGES_BASE_URL}/${paths[i]}`}
                        fallback="https://via.placeholder.com/40.png"
                        alt={article?.title}
                      />
                    </figure>
                    <section className="default-inner__center__item__end">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://laravel-news.com/${article?.link}`}
                        className="default-inner__center__link"
                      >
                        {article?.title}
                      </a>
                      <p className="default-inner__center__content">
                        {article?.summary}
                      </p>
                    </section>
                  </li>
                ))
              )}
            </ul>
          </section>
        </section>
        <NavbarOnSmall>
          <section className="nav__start" style={{ height: isOpen ? 150 : 0 }}>
            <ul className="nav__start__list">
              <li className="nav__start__list__item">
                <article className="user-info">
                  <figure className="user__avatar">
                    {loadProfileImage(user, 40)}
                  </figure>
                  <section className="user-info__body">
                    <h5 className="user__title">
                      {user?.name} {user?.surname}
                    </h5>
                    <h6 className="user__subtitle">{user?.email}</h6>
                  </section>
                </article>
              </li>
              <li className="nav__start__list__item">
                <a
                  href="#signout"
                  className="nav__start__list__link"
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
          </section>
          <section className="nav__end">
            <ul className="nav__end__menu">
              <li className="nav__end__menu__item">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav__end__menu__link"
                >
                  <span>
                    <FontAwesomeIcon icon="columns" />
                  </span>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li className="nav__end__menu__item">
                <NavLink
                  exact
                  to="/edit-profile"
                  activeClassName="active"
                  className="nav__end__menu__link"
                >
                  <span>
                    <FontAwesomeIcon icon="user-edit" />
                  </span>
                  <span>Edit Profile</span>
                </NavLink>
              </li>
              <li className="nav__end__menu__item">
                <NavLink
                  exact
                  to="/change-password"
                  activeClassName="active"
                  className="nav__end__menu__link"
                >
                  <span>
                    <FontAwesomeIcon icon="unlock-alt" />
                  </span>
                  <span>Change Password</span>
                </NavLink>
              </li>
              <li className="nav__end__menu__item">
                <a
                  href="#toggle"
                  className="nav__end__menu__link"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                  }}
                >
                  <figure className="avatar">
                    {loadProfileImage(user, 40)}
                  </figure>
                </a>
              </li>
            </ul>
          </section>
        </NavbarOnSmall>
      </section>
    </DefaultLayoutWrapper>
  );
}

const NavbarOnSmall = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: var(--white);
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;

  .nav__start {
    border-bottom: solid 1px #ddd;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: height 0.5s ease-in-out;
    overflow: hidden;

    &__list {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;

      &__item {
        flex: 1;
        display: flex;
      }

      &__link {
        padding: 1rem 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        color: var(--primary);
        font-size: 1.1rem;
        /* border: solid 1px; */
        width: 100%;
      }

      .user-info {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        border-bottom: solid 1px var(--custom-gray);
        padding: 1.25rem 1rem;
        width: 100%;

        &__body {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
      }
    }
  }

  .nav__end {
    &__menu {
      list-style-type: none;
      display: flex;
      padding: 0;
      margin: 0;

      &__item {
        flex: 1;

        &:last-child {
          border-right-color: transparent;
        }
      }

      &__link {
        padding: 1rem 0.5rem;
        display: flex;
        /* flex-direction: column; */
        gap: 0.5rem;
        text-align: center;
        border-right: solid 1px var(--custom-gray);
        text-decoration: none;
        height: 100%;
        color: var(--primary);
        align-items: center;
        justify-content: center;

        span:first-of-type {
          font-size: 1.5rem;
        }

        span:last-of-type {
          font-size: 0.8rem;
          display: none;
        }

        &.active {
          color: var(--bs-green);
          background-color: #fafafa;
        }
      }

      .avatar {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        border: solid 1px var(--custom-gray);
        margin: 0;
        overflow: hidden;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;
const DefaultLayoutWrapper = styled.section`
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: var(--custom-gray);
  color: var(--primary);
  overflow-y: auto;

  .default-inner {
    width: 90%;
    margin: 0 auto;
    padding: 1.5rem 1rem;
    display: flex;
    gap: 2rem;

    @media only screen and (max-width: 768px) {
      width: 100%;
      flex-direction: column;
      padding-bottom: 6rem;
    }

    .user__avatar {
      height: 40px;
      width: 40px;
      /* background-color: red; */
      overflow: hidden;
      border-radius: 10px;
      margin: 0;
      border: solid 1px transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .user__title {
      font-size: 1rem;
      font-weight: 700;
    }

    .user__subtitle {
      font-size: 0.8rem;
      font-weight: 400;
      color: var(--bs-gray);
    }

    .user__title,
    .user__subtitle {
      margin: 0;
    }

    .user__details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    img {
      object-fit: cover;
      object-position: top;
    }

    .heading {
      font-weight: 700;
      color: var(--bs-gray);
      font-size: 0.9rem;
    }

    &__start,
    &__center,
    &__end {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    &__start,
    &__center {
      width: 250px;
    }

    &__center {
      gap: 0.25rem;
      /* border: solid 1px purple; */

      @media only screen and (max-width: 768px) {
        width: 100%;
      }

      &__list {
        list-style-type: none;
        padding: 0.5rem 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        /* gap: 0.5rem; */
      }

      &__item {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        /* border: solid 1px var(--custom-gray); */
        /* border-radius: 8px; */
        border-bottom: solid 1px var(--custom-gray);
        align-items: center;

        .user__avatar {
          display: none;
        }

        &__end {
          display: flex;
          flex-direction: column;
          /* align-items: flex-start; */
        }

        &:last-of-type {
          border-bottom-color: transparent;
        }
      }

      &__link {
        text-decoration: none;
        font-weight: 700;

        &:hover {
          text-decoration: underline;
        }
      }

      &__content,
      &__link {
        font-size: 0.8rem;
        /* width: 150px;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block; */
      }

      &__content {
        margin: 0;
      }
    }

    &--box {
      border-radius: 10px;
      overflow: hidden;
      background-color: var(--white);
    }

    &__start {
      &__user {
        padding: 1rem;
        gap: 0.75rem;
        align-items: center;
        display: flex;
        /* border: solid 1px pink; */

        &__content {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
      }

      &__user,
      &__sidenav {
        border-radius: 10px;
        overflow: hidden;
        background-color: var(--white);
      }

      &__sidenav {
        padding: 0.5rem 0;

        .sidenav-list {
          display: flex;
          flex-direction: column;
          list-style-type: none;
          padding: 0;
          margin: 0;

          &__item {
          }

          &__link {
            display: flex;
            align-items: center;
            padding: 0.8rem 1.5rem;
            width: 100%;
            font-size: 1rem;
            font-weight: 600;
            color: var(--primary);
            gap: 0.75rem;
            text-decoration: none;
            border-bottom: solid 1px var(--custom-gray);
            border-left: solid 2px transparent;

            span:first-of-type {
              height: 20px;
              width: 20px;
              overflow: hidden;
            }

            &:hover,
            &.active {
              color: var(--bs-green);
              border-left-color: var(--bs-green);
              background-color: #fafafa;
            }
          }
        }
      }

      @media only screen and (max-width: 768px) {
        display: none;
      }
    }

    &__end {
      flex: 1;
      /* border: solid 1px purple; */

      &--shared {
        display: flex;
        background-color: #ffffff;
        padding: 1rem;
        /* border: solid 1px pink; */
        border-radius: 10px;
        overflow: hidden;
      }

      &__post {
        flex-direction: column;
        gap: 0.75rem;

        &--submit,
        &__start {
          gap: 0.55rem;
        }

        &--submit {

          @media only screen and (max-width: 576px) {
            padding: 1rem 0.5rem;
            gap: 0.25rem;
            
            .user__avatar, img {
              box-sizing: content-box; 
            }

          }
        }

        &__start {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
        }

        &__end {
          p {
            margin: 0;
          }
        }
      }

      &__text {
        flex: 1;
        display: flex;

        textarea {
          border: none;
          padding: 0.5rem 0.15rem;
          outline: none;
          resize: none;
          /* max-height: 100%; */
          flex: 1;
          max-height: 40px;
          font-size: 1rem;
          --ms-overflow-style: none // IE and Edge
          scrollbar-width: none; // Firefox

          &::-webkit-scrollbar {
            display: none; // chrome, safari, opera
          }
        }
      }

      .btn {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-weight: 700;
      }
    }
  }
`;

export default DefaultLayout;
