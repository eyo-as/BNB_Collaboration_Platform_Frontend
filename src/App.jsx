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
import AskQuestion from "./markup/pages/question/AskQuestion";
import Layout from "./markup/components/layout/Layout";
import NotFound from "./markup/components/404/NotFound";
import SignUp from "./markup/pages/user/SignUp";
import SignIn from "./markup/pages/user/SignIn";
import Profile from "./markup/pages/user/Profile";
import AdminDashboard from "./markup/pages/admin/AdminDashboard";
import AboutUs from "./markup/pages/AboutUs";
import ContactUs from "./markup/pages/ContactUs";
import ScrollToTop from "./markup/components/scrollToTop/ScrollToTop";
import GetAllUser from "./markup/pages/user/GetAllUser";
import QuestionList from "./markup/pages/question/QuestionList";
import SingleQuestionPage from "./markup/pages/question/SingleQuestionPage";
import CreateAnswer from "./markup/pages/answer/CreateAnswer";
import GetAnswerByQuestionIdPage from "./markup/pages/answer/GetAnswerByQuestionIdPage";
import Unauthorized from "./markup/components/unauthorized/Unauthorized";
import ProtectedRoute from "./markup/components/auth/ProtectedRoute";
import DeleteUser from "./markup/pages/user/DeleteUser";
import UpdateUser from "./markup/components/user/update/UpdateUser";
import { AuthProvider } from "./util/auth";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/ask-question" element={<AskQuestion />} />
            <Route path="/questions" element={<QuestionList />} />
            <Route
              path="/questions/:question_id"
              element={<SingleQuestionPage />}
            />

            <Route
              path="/questions/:question_id/answer"
              element={<CreateAnswer />}
            />
            <Route
              path="/questions/:question_id/answers"
              element={<GetAnswerByQuestionIdPage />}
            />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route
              path="/user-profile/:user_id/edit"
              element={<UpdateUser />}
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <GetAllUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:user_id/delete"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <DeleteUser />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );
};

export default App;
