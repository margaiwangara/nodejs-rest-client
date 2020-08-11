import React from 'react';

function ChangePassword() {
  return (
    <div className="card">
      <div className="card-body">
        <form>
          <h4 className="pb-2 mb-3 border-bottom">Change Password</h4>
          <div className="form-group">
            <label htmlFor="currentPasswordField">Current Password</label>
            <input
              type="password"
              className="form-control"
              id="currentPasswordField"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordField">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordField"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPasswordField">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPasswordField"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
