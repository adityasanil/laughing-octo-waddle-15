import React, { Fragment } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "assets/css/loginstyles.css";

import { login } from "services/auth";
import Logo from "assets/images/brand/15cacb.png";
import { connect } from "services/apiDbCall";
import Form from "components/form/form";
import InputField from "components/form/inputField";
import Particles from "components/loginAnimation";

const useStyles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    color: "#009933",
    backgroundColor: "#fff"
  },
  form: {
    width: "100%",
    justify: "flex-end",
    height: "100%"
  },
  submit: {
    backgroundColor: "#009933",
    color: "white"
  }
};

class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
    }
  };

  onSubmit = async () => {
    try {
      const { data } = this.state;
      const result = await login(data.email, data.password);
      const { orgDatabase } = jwtDecode(result.data);
      const connectData = await connect(orgDatabase);
      if (result.status === 200 && connectData.status === 200) {
        window.location = "/dashboard/";
      }
    } catch (error) {
      return null;
    }
  };

  render() {
    return (
      <Fragment>
        <Grid container direction="row">
          <Grid item xs={12} md={3} lg={3} container>
            <div style={{ padding: 25 }}>
              <img className="login-brand-styles" src={Logo} alt={"Logo"} />
              <Typography className="login-header" component="h1" variant="h5">
                Log in to your account
              </Typography>
              <form className={useStyles.form} onSubmit={this.handleSubmit}>
                <InputField
                  required
                  id="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  autoFocus={true}
                  onChange={this.handleOnChange}
                  type="email"
                  size="small"
                />
                <br />
                <InputField
                  required
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleOnChange}
                  size="small"
                />
                <Grid container direction="row" spacing={1}>
                  <Grid item md={6} lg={6} xs={6}>
                    <Button
                      className="login-button-style"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Log In
                    </Button>
                  </Grid>
                  <Grid item style={{ marginTop: 10 }}>
                    <Link className="forgot-link-style" to={"/forgotpassword"}>
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            lg={9}
            className="login-background"
            direction="column"
          >
            <Particles />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default Login;