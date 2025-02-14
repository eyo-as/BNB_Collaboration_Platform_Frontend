import { useEffect, useState } from "react";
import ContentLeft from "../components/main-content/ContentLeft";
import { Link } from "react-router-dom";

const ContactUs = () => {
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
      <div className="main-content-area">
        <div className="page-title-area p-8">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-4">
                <div className="page-title-content">
                  <h2>Contact us</h2>
                </div>
              </div>

              <div className="col-lg-6 col-md-8">
                <div className="page-title-list">
                  <ul>
                    <li>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="active">Contact us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {!isLargeScreen && <ContentLeft />}
            <div className="col-lg">
              <section className="contact-area ptb-100">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="contact-form">
                        <h2>Get in touch</h2>

                        <form id="contactForm">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label>Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  className="form-control"
                                  required=""
                                  data-error="Please enter your name"
                                  placeholder="Nofty"
                                />
                                <div className="help-block with-errors"></div>
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="form-group">
                                <label>Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  className="form-control"
                                  required=""
                                  data-error="Please enter your email"
                                  placeholder="nofty@gmail.com"
                                />
                                <div className="help-block with-errors"></div>
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="form-group">
                                <label>Your Phone No</label>
                                <input
                                  type="text"
                                  name="phone_number"
                                  id="phone_number"
                                  required=""
                                  data-error="Please enter your number"
                                  className="form-control"
                                  placeholder="+1(514)-984-4455"
                                />
                                <div className="help-block with-errors"></div>
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="form-group">
                                <label>Your Subject</label>
                                <input
                                  type="text"
                                  name="msg_subject"
                                  id="msg_subject"
                                  className="form-control"
                                  required=""
                                  data-error="Please enter your subject"
                                  placeholder="Subject"
                                />
                                <div className="help-block with-errors"></div>
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="form-group">
                                <label>Your Message</label>
                                <textarea
                                  name="message"
                                  className="form-control"
                                  id="message"
                                  cols="30"
                                  rows="6"
                                  required=""
                                  data-error="Write your message"
                                  placeholder="Write your message"
                                ></textarea>
                                <div className="help-block with-errors"></div>
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="form-check ps-0">
                                <div className="form-group">
                                  <div className="form-check">
                                    <input
                                      name="gridCheck"
                                      value="I agree to the terms and privacy policy."
                                      className="form-check-input"
                                      type="checkbox"
                                      id="gridCheck"
                                      required=""
                                    />

                                    <label
                                      className="form-check-label"
                                      htmlFor="gridCheck"
                                    >
                                      I agree to the{" "}
                                      <a href="terms-conditions.html">Terms</a>{" "}
                                      and{" "}
                                      <a href="privacy-policy.html">
                                        Privacy Policy
                                      </a>
                                    </label>
                                    <div className="help-block with-errors gridCheck-error"></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                              <button type="submit" className="default-btn">
                                Send Message
                              </button>
                              <div
                                id="msgSubmit"
                                className="h3 text-center hidden"
                              ></div>
                              <div className="clearfix"></div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="contacts-info">
                        <h2>Contact informaton</h2>

                        <ul className="address">
                          <li>
                            <span>Call:</span>
                            <a href="tel:+1-719-504-1984">+1 719-504-1984</a>
                          </li>
                          <li>
                            <span>Email:</span>
                            <a href="/cdn-cgi/l/email-protection#02726b647b42656f636b6e2c616d6f">
                              <span
                                className="__cf_email__"
                                data-cfemail="1d6d747b645d7a707c7471337e7270"
                              >
                                [email&#160;protected]
                              </span>
                            </a>
                          </li>
                          <li className="location">
                            <span>Address:</span>
                            2958 Horizon Circle University Place, WA 98466
                          </li>
                        </ul>

                        <div className="map-area">
                          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2713.893524676537!2d-122.58847098419128!3d47.140352028062196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54910702082dcf29%3A0x93d011f7cb28f1ba!2zSG9yaXpvbiBTdCwgSm9pbnQgQmFzZSBMZXdpcy1NY0Nob3JkLCBXQSwg4Kau4Ka-4Kaw4KeN4KaV4Ka_4KaoIOCmr-CngeCmleCnjeCmpOCmsOCmvuCmt-CnjeCmn-CnjeCmsA!5e0!3m2!1sbn!2sbd!4v1641898735703!5m2!1sbn!2sbd"></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
