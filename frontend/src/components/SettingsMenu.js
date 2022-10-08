import { Grid, IconButton, MenuItem, Menu } from "@mui/material";

import * as React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import * as configs from "../configs";
import { usePrivateAxios } from "../hooks/useAxios";
import UpdatePasswordForm from "./UpdatePasswordForm";

const SettingsMenu = () => {
  const ITEM_HEIGHT = 48;
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { userId, socket } = auth;
  const privateAxios = usePrivateAxios();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await privateAxios.post(configs.URL_AUTH_SVC_LOGOUT_USER);
    setAuth({});
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    await privateAxios.post(configs.URL_USER_SVC_DELETE_USER);
    setAuth({});
    navigate("/login");
  };

  return (
    <Grid marginTop={"2rem"}>
      <IconButton
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SettingsIcon sx={{ fontSize: 50 }}></SettingsIcon>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <UpdatePasswordForm />
        <MenuItem value="Delete account" onClick={handleDeleteAccount}>
          <div>Delete account</div>
        </MenuItem>
        <MenuItem value="Logout" onClick={handleLogout}>
          <div>Logout</div>
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default SettingsMenu;
