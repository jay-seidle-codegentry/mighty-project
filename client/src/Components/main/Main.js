import React, { useContext, useState, useEffect } from "react";
import NavBar from "../../Components/navbar/NavBar";
import { Paper } from "@material-ui/core";
import { ViewContext } from "../view/ViewProvider";
import Views from "../../ViewComponents";
import { GlobalContext } from "../Global/GlobalProvider";

const styles = {
  viewContainer: {
    minHeight: "88vh",
  },
};

export var Main = (props) => {
  const globalContext = useContext(GlobalContext);
  const { view } = useContext(ViewContext);
  const [validProfile, setValidProfile] = useState();

  const profileHandler = (profile) => {
    const { exists } = profile;
    if (exists) setValidProfile(exists);
  };

  useEffect(() => {
    globalContext.subscribe("profile", profileHandler);

    return () => {
      globalContext.unsubscribe("profile", profileHandler);
    };
  }, [globalContext]);

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
      if (!validProfile) {
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
