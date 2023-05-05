import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "./Button";

const PopupForm = (props) => {
  const { title, children, open, setOpen } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth={"md"}
      scroll={"paper"}
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent id="scroll-dialog-description" dividers>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          text="Cancel"
          onClick={() => setOpen(false)}
          autoFocus
        />
        <Button text="Save" />
      </DialogActions>
    </Dialog>
  );
};

export default PopupForm;
