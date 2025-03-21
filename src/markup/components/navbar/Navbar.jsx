import { useEffect, useState } from "react";
import logo from "../../../assets/images/logo3.png";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Effect to check token and set user state
  useEffect(() => {
    if (token) {
      const user = jwtDecode(token);
      setUser(user);
      setIsLoggedIn(true);

      if (user.role === "admin") {
        setIsAuthorized(true);
      }
    } else {
      setIsLoggedIn(false);
      setIsAuthorized(false);
      setUser({});
    }
  }, [token]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <>
      <div className="navbar-area">
        <div className="mobile-responsive-nav">
          <div className="container">
            <div className="mobile-responsive-menu">
              <div className="logo">
                <Link to={"/"}>
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="desktop-nav">
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link to={"/"}>
                <img src={logo} alt="logo" />
              </Link>

              <div
                className="collapse navbar-collapse mean-menu visible"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav m-auto">
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link active">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/about-us"} className="nav-link">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/contact-us"} className="nav-link">
                      Contact Us
                    </Link>
                  </li>

                  {isAuthorized && (
                    <li className="nav-item">
                      <Link to={"/admin"} className="nav-link">
                        Admin
                      </Link>
                    </li>
                  )}
                </ul>

                <div className="others-options">
                  <ul>
                    <span>
                      {!isLoggedIn ? (
                        <span>
                          <li>
                            <Link to={"/login"} className="active">
                              Log in
                            </Link>
                          </li>
                          <li>
                            <Link to={"/register"}>Sign up</Link>
                          </li>
                        </span>
                      ) : (
                        <span>
                          <li>
                            <span className="border-l-4 p-2 text-white">
                              Hi {user.username}
                            </span>
                          </li>
                          <li>
                            <Link className="active" onClick={handleLogout}>
                              Log Out
                            </Link>
                          </li>
                        </span>
                      )}
                    </span>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="others-option-for-responsive">
          <div className="container">
            <div className="dot-menu">
              <div className="inner">
                <button
                  className="btn btn-primary bg-transparent border-0 p-0"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  <i className="ri-menu-line text-3xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
