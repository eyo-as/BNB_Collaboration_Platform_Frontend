import { useEffect, useState } from "react";
import ContentLeft from "../main-content/ContentLeft";
import { Link } from "react-router-dom";

const Login = () => {
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
                <h2>Login</h2>
              </div>
            </div>

            <div className="col-lg-6 col-md-8">
              <div className="page-title-list">
                <ul>
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li className="active">Login</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-area py-12">
        <div className="container">
          <form className="user-form">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>User name or email</label>
                  <input className="form-control" type="text" name="name" />
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
                  <span className="forgot-login">
                    <a href="register.html">Forgot Password?</a>
                  </span>
                </div>
              </div>

              <div className="col-12">
                <button className="default-btn" type="submit">
                  Log In
                </button>
              </div>

              <div className="col-12">
                <p className="create">
                  Dont have an account? <Link to="/sign-up">Sign Up</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
