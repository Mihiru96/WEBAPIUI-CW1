import React from "react";
import { TextField as MuiTextField } from "@mui/material";

const TextField = (props) => {
  const {
    id,
    label,
    variant,
    size,
    fullWidth,
    multiline,
    rows,
    value,
    inputRef,
    type,
    onChange,
    error,
    helperText,
    disabled,
    sx
  } = props;

  return (
    <MuiTextField
      id={id}
      label={label || null}
      variant={variant || "outlined"}
      size={size || "small"}
      multiline={multiline || false}
      rows={multiline === true ? rows : 0}
      fullWidth={fullWidth || true}
      value={value}
      inputRef={inputRef}
      type={type || "text"}
      onChange={onChange}
      error={error}
      helperText={helperText}
      disabled={disabled}
      sx={sx}
    />
  );
};

export default TextField;
