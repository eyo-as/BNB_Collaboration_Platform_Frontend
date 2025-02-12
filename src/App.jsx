import "./assets/css/bootstrap.min.css";
import "./assets/css/owl.theme.default.min.css";
import "./assets/css/owl.carousel.min.css";
import "./assets/css/remixicon.css";
import "./assets/css/meanmenu.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/metismenu.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/editor.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";

import Home from "./markup/pages/Home";
import AskQuestion from "./markup/pages/AskQuestion";
import Layout from "./markup/components/layout/Layout";
import NotFound from "./markup/components/404/NotFound";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/ask-question" element={<AskQuestion />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
