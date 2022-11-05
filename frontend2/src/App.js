import { Route, Routes } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import CollaborationPage from "./components/pages/CollaborationPage";
import HomePage from "./components/pages/HomePage";
import InvalidPage from "./components/pages/InvalidPage";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/collaboration" element={<CollaborationPage />} />
        </Route>
      </Route>

      <Route path="/*" element={<InvalidPage />} />
    </Routes>
  );
}

export default App;
