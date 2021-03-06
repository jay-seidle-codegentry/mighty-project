import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import { useAuth0 } from "../../react-auth0-spa";
import { AppBar, Toolbar, Menu, MenuItem, Avatar } from "@material-ui/core";
import SimpleMenu from "../simple-menu/SimpleMenu";
import LanguageSelector from "../locale/LanguageSelector";
import { ViewContext } from "../view/ViewProvider";
import { LanguageContext } from "../locale/LanguageProvider";
import { GlobalContext } from "../Global/GlobalProvider";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const styles = {
  floatRightGroup: {
    marginRight: "10px",
    marginTop: "10px",
    position: "absolute",
    float: "right",
    top: 0,
    right: 0,
    minWidth: "140px",
  },
  language: {
    marginTop: "10px",
    marginRight: "10px",
    float: "left",
  },
  menu: {
    padding: "20px",
  },
  avatar: {
    float: "right",
  },
};

const NavBar = () => {
  const globalContext = useContext(GlobalContext);
  const { isAuthenticated } = useAuth0();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [avatar, setAvatar] = useState("");
  const [nickName, setNickName] = useState("");
  const { setView } = useContext(ViewContext);
  const T = useContext(LanguageContext).dictionary;

  const profileHandler = (newProfile) => {
    if (newProfile.avatar) setAvatar(newProfile.avatar);
    if (newProfile.nickName) setNickName(newProfile.nickName);
  };

  useEffect(() => {
    globalContext.subscribe("profile", profileHandler);

    return () => {
      globalContext.unsubscribe("profile", profileHandler);
    };
  }, [globalContext]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    if (event.currentTarget.id) setView(event.currentTarget.id);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SimpleMenu style={styles.menu} />
          {isAuthenticated && (
            <div style={styles.floatRightGroup}>
              <div>
                <LanguageSelector style={styles.language} />
              </div>
              <div>
                <Avatar
                  style={styles.avatar}
                  className={classes.large}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  alt={nickName}
                  src={avatar}
                />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem id="profile" onClick={handleClose}>
                    {T.UserMenu.Profile}
                  </MenuItem>
                  <MenuItem id="account" onClick={handleClose}>
                    {T.UserMenu.Account}
                  </MenuItem>
                </Menu>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
