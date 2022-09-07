import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {URL_USER_SVC_SIGN_IN_USER} from "../configs";
import {STATUS_CODE_OK} from "../constants";
import {Link} from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("")
    const [isSignInSuccess, setSignInSuccess] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        setSignInSuccess(false)
        console.log("Attempt to login");
        const res = await axios.post(URL_USER_SVC_SIGN_IN_USER, {email, password})
        .catch((err) => {
            console.log(err)
            setErrorDialog('Please try again later')
        })
        if (res && res.status === STATUS_CODE_OK) {
            setSuccessDialog('Account successfully logged in')
            setSignInSuccess(true)
        }
    }

    const closeDialog = () => setIsDialogOpen(false)

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Success')
        setDialogMsg(msg)
    }

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Error')
        setDialogMsg(msg)
    }
    
    return (
        <Box display={"flex"} flexDirection={"column"} width={"100%"} alignItems="center">
            <Typography variant={"h1"} marginBottom={"2rem"}>PeerPrep</Typography>
            <TextField
                label="Email address"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <TextField
                label="Password"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{marginBottom: "2rem"}}
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleLogin}>Sign In</Button>
            </Box>
            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {isSignInSuccess
                        ? <Button component={Link} to="/login">Log in</Button>
                        : <Button onClick={closeDialog}>Done</Button>
                    }
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default LoginPage;