import logo from "../../../assets/images/logo.png";
import footerShape from "../../../assets/images/footer-shape.png";
import Copyright from "../copyright/Copyright";
import GoToPage from "../goToPage/GoToPage";
const Footer = () => {
  return (
    <>
      <div className="footer-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget style-two">
                <a href="index.html">
                  <img src={logo} alt="Image" />
                </a>

                <p>
                  Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                  Vivamus suscipit tortor eget felis porttitor volutpat.
                  Pellentesque in ipsum id orci porta dapibus.
                </p>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="single-footer-widget style-two ml-15">
                <h3>Company</h3>

                <ul className="import-link">
                  <li>
                    <a href="about.html">About us</a>
                  </li>
                  <li>
                    <a href="contact-us.html">Contact us</a>
                  </li>
                  <li>
                    <a href="blog.html">Blog</a>
                  </li>
                  <li>
                    <a href="user.html">User</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="single-footer-widget style-two">
                <h3>Explore</h3>

                <ul className="import-link">
                  <li>
                    <a href="ask-questions.html">Ask question</a>
                  </li>
                  <li>
                    <a href="faq.html">FAQs</a>
                  </li>
                  <li>
                    <a href="privacy-policy.html">Privacy policy</a>
                  </li>
                  <li>
                    <a href="terms-conditions.html">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="single-footer-widget style-two">
                <h3>Follow us</h3>

                <ul className="import-link">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" target="_blank">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/" target="_blank">
                      Linkedin
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com/" target="_blank">
                      Twitter
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
                    <span>Call:</span>
                    <a href="tel:+1-719-504-1984">+1 719-504-1984</a>
                  </li>
                  <li>
                    <span>Email:</span>
                    <a href="/cdn-cgi/l/email-protection#fb8b929d82bb9c969a9297d5989496">
                      <span
                        className="__cf_email__"
                        data-cfemail="2d5d444b546d4a404c4441034e4240"
                      >
                        [email&#160;protected]
                      </span>
                    </a>
                  </li>
                  <li>
                    <span>Address:</span>
                    7200 E Dry Creek Rd C104, Centennial, CO 80112, United
                    States
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
