import { useEffect, useRef, useState } from "react";
import ContentLeft from "../../main-content/ContentLeft";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../../../service/user.service";

const Register = () => {
  const [message, setMessage] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const navigate = useNavigate();

  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const classIdDom = useRef(null);

  const studentRole = "student";

  const classOptions = [9, 10, 11, 12];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: userNameDom.current.value,
      first_name: firstNameDom.current.value,
      last_name: lastNameDom.current.value,
      email: emailDom.current.value,
      password: passwordDom.current.value,
      role: studentRole,
      class_id: classIdDom.current.value,
    };

    try {
      // validate the form
      if (
        !userData.username ||
        !userData.first_name ||
        !userData.last_name ||
        !userData.email ||
        !userData.password ||
        !userData.class_id
      ) {
        setMessage("All fields are required.");
        return;
      }
      // Call the createUser service
      const response = await createUser(userData);
      setMessage(response.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.error);
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

      <div className="sign-up-area py-12">
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
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    placeholder="User name"
                    ref={userNameDom}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    ref={firstNameDom}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    ref={lastNameDom}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    ref={emailDom}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    ref={passwordDom}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <select
                    className="form-control"
                    name="class_id"
                    ref={classIdDom}
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="">Select Class</option>
                    {classOptions.map((classNum) => (
                      <option key={classNum} value={classNum}>
                        {classNum}
                      </option>
                    ))}
                  </select>
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
                      <Link to="/terms-conditions"> Terms of Use</Link> and
                      <Link to="/privacy-policy"> Privacy Policy</Link>
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
