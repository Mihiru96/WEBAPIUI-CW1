import { CircularProgress } from "@mui/material";
import React from "react";

const style = {
  wrapper: {
    height: "100%",
    width:"100%",
    margin: "0px auto",
    overflow: "hidden",
    position: "fixed",
    zIndex:1000,
    left:0,
    top:0,
    background:"rgba(255,255,255,0.8)"
  },
  subWrapper: {
    height: "100%",
    width:"100%",
    margin: "0px auto",
    overflow: "hidden",
    position: "absolute",
    zIndex:1,
    left:0,
    top:0,
    background:"rgba(255,255,255,0.8)"
  },
  content:{
    height: "100px",
    width:"100px",
    margin: "auto",
    position: "relative",
    textAlign: "center",
    top:"50%"
  },
  spinner:{
    color:"#b1001d"
  }
};

const FullPageSpinner = ({isSubWrapper}) => {
  return <div style={isSubWrapper ? style.subWrapper : style.wrapper}>
    <div style={style.content}>
    <CircularProgress style={style.spinner} />
    </div>
  </div>
}

export default FullPageSpinner;