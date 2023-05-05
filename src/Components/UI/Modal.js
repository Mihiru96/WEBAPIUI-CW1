import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  CircularProgress,
  Select,
  MenuItem
} from "@mui/material";
import Stack from "@mui/material/Stack";
import "./Modal.css";

const Modal = ({
  title,
  customWidth,
  marginleft,
  children,
  isOpen,
  onClose,
  onSave,
  showApplyToAll,
  onApplyToAllClick,
  button1,
  button2,
  hideButton2,
  hasButton2Spinner,
  hasHeaderDropdown,
  headerDropdownList,
  headerDropdownDefaultValue,
  headerDropdownDisableList,
  headerDropdownEventHandler
}) => {

  const [isApplyAllSelected, setIsApplyAllSelected] = useState(false);
  const [defaultDropdownValue, setDefaultDropdownValue] = useState(headerDropdownDefaultValue);
  const [selectedValue, setSelectedValue] = useState(headerDropdownDefaultValue);

  const applyAllChangeHandler = (e) => {
    setIsApplyAllSelected((prev) => {
      onApplyToAllClick(!prev);
      return !prev
    });
  }

  const modalCloseHandler = (event, reason) => {
    if (reason && reason == "backdropClick")
      return;
    onClose(false);
  };

  //styles
  const styles = {
    button: {
      backgroundColor: "#000",
      borderRadius: "0",
      color: "white",
      height: "56px",
      textAlign: "center",
      width: "200px",
      marginRight: "-8px",
    },

    cancelBtn: {
      backgroundColor: "#CFCFCF ",
      borderRadius: "0",
      color: "black",
      height: "56px",
      textAlign: "center",
      width: "200px",
    },

    closeBtnWeb: {
      backgroundColor: "#CFCFCF",
      borderRadius: "0",
      color: "black",
      height: "56px",
      textAlign: "center",
      width: "200px",
      marginRight: "-8px",
      marginLeft: `${marginleft}`

    },
    closeBtn: {
      backgroundColor: "#CFCFCF",
      borderRadius: "0",
      color: "white",
      height: "56px",
      textAlign: "center",
      width: "200px",
      marginRight: "-8px",
      marginLeft: "175px"

    },
    closeBtnMobile: {
      backgroundColor: "#CFCFCF",
      borderRadius: "0",
      color: "white",
      height: "56px",
      textAlign: "center",
      width: "200px",
      marginRight: "-8px",
      marginLeft: "55px"

    },
    circularprogress: {
      color: "#FFFF",
      marginLeft: 7,
      position: "absolute"

    },
  };

  return (
    <Dialog
      open={isOpen}
      onClose={modalCloseHandler}
      maxWidth={customWidth ? customWidth : "md"}
      scroll={"paper"}
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle sx={{ zIndex: 2 }}>
        {/* <Stack direction="row" spacing={0}> */}
        {title}
        {hasHeaderDropdown && <Select
          sx={{ float: "right", width: "150px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          onChange={({ target }) => {
            setSelectedValue(target.value);
            headerDropdownEventHandler(target.value);
          }}
        >
          {headerDropdownList.map((i, index) => {
            const foundItem = headerDropdownDisableList.filter((item) => { return item === index; });
            if (foundItem.length > 0) {
              if (foundItem[0] !== defaultDropdownValue) {
                return <MenuItem key={index} disabled value={index}>{i}</MenuItem>
              } else {
                return <MenuItem key={index} value={index}>{i}</MenuItem>
              }
            } else {
              // if(index === (headerDropdownList.length - 1)){
              //   return <MenuItem key={index} disabled value={index}>{i}</MenuItem>
              // }else{
              return <MenuItem key={index} value={index}>{i}</MenuItem>
              // }
            }
          })}
        </Select>}
        {/* </Stack> */}
      </DialogTitle>
      <DialogContent
        sx={{ borderBottom: "none" }}
        id="scroll-dialog-description"
        dividers
      >
        {children}
      </DialogContent>

      <DialogActions
        sx={{
          paddingBottom: "0px",
          paddingTop: "0px",
          backgroundColor: "#F4F4F4",
          zIndex: 2
        }}
      >
        {/* <Button variant="text" text="Cancel" onClick={modalCloseHandler}>
          Cancel
        </Button> */}
        {/* <Button variant="contained" text="Save" onClick={onSave}>
          Save
        </Button> */}
        <Grid item xs={4}>
          <Stack direction="row" spacing={0}>
            {showApplyToAll && <FormControlLabel label="Apply to all" sx={{ position: "absolute", left: "26px", mt: "8px" }}
              control={<Switch checked={isApplyAllSelected} onChange={applyAllChangeHandler}
              />}
            />}

            <Button
              style={styles.closeBtnWeb}
              fullWidth
              onClick={modalCloseHandler}
            >
              {button1 ? button1 : "Cancel"}
            </Button>

            {hideButton2 ? <></> : <Button disabled={hasButton2Spinner} style={styles.button} fullWidth onClick={onSave}>
              {button2 ? button2 : "Save"}
              {hasButton2Spinner === true && <CircularProgress size="1.5rem" style={styles.circularprogress} />}
            </Button>}
          </Stack>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;