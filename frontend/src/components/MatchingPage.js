import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {useNavigate} from 'react-router-dom';

function MatchingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') == null)
            navigate("/login");
    })

    const handleMatch = (difficulty) => {
        localStorage.setItem('difficulty', difficulty);
        navigate("/waiting");
    }

    return ( 
        <Box display={"flex"} flexDirection={"column"} width={"90%"}>
            <Typography variant={"h5"} align={"center"} marginBottom={"2rem"}>Select the Difficulty</Typography>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <Button variant={"outlined"} onClick={()=>handleMatch(0)} sx={{ width: 1/2 }}>Easy</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} >
                <Button variant={"outlined"} onClick={()=>handleMatch(1)} sx={{ width: 1/2 }}>Medium</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <Button variant={"outlined"} onClick={()=>handleMatch(2)} sx={{ width: 1/2 }}>Hard</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <Button variant={"outlined"} onClick={()=>handleMatch(3)} sx={{ width: 1/2 }}>Any</Button>
            </Box>
        </Box>
        
    )



}

export default MatchingPage;