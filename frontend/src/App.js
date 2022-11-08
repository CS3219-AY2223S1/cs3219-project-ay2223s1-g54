import { Route, Routes } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import AccountSettingsPage from "./components/pages/AccountSettingsPage";
import CollaborationPage from "./components/pages/CollaborationPage";
import ConfirmAccountPage from "./components/pages/ConfirmAccountPage";
import ForgetPasswordPage from "./components/pages/ForgetPasswordPage";
import HomePage from "./components/pages/HomePage";
import InvalidPage from "./components/pages/InvalidPage";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import SubmissionViewerPage from "./components/pages/SubmissionViewerPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/confirm/:confirmationCode"
        element={<ConfirmAccountPage />}
      />
      <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
      <Route
        path="/resetPassword/:userId/:token"
        element={<ResetPasswordPage />}
      />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/accountSettings" element={<AccountSettingsPage />} />
          <Route path="/submissionViewer" element={<SubmissionViewerPage />} />
          <Route path="/collaboration" element={<CollaborationPage />} />
        </Route>
      </Route>

      <Route path="/*" element={<InvalidPage />} />
    </Routes>
  );
}

export default App;
