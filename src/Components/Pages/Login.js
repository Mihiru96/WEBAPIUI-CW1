import React, { useState, useRef, useEffect, useContext } from "react";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import LoginDto from "../Dtos/LoginDto";
import TextField from "../UI/TextField";
import { Error, MsgError, PasswordFormat, MsgPasswordNullError, MsgUserNameError } from "../../Common/Constant";
import LogoImg from "../../Assets/Images/logo-colored.png";
import loginImg from "../../Assets/Images/Bgimage.jpeg";
import { CircularProgress } from '@mui/material';
import { login } from '../../Apis/User.api'
import AuthContext from "../../Store/AuthManager";
import JwtDecoder from "../Utils/JwtDecoder";

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
    textAlign: "center"
  },

  gridItemTypography: {
    paddingTop: "5px",
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
};

function Login() {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [isUserNameValid, setIsUserNameValid] = useState(null);
  const [isUserNameNull, setIsUserNameNull] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [isPasswordNull, setIsPasswordNull] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      userNameRef.current.focus();
    }, 500);

    return () => {
      clearTimeout(focusTimer);
    };
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let isUnValid = false;
    let isPwValid = false;

    let username = userNameRef.current.value;
    let password = passwordRef.current.value;

    if (!username) {
      setIsUserNameValid(false);
    } else {
      setIsUserNameValid(true);
      isUnValid = true;
    }

    if (!password && !PasswordFormat.test(password)) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
      isPwValid = true;
    }

    if (isUnValid && isPwValid) {
      setIsLoading(true);
      let user = new LoginDto(username, password);
      login(user)
        .then((result) => {
          setIsLoading(false);
          resetFields();
          if (result.status === 200) {

            let json = JwtDecoder(result.token)
            console.log(json)
            authCtx.login(result.token, json.exp, json.username);

            if(json.role === "Backoffice Staff"){
                navigate("/flights", { replace: true });
            }

            // navigate("/Home", { replace: true });
          } else {
            enqueueSnackbar(result.message, {
              variant: Error,
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          resetFields();
          enqueueSnackbar(MsgError, {
            variant: Error,
          });
        });
    }
  };

  const resetFields = () => {
    // setUserName("");
    // setPassword("");
    // userNameRef.current.focus();
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
        <form onSubmit={formSubmitHandler}>
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
                      Sign In
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Username"
                      name="username"
                      inputRef={userNameRef}
                      error={isUserNameValid === false}
                      helperText={
                        isUserNameValid === false ? MsgUserNameError : ""
                      }
                    // value={user}
                    // onChange={(e) => setUserName(e.target.value)}
                    />
                  </Grid>
                  <Grid item sx={{ marginBottom: "15px" }}>
                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      inputRef={passwordRef}
                      error={isPasswordValid === false}
                      helperText={
                        isPasswordValid === false ? MsgPasswordNullError : ""
                      }
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeypress}
                    />
                  </Grid>
                  <Grid item style={styles.gridItemTypography}>
                    <Typography>
                      <Link style={styles.link} to="/forgotPassword">
                        Forgot password?
                      </Link>
                    </Typography>
                  </Grid>
                  {/* <Grid item style={styles.gridItemTypography}>
                  <Typography>
                    Don't have an account?
                    <Link style={styles.link} to="/signUp">
                      &nbsp; Sign up
                    </Link>
                  </Typography>
                </Grid> */}
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
                    style={isLoading === true ? styles.buttondisabled : styles.button}
                    fullWidth
                    //={formSubmitHandler}
                    disabled={isLoading}
                    type="submit"
                    name="btn"

                  >
                    Sign In
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

export default Login;
