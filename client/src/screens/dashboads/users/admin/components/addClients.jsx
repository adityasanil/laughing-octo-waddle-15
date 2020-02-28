import React, { Fragment } from "react";
import { Typography, Box, withStyles, Container } from "@material-ui/core";

import UserDataFields from "./dataFields/userDataFields";
import Form from "components/form/form";
import { createUser } from "services/createUserSenior";
import "react-toastify/dist/ReactToastify.css";
import * as Sentry from "@sentry/browser";
import { ToastContainer, toast } from "react-toastify";

const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px"
  },
  content: {
    flexGrow: 1,
    overflow: "auto"
  }
};

class AddUsers extends Form {
  state = {
    data: {
      name: "",
      email: "",
      role: "",
      designation: "",
      panNumber: "",
      contact: ""
    },
    companyName: "",
    registeredBy: ""
  };

  UNSAFE_componentWillMount() {
    const { user } = this.props;
    const companyName = user.companyName;
    const currentUser = user.name;
    this.setState({ companyName, registeredBy: currentUser });
  }

  onSubmit = async () => {
    const data = {
      ...this.state.data,
      companyName: this.state.companyName,
      registeredBy: this.state.registeredBy
    };
    try {
      const { status } = await createUser(data);
      if (status == 200) toast.success("User created");
    } catch (error) {
      toast.error("User creation failed");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <ToastContainer autoClose={1500} closeButton={false} />
        <main className={classes.content}>
          <Container maxWidth="lg">
            <br />
            <div>
              <Typography component="h5" variant="h5">
                Register Users
              </Typography>
            </div>
            <br />
            <div>
              <UserDataFields
                onSubmit={this.handleSubmit}
                onChange={this.handleOnChange}
              />
            </div>
            <br />
          </Container>
        </main>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AddUsers);
