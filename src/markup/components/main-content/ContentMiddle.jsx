import RecentQuestion from "./contentMiddleContents/RecentQuestion";
import MostAnswered from "./contentMiddleContents/MostAnswered";
import UnansweredQuestion from "./contentMiddleContents/UnansweredQuestion";
import FeaturedQuestion from "./contentMiddleContents/FeaturedQuestion";

const ContentMiddle = () => {
  return (
    <>
      <div className="col-lg-6">
        <div className="middull-content">
          <form className="aq-form">
            <i className="ri-search-line"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Have a question? Ask or enter a search"
            />
          </form>

          <ul
            className="nav nav-tabs questions-tabs d-flex justify-content-between"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="featured-question-tab"
                data-bs-toggle="tab"
                data-bs-target="#featured-question"
                type="button"
                role="tab"
                aria-controls="featured-question"
                aria-selected="true"
              >
                Featured Question
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="recent-questions-tab"
                data-bs-toggle="tab"
                data-bs-target="#recent-questions"
                type="button"
                role="tab"
                aria-controls="recent-questions"
                aria-selected="false"
              >
                Recent Questions
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="most-answered-tab"
                data-bs-toggle="tab"
                data-bs-target="#most-answered"
                type="button"
                role="tab"
                aria-controls="most-answered"
                aria-selected="false"
              >
                Most Answered
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="unanswered-question-tab"
                data-bs-toggle="tab"
                data-bs-target="#unanswered-question"
                type="button"
                role="tab"
                aria-controls="unanswered-question"
                aria-selected="false"
              >
                Unanswered Question
              </button>
            </li>
          </ul>

          <div className="tab-content" id="myTabContent">
            {/* Featured Question Tab */}
            <FeaturedQuestion />

            {/* Recent Questions Tab */}
            <RecentQuestion />

            {/* Most Answered Tab */}
            <MostAnswered />

            {/* Unanswered Question Tab */}
            <UnansweredQuestion />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentMiddle;
