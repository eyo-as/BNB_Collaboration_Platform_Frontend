import ContentLeft from "../components/main-content/ContentLeft";
import ContentRight from "../components/main-content/ContentRight";

const AskQuestion = () => {
  return (
    <>
      <div>
        <div className="main-content-area ptb-100">
          <div className="container">
            <div className="row">
              <ContentLeft />

              {/* main content of ask question page */}
              <div className="col-lg-6">
                <div className="middull-content">
                  <form className="your-answer-form">
                    <div className="form-group">
                      <h3>Create a questions</h3>
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Category</label>

                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                      >
                        <option selected="">Selete cagegory</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>
                        Tags (Add up to 5 tags to describe what your question is
                        about)
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <div id="txtEditor"></div>
                    </div>
                    <div className="form-group">
                      <div className="file-upload-account-info">
                        <input
                          type="file"
                          name="file"
                          id="file-2"
                          className="inputfile"
                        />
                        <label className="upload">
                          <i className="ri-link"></i>
                          Upload Photo
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="default-btn">
                        Post your answer
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <ContentRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
