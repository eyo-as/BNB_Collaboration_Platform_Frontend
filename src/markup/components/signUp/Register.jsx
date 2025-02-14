import { useEffect, useState } from "react";
import ContentLeft from "../main-content/ContentLeft";
import { Link } from "react-router-dom";

const Register = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="page-title-area p-8">
        <div className="container">
          <div className="row align-items-center">
            {!isLargeScreen && <ContentLeft />}

            <div className="col-lg-6 col-md-4">
              <div className="page-title-content">
                <h2>Sign up</h2>
              </div>
            </div>

            <div className="col-lg-6 col-md-8">
              <div className="page-title-list">
                <ul>
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li className="active">Sign up</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sign-up-area">
        <div className="container">
          <form className="user-form">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>User name</label>
                  <input className="form-control" type="text" name="name" />
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label>Email</label>
                  <input className="form-control" type="email" name="name" />
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="login-action">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      I agree to the
                      <a href="terms-conditions.html">Terms of Use</a> and
                      <a href="privacy-policy.html">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <button className="default-btn" type="submit">
                  Sign up
                </button>
              </div>

              <div className="col-12">
                <p className="create">
                  Already on disilab? <Link to="/login">Log in</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
