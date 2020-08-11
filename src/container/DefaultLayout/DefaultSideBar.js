import React from 'react';
import me from '@/assets/images/me2.jpg';

function DefaultSideBar() {
  return (
    <div className="card w-100">
      <div className="card-body text-center">
        <div className="image-area d-flex justify-content-center">
          <figure className="m-0" style={{ height: '150px', width: '150px' }}>
            <img
              src={me}
              alt="portrait"
              className="w-100 h-100 rounded-circle"
              style={{ objectFit: 'cover' }}
            />
          </figure>
        </div>
        <h3 className="text-center mt-3">Margai Wangara</h3>
        <p>margaiwangara@gmail.com</p>
        <hr />
        <div className="list-group">
          <a className="list-group-item list-group-item-action" href="#home">
            Home
          </a>
          <a
            className="list-group-item list-group-item-action active"
            href="#home"
          >
            Edit Profile
          </a>
          <a className="list-group-item list-group-item-action" href="#home">
            Change Password
          </a>
        </div>
        <hr />
        <button className="btn btn-danger btn-block">Logout</button>
      </div>
    </div>
  );
}

export default DefaultSideBar;
