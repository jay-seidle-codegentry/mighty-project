import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

export default function Dialoger(props) {
  const { open, closeHandler } = props;

  return (
    <div>
      <Dialog
        maxWidth="xl"
        open={open}
        onClose={closeHandler}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
}
