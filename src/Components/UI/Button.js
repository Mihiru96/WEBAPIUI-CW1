import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = (props) => {
  const { variant, color, text, size, fullWidth, onClick } = props;

  return (
    <MuiButton
      variant={variant || "contained"}
      color={color || "primary"}
      size={size || "medium"}
      fullWidth={fullWidth || false}
      onClick={onClick}
    >
      {text}
    </MuiButton>
  );
};

export default Button;