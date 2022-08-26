import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IAlertDialog } from "./IAlertDialog";

const AlertDialog = ({
  show,
  message,
  onClickOkay,
  onClickCancel,
  title,
}: IAlertDialog) => {
  const handleOkay = () => {
    onClickOkay();
  };

  return (
    <div>
      <Dialog
        open={show}
        onClose={onClickCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickOkay}>Yes</Button>
          <Button onClick={onClickCancel} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { AlertDialog };
