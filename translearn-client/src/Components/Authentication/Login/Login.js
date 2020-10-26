import React, { useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../../config/firebase";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: "black",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function SignIn(props) {
  const { classes } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => e.preventDefault() && false}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="off"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={loginWithEmail}
            className={classes.submit}
          >
            Sign in
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
            className={classes.submit}
          >
            Register a New Account
          </Button>
        </form>
      </Paper>
    </main>
  );

  async function loginWithEmail() {
    if (email === "" || password === "") {
      return;
    }
    try {
      await firebase.loginWithEmail(email, password);
      props.history.replace("/dashboard");
    } catch (error) {
      // alert(error.message);
      let err = error.message;
      if (
        err === "The password is invalid or the user does not have a password."
      ) {
        alert("Incorrect Password!");
      } else if (err === "The email address is badly formatted.") {
        alert("Incorrect Email!");
      } else if (
        err ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        alert("User not found! Please register!");
      } else {
        alert(err);
      }
    }
  }
}

export default withRouter(withStyles(styles)(SignIn));

// import React, { Fragment } from "react";
// import { Grid, Typography } from "@material-ui/core";
// import "./Login.css";

// function Login() {
//   return (
//     <div className="login-bg">
//       <Grid
//         container
//         justify="center"
//         alignItems="center"
//         className="loginContainer"
//       >
//         <Grid
//           item
//           container
//           lg={6}
//           md={6}
//           sm={8}
//           xs={10}
//           className="loginfields"
//           justify="center"
//         >
//           <Typography variant="h4">Login</Typography>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default Login;
