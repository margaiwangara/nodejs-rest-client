import React, { useState, useEffect } from 'react';

function EditProfile() {
  return (
    <div className="card">
      <div className="card-body">
        <form>
          <h4 className="pb-2 mb-3 border-bottom">Edit Profile</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="nameField">Name</label>
                <input type="text" className="form-control" id="nameField" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="surNameField">Surname</label>
                <input type="text" className="form-control" id="surnameField" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="emailField">E-Mail</label>
            <input type="email" className="form-control" id="emailField" />
          </div>
          <div className="form-group">
            <div className="custom-control custom-switch mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="toggle2Factor"
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
