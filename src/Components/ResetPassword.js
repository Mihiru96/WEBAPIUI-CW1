import React, { useEffect, useState, useRef } from "react";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import TextField from "../Components/UI/TextField";
import {
  PasswordFormat,
  Error,
  MsgError,
  MsgPasswordFormatError,
  Success,
  MsgPasswordNullError,
  MsgConPasswordNullError,
  MsgConPasswordMatchError
} from "../Common/Constant";

import LogoImg from "../Assets/Images/logo-colored.png";
import loginImg from "../Assets/Images/Bgimage.jpeg";
import ResetPasswordDto from "./Dtos/ResetPasswordDto";
import { CircularProgress } from '@mui/material';
import { resetPassword } from "../Apis/User.api";
import UuidEncoder from 'uuid-encoder'

function ResetPassword() {
  const passwordRef = useRef();
  const conPasswordRef = useRef();
  const [id, setId] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [isConPassword, setIsConPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPWNull, setIsPWNull] = useState(null);
  const [isConfirmPWNull, setIsConfirmPWNull] = useState(null);
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const encoder = new UuidEncoder('base36');
  const navigate = useNavigate();

  const handleKeypress = e => {
    if (e.keyCode === 13) {
      this.btn.click();
    }
  };

  useEffect(() => {
    if (searchParams.get("id")) {
      setId(searchParams.get("id"));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isPwValid = false;
    let isCPwValid = false;

    const password = passwordRef.current.value;
    const conPassword = conPasswordRef.current.value;

    if (password === "") {
      setIsPWNull(true);
      setIsPasswordValid(false);
    } else if (!PasswordFormat.test(password)) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
      isPwValid = true;
    }

    if (conPassword === "") {
      isConfirmPWNull(true);
      setIsConPassword(false);
    } else if (!conPassword || conPassword !== password) {
      setIsConPassword(false);
    } else {
      setIsConPassword(true);
      isCPwValid = true;
    }

    if (isPwValid && isCPwValid) {
      // let Id = encoder.decode(id)

      setIsLoading(true);
      const resetPasswordDto = new ResetPasswordDto(id, password);
      resetPassword(resetPasswordDto)
        .then((result) => {
          setIsLoading(false);
          if (result.status === 200) {
            navigate("/");
            enqueueSnackbar(result.message, {
              variant: Success,
            });
          } else {
            enqueueSnackbar(result.message, {
              variant: Error,
            });
          }

        })
        .catch((err) => {
          setIsLoading(false);
          enqueueSnackbar(MsgError, {
            variant: Error,
          });
        });
    }
  };

  const styles = {
    container: {
      backgroundImage: `url(${loginImg})`,
      height: "100vh",
    },

    logo: {
      textAlign: "center",
    },

    button: {
      height: "56px",
      padding: "6px 8px",
      backgroundColor: "#000000",
      borderRadius: "0",
      color: "white",
      position: "relative"
    },
    buttondisabled: {
      height: "56px",
      padding: "6px 8px",
      backgroundColor: "#808080",
      borderRadius: "0",
      position: "relative"
    },
    circularprogress: {
      color: "white",
      marginLeft: 0,
      position: "absolute"
    },

    link: {
      color: "#B1001D",
      textAlign: "Right",
      textDecoration: "none",
    },

    backbtn: {
      position: "absolute ",
    },
  };

  return (
    <div style={styles.container}>
      <Container sx={{ pt: 20 }}>
        <Grid container justifyContent="center">
          <Paper
            sx={{
              width: "280px",
              background: "#f6f6f6",
              padding: 4,
              justifyContent: "center",
              border: "2px ",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <div style={styles.logo}>
                    <img src={LogoImg} />
                  </div>
                  <Typography
                    variant="h5"
                    component="h2"
                    align="center"
                    marginTop="15px"
                  >
                    Reset Password
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    label="New Password"
                    type="password"
                    inputRef={passwordRef}
                    error={isPasswordValid === false}
                    helperText={
                      isPWNull ? MsgPasswordNullError : (isPasswordValid === false ? MsgPasswordFormatError : "")
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Confirm New Password"
                    type="password"
                    inputRef={conPasswordRef}
                    error={isConPassword === false}
                    helperText={
                      isConfirmPWNull ? MsgConPasswordNullError : (isConPassword === false ? MsgConPasswordMatchError : "")
                    }
                    onKeyPress={handleKeypress}
                  />
                </Grid>
                <Grid item sx={{ color: "#999999", fontSize: "12px" }}>
                  <p sx={{ marginTop: "10px" }}>Passwords must contain:</p>
                  <ul>
                    <li>8 or more characters</li>
                    <li>Use upper and lower case letters (e.g. Aa)</li>
                    <li>Use a number (e.g. 1234)</li>
                    <li>Use a symbol (e.g. !@#$)</li>
                  </ul>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  marginLeft: -4,
                  marginRight: -4,
                  marginBottom: -4,
                  marginTop: 4,
                }}
              >
                <Button
                  disabled={isLoading}
                  style={isLoading === true ? styles.buttondisabled : styles.button}
                  fullWidth
                  //onClick={handleSubmit}
                  type="submit"
                  name="btn"

                >
                  Change Password
                  {isLoading === true && <CircularProgress style={styles.circularprogress} />}
                </Button>
              </Grid>

            </form>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
}

export default ResetPassword;