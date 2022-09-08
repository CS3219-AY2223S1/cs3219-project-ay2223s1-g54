import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useEffect } from "react";


function CollaborationPage() {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/matching")
    }

    useEffect(() => {
        if (localStorage.getItem('token') == null)
            navigate("/login")
    })

    return ( 
        <Box display={"flex"} flexDirection={"column"} width={"90%"}>
            <Typography variant={"h6"} align={"center"} marginBottom={"2rem"}>Collaboration Page - Work in Progress</Typography>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <Button variant={"outlined"} onClick={()=>handleCancel()} startIcon={<CloseSharpIcon />} >back</Button>
            </Box>
        </Box>
        
    )



}

export default CollaborationPage;