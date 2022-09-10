import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {useState} from "react";
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript.js'
import socket from '../socket.js'

function CollaborationPage() {
    const [code, setCode] = useState("")
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/matching")
    }

    const options = {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'monokai'
    }

    socket.get().on('code-event', ({newCode}) => {
        updateCodeFromSockets(newCode);
    });

    const updateCodeFromSockets = (newCode) => {
        setCode(newCode)
    }

    const updateCodeInState = (newCode) => {
       setCode(newCode);
       socket.get().emit('code-event1', { room_id: localStorage.getItem('room_id'), newCode });
    };

    return ( 
        <Box display={"flex"} flexDirection={"column"} width={"90%"}>
            <div>
                <CodeMirror 
                    value={code} 
                    onChange={(editor, data, value) => updateCodeInState(value) }
                    options={options}
                />
            </div>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <Button variant={"outlined"} onClick={()=>handleCancel()} startIcon={<CloseSharpIcon />} >back</Button>
            </Box>
        </Box>
        
    )



}

export default CollaborationPage;