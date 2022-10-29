import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import WaitingPage from "./components/WaitingPage";
import CollaborationPage from "./components/CollaborationPage";
import InvalidPage from "./components/InvalidPage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import RequestResetPasswordPage from "./components/RequestResetPasswordPage";
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/resetPassword" element={<RequestResetPasswordPage />} />
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/matching" element={<MainPage />} />
          <Route path="/waiting" element={<WaitingPage />} />
          <Route path="/collaboration" element={<CollaborationPage />} />
        </Route>
      </Route>

      <Route path="/*" element={<InvalidPage />} />
    </Routes>
  );
};

export default App;
