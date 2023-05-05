import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSnackbar } from "notistack";
import {
  Error,
  MsgError,
} from "../../Common/Constant";

import Modal from "../UI/Modal";

const styles = {
  cancelBtn: {
    backgroundColor: "#CFCFCF ",
    borderRadius: "0",
    color: "white",
    textAlign: "center",
  },
};

const ConfirmationPopup = ({
  msg,
  isOpen,
  onClose,
  onYes,
}) => {
  return (
    <Modal
      title="Confirmation"
      isOpen={isOpen}
      onClose={onClose}
      onSave={onYes}
      button1={"No"}
      button2={"Yes"}
    >
      <Box sx={{ height: "50px" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography align="left" variant="subtitle1">{msg}</Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmationPopup;
