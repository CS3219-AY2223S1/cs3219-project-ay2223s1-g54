import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import MatchingPage from "./components/MatchingPage";
import WaitingPage from "./components/WaitingPage";
import CollaborationPage from "./components/CollaborationPage";
import InvalidPage from "./components/InvalidPage";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/waiting" element={<WaitingPage />} />
        <Route path="/collaboration" element={<CollaborationPage />} />
      </Route>

      <Route path="/*" element={<InvalidPage />} />
    </Routes>
  );
};

export default App;
