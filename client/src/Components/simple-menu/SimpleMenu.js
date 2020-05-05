import React, { useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import { LanguageContext } from "../locale/LanguageProvider";

const SimpleMenu = (props) => {
  const T = useContext(LanguageContext).dictionary;
  const styles = {
    floatIt: {
      padding: "30px",
      position: "absolute",
      float: "left",
      top: 0,
      left: 0,
    },
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    console.log(event.currentTarget.id);
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
        <MenuItem id="gettingStarted" onClick={handleClose}>
          {T.MainMenu.GettingStarted}
        </MenuItem>
        <MenuItem id="privacy" onClick={handleClose}>
          {T.MainMenu.Privacy}
        </MenuItem>
        <MenuItem id="help" onClick={handleClose}>
          {T.MainMenu.Help}
        </MenuItem>
        <MenuItem id="login" onClick={handleClose}>
          {T.Login}
        </MenuItem>
      </Menu>
    </>
  );
};

export default SimpleMenu;
