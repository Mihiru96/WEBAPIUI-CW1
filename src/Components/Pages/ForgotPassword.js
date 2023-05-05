import React, { useState, useRef, useEffect } from "react";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import TextField from "../UI/TextField";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { EmailFormat, Error, Success, MsgError, MsgEmailFormatError, MsgEmailNull } from "../../Common/Constant";
import ForgotPasswordDto from "../Dtos/ForgotPasswordDto";
import LogoImg from "../../Assets/Images/logo-colored.png";
import loginImg from "../../Assets/Images/Bgimage.jpeg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from '@mui/material';
import { forgotPassword } from "../../Apis/User.api";
//styles
const styles = {
  container: {
    backgroundImage: `url(${loginImg})`,
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    textAlign: "center",
  },

  gridItemTypography: {
    paddingTop: 10,
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

  link: {
    color: "#000000",
    textDecoration: "none",
  },

  circularprogress: {
    color: "white",
    marginLeft: 0,
    position: "absolute"
  },

  backbtn: {
    position: "absolute ",
  },
};

function ForgotPassword() {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isEmailNUll, setIsEmailNull] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isEmValid = false;

    if (email === "") {
      setIsEmailNull(true);
      setIsEmailValid(false);
    } else if (!EmailFormat.test(email)) {
      setIsEmailValid(false);
      setIsEmailNull(false);
    } else {
      setIsEmailValid(true);
      setIsEmailNull(false);
      isEmValid = true;
    }

    if (isEmValid) {
      setIsLoading(true);
      const forgotPasswordDto = new ForgotPasswordDto(email);
      forgotPassword(forgotPasswordDto)
        .then((result) => {
          setIsLoading(false);
          if (result.status === 200) {
            enqueueSnackbar(result.message, {
              variant: Success,
            });
            navigate("/", { replace: true });
          }
          else {
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

  const btnstyle = { margin: "8px 0" };
  const handleKeypress = e => {
    if (e.keyCode === 13) {
      this.btn.click();
    }
  };

  return (
    <>
      <div style={styles.container}>
        <form onSubmit={handleSubmit}>

          <Container sx={{ height: "100%" }}>
            <Grid container justifyContent="center">
              <Paper
                sx={{
                  width: "280px",
                  background: "#f6f6f6",
                  padding: 4,
                  justifyContent: "center",
                  border: "2px ",
                  borderRadius: "0px",
                }}
              >
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
                      Forgot Password
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center">
                      Enter your email address to retrieve password reset
                      information
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-Username-input"
                      label="Email address"
                      type="email"
                      name="Email address"
                      data-testid="uname"
                      inputRef={emailRef}
                      error={isEmailValid === false}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      helperText={
                        isEmailNUll ? MsgEmailNull : (isEmailValid === false ? MsgEmailFormatError : "")
                    }
                      onKeyPress={handleKeypress}
                    />
                  </Grid>

                  <Grid item align="left">
                    <Typography>
                      <Link style={styles.link} to="/">
                        <span>
                          <ArrowBackIcon />
                        </span>
                        <span style={styles.backbtn}>Back</span>
                      </Link>
                    </Typography>
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
                    Request Reset Link
                    {isLoading === true && <CircularProgress style={styles.circularprogress} />}
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Container>

        </form>
      </div>
    </>
  );
}

export default ForgotPassword;