import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import CollaborationPage from "./components/pages/CollaborationPage";
import DashboardPage from "./components/pages/DashboardPage";
import RegisterPage from "./components/pages/RegisterPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/collaboration" element={<CollaborationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
