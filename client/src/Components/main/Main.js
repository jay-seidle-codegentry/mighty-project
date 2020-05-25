import React, { useContext } from "react";
import NavBar from "../../Components/navbar/NavBar";
import { Paper } from "@material-ui/core";
import { ViewContext } from "../view/ViewProvider";
import { ProfileContext } from "../Profile/ProfileProvider";
import Views from "../../ViewComponents";

const styles = {
  viewContainer: {
    minHeight: "88vh",
  },
};

export var Main = (props) => {
  const { exists } = useContext(ProfileContext);
  const { view } = useContext(ViewContext);

  let SelectedComponent;
  switch (view) {
    case "account":
      SelectedComponent = Views.UserAccount;
      break;
    case "profile":
      SelectedComponent = Views.View;
      break;
    case "editProfile":
      SelectedComponent = Views.Edit;
      break;
    default:
      if (!exists) {
        SelectedComponent = Views.Edit;
      } else {
        SelectedComponent = Views.Home;
      }
  }
  return (
    <div>
      <NavBar />
      <Paper style={styles.viewContainer} elevation={3}>
        <SelectedComponent />
      </Paper>
    </div>
  );
};

export default Main;
