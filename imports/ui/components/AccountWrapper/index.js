import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

export default class AccountsUIWrapper extends Component {
  signup = event => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    Accounts.createUser({ username, email, password }, error => {
      console.log(error);
    });
  };
  login = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    Meteor.loginWithPassword(email, password, error => {
      console.log(error);
    });
  };
  render() {
    return (
      <div>
        <label>Signup</label>
        <form onSubmit={this.signup}>
          <input name="username" type="text" placeholder="Username"></input>
          <input name="email" type="text" placeholder="Email"></input>
          <input name="password" type="password" placeholder="Password"></input>
          <button type="submit">Signup</button>
        </form>
        <label>Login</label>
        <form onSubmit={this.login}>
          <input name="email" type="text" placeholder="Email"></input>
          <input name="password" type="password" placeholder="Password"></input>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
