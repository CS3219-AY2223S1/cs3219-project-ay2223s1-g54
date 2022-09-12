import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./components/SignupPage";
import MatchingPage from "./components/MatchingPage";
import WaitingPage from "./components/WaitingPage";
import LoginPage from "./components/LoginPage";
import CollaborationPage from "./components/CollaborationPage";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to="/signup" />}
            ></Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/matching" element={<MatchingPage />} />
            <Route path="/waiting" element={<WaitingPage />} />
            <Route path="/collaboration" element={<CollaborationPage />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
