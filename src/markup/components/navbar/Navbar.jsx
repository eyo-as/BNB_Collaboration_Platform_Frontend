import { useEffect, useState } from "react";
import logo from "../../../assets/images/logo3.png";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwtDecode(token);

      if (user.role === "admin") {
        setIsAuthorized(true);
      }
    }
  }, []);

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
                      {" "}
                      Home{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/about-us"} className="nav-link">
                      {" "}
                      About Us{" "}
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
                        {" "}
                        Admin{" "}
                      </Link>
                    </li>
                  )}
                </ul>

                <div className="others-options">
                  <ul>
                    <li>
                      <form className="search-box">
                        <input
                          type="text"
                          name="Search"
                          placeholder="Search for..."
                          className="form-control"
                        />

                        <button type="submit" className="search-btn">
                          <i className="ri-search-line"></i>
                        </button>
                      </form>
                    </li>
                    <li>
                      <Link to={"/login"} className="active">
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link to={"/register"}>Sign up</Link>
                    </li>
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

            <div className="container">
              <div className="option-inner">
                <div className="others-options justify-content-center d-flex align-items-center">
                  <ul>
                    <li>
                      <form className="search-box">
                        <input
                          type="text"
                          name="Search"
                          placeholder="Search for..."
                          className="form-control"
                        />

                        <button type="submit" className="search-btn">
                          <i className="ri-search-line"></i>
                        </button>
                      </form>
                    </li>
                    <li>
                      <Link to={"/login"} className="active">
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link to={"/register"}>Sign up</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
