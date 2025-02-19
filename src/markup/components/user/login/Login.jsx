import { useEffect, useRef, useState } from "react";
import ContentLeft from "../../main-content/ContentLeft";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../../service/user.service";

const Login = () => {
  const emailDom = useRef();
  const passwordDom = useRef();

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: emailDom.current.value.trim(),
      password: passwordDom.current.value.trim(),
    };

    if (!userData.email || !userData.password) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await login(userData);

      if (!response.success) {
        setMessage(response.message);
      } else {
        setMessage(response.data + " redirect...");
        setTimeout(() => {
          navigate("/ask-question");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred. Please try again.");
    }
  };

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
          <form className="user-form" onSubmit={handleSubmit}>
            <p
              className={
                message.includes("success") ? "text-success" : "text-danger"
              }
            >
              {message}
            </p>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>Email</label>
                  <input className="form-control" type="text" ref={emailDom} />
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    ref={passwordDom}
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
                  Dont have an account? <Link to="/register">Sign Up</Link>
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
