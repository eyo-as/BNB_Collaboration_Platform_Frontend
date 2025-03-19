import logo from "../../../assets/images/logo3.png";
import footerShape from "../../../assets/images/footer-shape.png";
import Copyright from "../copyright/Copyright";
import GoToPage from "../goToPage/GoToPage";
import { Link } from "react-router";
const Footer = () => {
  return (
    <>
      <div className="footer-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget style-two">
                <li>
                  <img src={logo} alt="Image" />
                </li>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="single-footer-widget style-two ml-15">
                <h3>Company</h3>
                <ul className="import-link">
                  <li>
                    <Link to={"/about-us"}>About us</Link>
                  </li>
                  <li>
                    <Link to={"/contact-us"}>Contact us</Link>{" "}
                  </li>
                  <li>
                    <Link to={"/user-profile"}>Profile</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="single-footer-widget style-two">
                <h3>Explore</h3>

                <ul className="import-link">
                  <li>
                    <Link to={"/ask-question"}>Ask question</Link>
                  </li>
                  <li>
                    <Link to={"/questions"}>Get questions</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="single-footer-widget style-two">
                <h3>Follow us</h3>
                <ul className="import-link">
                  <li>
                    <a href="https://t.me/bnbhawasa" target="_blank">
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget style-two">
                <h3>Contact Us</h3>

                <ul className="address-link">
                  <li>
                    <span>Call: </span>
                    <span>046 220 6090</span>
                  </li>
                  <li>
                    <span>Email: </span>
                    <span>
                      <span
                        className="__cf_email__"
                        data-cfemail="2d5d444b546d4a404c4441034e4240"
                      >
                        example@mail.com
                      </span>
                    </span>
                  </li>
                  <li>
                    <span>Address: </span>
                    Hawassa, Ethiopia
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-shape">
          <img src={footerShape} alt="Image" />
        </div>
      </div>
      <Copyright />
      <GoToPage />
    </>
  );
};

export default Footer;
