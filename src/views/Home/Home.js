import React from 'react';
import me from '@/assets/images/me2.jpg';

function Home() {
  return (
    <div style={{ marginTop: '5vh' }}>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
              <div className="card w-100">
                <div className="card-body text-center">
                  <div className="image-area d-flex justify-content-center">
                    <figure
                      className="m-0"
                      style={{ height: '150px', width: '150px' }}
                    >
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
                  <div className="custom-control custom-switch mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="toggle2Factor"
                    />
                    <label className="custom-control-label" for="toggle2Factor">
                      Enable 2-Factor Auth
                    </label>
                  </div>
                  <button className="btn btn-danger btn-block">Logout</button>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <form>
                        <h4 className="pb-2 mb-3 border-bottom">
                          Edit Profile
                        </h4>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="nameField">Name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="nameField"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="surNameField">Surname</label>
                              <input
                                type="text"
                                className="form-control"
                                id="surnameField"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="emailField">E-Mail</label>
                          <input
                            type="email"
                            className="form-control"
                            id="emailField"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="customFile">Profile Picture</label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Edit Profile
                        </button>
                      </form>
                    </div>
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
