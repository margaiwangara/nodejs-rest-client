import React, { useEffect, useState } from 'react';
import TitleComponent from '@/container/DefaultLayout/TitleComponent';
import SimpleBar from 'simplebar-react';
import { chatItemStyling } from '@/utils/styling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '@/store/actions/user';
import Loading from '@/utils/Loading';

function Home() {
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { users, count } = useSelector((state) => state.users);

  useEffect(() => {
    let isMounted = true;
    setLoadingUsers(true);
    getUsers(dispatch)
      .then(() => {
        if (isMounted) {
          console.log('Users acquired');
          setLoadingUsers(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          console.log('Users not acquired');
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [count]);

  return (
    <div className="card">
      <TitleComponent title="Dashboard" />
      <div className="card-body">
        <h3>Dashboard</h3>
        <div className="row my-4">
          <div className="col-md-5">
            <div className="card mb-3">
              <div className="card-header bg-primary">
                <h5 className="my-0 text-white font-weight-bold">Users</h5>
              </div>
              <div className="card-body">
                {loadingUsers ? (
                  <Loading />
                ) : (
                  <ul className="list-group">
                    {users.length > 0
                      ? users.map((value) => (
                          <li
                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0"
                            key={value.id}
                          >
                            <h6 className="my-0">{value.name}</h6>
                            <span
                              className="rounded-circle bg-secondary"
                              style={{ width: '13px', height: '13px' }}
                            ></span>
                          </li>
                        ))
                      : ''}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card">
              <div className="card-body p-0">
                <SimpleBar
                  style={{
                    height: '400px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    padding: '17.5px 30px',
                  }}
                >
                  <div
                    style={chatItemStyling}
                    className="d-inline-flex flex-column bg-light rounded p-2 mb-2"
                  >
                    <h6
                      className="p-0 m-0 font-weight-bold"
                      style={{ fontSize: '14px' }}
                    >
                      Jane Doe
                    </h6>
                    <p className="p-0 mb-1 small">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Repudiandae, asperiores.
                    </p>
                    <span className="text-muted" style={{ fontSize: '12px' }}>
                      15th Sept, 2020 9:16pm
                    </span>
                  </div>
                </SimpleBar>
                <div
                  className="input-group rounded"
                  style={{ overflow: 'hidden' }}
                >
                  <input
                    type="text"
                    name="message"
                    className="form-control"
                    placeholder="Type something..."
                    style={{
                      borderRadius: 0,
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderLeft: 'none',
                    }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn py-1 px-2 btn-secondary"
                      style={{ borderRadius: 0 }}
                    >
                      <FontAwesomeIcon
                        icon="arrow-alt-circle-right"
                        style={{ fontSize: '25px' }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
