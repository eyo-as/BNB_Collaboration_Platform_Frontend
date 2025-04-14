import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../util/auth";
import ContentLeft from "../../main-content/ContentLeft";
import { login } from "../../../../service/user.service";

const Login = () => {
  const emailDom = useRef();
  const passwordDom = useRef();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const userData = {
      email: emailDom.current.value.trim(),
      password: passwordDom.current.value.trim(),
    };

    if (!userData.email || !userData.password) {
      setMessage("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await login(userData);

      if (!response.success) {
        setMessage(response.message || "Login failed");
      } else {
        
        if (!response.token) {
          throw new Error("No token received from server");
        }

        setToken(response.token); 
        setMessage("Login successful! Redirecting...");

        setTimeout(() => {
          navigate("/", { replace: true }); 
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            {message && (
              <p
                className={
                  message.includes("success") ? "text-success" : "text-danger"
                }
              >
                {message}
              </p>
            )}

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="email"
                    ref={emailDom}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    ref={passwordDom}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="col-12">
                <button
                  className="default-btn"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
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
