import React, { useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuth0 } from "../../react-auth0-spa";
import { LanguageContext } from "../locale/LanguageProvider";
import { ViewContext } from "../view/ViewProvider";

const SimpleMenu = (props) => {
  const T = useContext(LanguageContext).dictionary;
  const { setView } = useContext(ViewContext);
  const styles = {
    floatIt: {
      position: "absolute",
      float: "left",
      top: 0,
      left: 0,
      ...props.style,
    },
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    switch (event.currentTarget.id) {
      case "login":
        loginWithRedirect({});
        break;
      case "logout":
        logout();
        break;
      default:
        if (event.currentTarget.id) setView(event.currentTarget.id);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <MenuIcon
        style={styles.floatIt}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id="home" onClick={handleClose}>
          {T.MainMenu.Home}
        </MenuItem>
        <MenuItem id="account" onClick={handleClose}>
          Account
        </MenuItem>
        <MenuItem id="gettingStarted" onClick={handleClose}>
          {T.MainMenu.GettingStarted}
        </MenuItem>
        <MenuItem id="privacy" onClick={handleClose}>
          {T.MainMenu.Privacy}
        </MenuItem>
        <MenuItem id="help" onClick={handleClose}>
          {T.MainMenu.Help}
        </MenuItem>
        {!isAuthenticated && (
          <MenuItem id="login" onClick={handleClose}>
            {T.Login}
          </MenuItem>
        )}
        {isAuthenticated && (
          <MenuItem id="logout" onClick={handleClose}>
            {T.Logout}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default SimpleMenu;
