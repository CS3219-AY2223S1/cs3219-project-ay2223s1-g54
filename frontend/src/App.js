import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import MatchingPage from './components/MatchingPage';
import WaitingPage from './components/WaitingPage';
import {Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
                        <Route path="/signup" element={<SignupPage/>}/>
                    </Routes>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/matching" />}></Route>
                        <Route path="/matching" element={<MatchingPage/>}/>
                    </Routes>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/waiting" />}></Route>
                        <Route path="/waiting" element={<WaitingPage/>}/>
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;
