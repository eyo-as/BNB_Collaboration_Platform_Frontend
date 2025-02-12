const Copyright = () => {
  return (
    <>
      <div className="copy-right-area">
        <div className="container">
          <div className="copy-right-content">
            <div className="row">
              <div className="col-lg-6 col-md-8">
                <p>
                  © Pify is Proudly Owned by
                  <a href="https://envytheme.com/" target="_blank">
                    EnvyTheme.com
                  </a>
                </p>
              </div>
              <div className="col-lg-6 col-md-4">
                <div className="language">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected="">Language</option>
                    <option value="1">English</option>
                    <option value="2">Arabic</option>
                    <option value="3">Germany</option>
                  </select>
                  <i className="ri-global-line"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Copyright;
