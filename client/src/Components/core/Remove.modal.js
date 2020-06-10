import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Typography } from "@material-ui/core";
import { LanguageContext } from "../locale/LanguageProvider";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

export default function RemoveModal(props) {
  const T = useContext(LanguageContext).dictionary;
  const {
    accountModal,
    envelopeModal,
    open,
    item,
    yesHandler,
    noHandler,
  } = props;
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleYes = () => {
    yesHandler(item);
  };

  const handleNo = (item) => {
    noHandler(item);
  };

  const BuildMessage = () => {
    let dialog = {};
    if (accountModal) dialog = T.Dialogs.RemoveAccount;
    if (envelopeModal) dialog = T.Dialogs.RemoveEnvelope;

    return (
      <>
        <h2 id="simple-modal-title">{dialog.Title}</h2>
        <p id="simple-modal-description">
          {dialog.Body[0]}
          <br />
          {dialog.Body[1]}
          <br />
          <b>{dialog.Question.replace("{title}", item.title)}</b>
        </p>
      </>
    );
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={noHandler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Typography
          component="div"
          style={modalStyle}
          className={classes.paper}
        >
            <BuildMessage />
          <Button onClick={handleYes}>Yes</Button>
          <Button onClick={handleNo}>No</Button>
        </Typography>
      </Modal>
    </div>
  );
}
