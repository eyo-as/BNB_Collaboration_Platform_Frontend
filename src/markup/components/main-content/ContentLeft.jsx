import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ContentLeft = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      <div className="col-lg-3">
        <div className="sidebar-menu-wrap">
          <div
            className="offcanvas offcanvas-start w-75"
            tabIndex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div className="left-sidebar">
                <nav className="sidebar-nav" data-simplebar="">
                  <ul id="sidebar-menu" className="sidebar-menu">
                    <li>
                      <Link to={"/"} className="box-style active">
                        <span className="menu-title">
                          <i className="ri-home-8-line"></i>
                          Home
                        </span>
                      </Link>
                    </li>

                    {isAuthorized && (
                      <li>
                        <Link to={"/"} className="box-style active">
                          <span className="menu-title">
                            <i className="ri-home-8-line"></i>
                            Admin Dashboard
                          </span>
                        </Link>
                      </li>
                    )}

                    <li>
                      <div
                        className="has-arrow box-style"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {" "}
                        {/* Click handler */}
                        <i className="ri-question-line"></i>
                        <span className="menu-title"> Questions </span>
                        {/* Add an icon to indicate the dropdown state (optional) */}
                        <i
                          className={`ri-arrow-down-s-line  ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          style={{ transition: "transform 0.2s" }}
                        ></i>{" "}
                        {/* Conditional class for rotation */}
                      </div>
                      <ul
                        className={`sidemenu-nav-second-level ${
                          isOpen ? "block" : "hidden"
                        }`}
                      >
                        {" "}
                        {/* Conditional class for visibility */}
                        <li>
                          <Link to={"/ask-question"}>
                            <span className="menu-title">Ask Question</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/questions"}>
                            <span className="menu-title">Questions</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to={"/about-us"} className="box-style">
                        <span className="menu-title">
                          <i className="ri-lightbulb-line"></i>
                          About
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/contact-us"} className="box-style">
                        <span className="menu-title">
                          <i className="ri-map-pin-line"></i>
                          Contact
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link to={"/user-profile"} className="box-style">
                        <span className="menu-title">
                          <i className="ri-user-line"></i>
                          Profile
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/login"} className="box-style">
                        <span className="menu-title">
                          <i className="ri-login-box-line"></i>
                          Sign in
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentLeft;
