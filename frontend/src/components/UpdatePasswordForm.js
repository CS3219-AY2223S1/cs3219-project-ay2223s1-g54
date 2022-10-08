import {
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";

import * as React from "react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import * as configs from "../configs";
import { usePrivateAxios } from "../hooks/useAxios";

const UpdatePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [openPasswordForm, setOpenPasswordForm] = useState(false);
  const privateAxios = usePrivateAxios();

  const handleOpenForm = () => {
    setOpenPasswordForm(true);
  };

  const handleCloseForm = () => {
    setOpenPasswordForm(false);
  };

  const handleUpdatePassword = async () => {
    try {
      await privateAxios.post(configs.URL_USER_SVC_UPDATE_USER, {
        oldPassword,
        newPassword,
      });
      alert("Success");
    } catch (err) {
      if (err?.response?.data?.error) {
        const { name, message } = err.response.data.error;
        alert(`${name}::${message}`);
        return;
      }
      alert("Error::Please try again later");
    }
  };

  return (
    <div>
      <MenuItem value="Change password" onClick={handleOpenForm}>
        <div>Change password</div>
      </MenuItem>
      <Dialog open={openPasswordForm} onClose={handleCloseForm}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Please input the old password</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="oldPassword"
            label="Old password"
            type="password"
            fullWidth
            variant="standard"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Please input the new password</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleUpdatePassword}>Update password</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdatePasswordForm;
