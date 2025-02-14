import { Routes, Route } from "react-router-dom";

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
import Answer from "./markup/pages/Answer";
import SignIn from "./markup/pages/SignIn";
import SignUp from "./markup/pages/Signup";
import Profile from "./markup/pages/Profile";
import AdminDashboard from "./markup/pages/admin/AdminDashboard";
import AboutUs from "./markup/pages/AboutUs";
import ContactUs from "./markup/pages/ContactUs";
import ScrollToTop from "./markup/components/scrollToTop/ScrollToTop";

const App = () => {
  return (
    <>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/ask-question" element={<AskQuestion />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
