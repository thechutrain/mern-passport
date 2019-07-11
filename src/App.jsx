import React, { Component } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/Login/LoginForm";
// import SignupForm from "./components/SignupForm";
import Header from "./components/Header";
import Home from "./components/Home";

const DisplayLinks = ({ loggedIn, _logout }) => (
  <nav className="navbar">
    <ul className="nav">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li>
        {loggedIn ? (
          <Link to="#" className="nav-link" onClick={_logout}>
            Logout
          </Link>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              login
            </Link>
          </li>
        )}
      </li>
    </ul>
  </nav>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null,
    };
    this._logout = this._logout.bind(this);
  }
  componentDidMount() {
    axios.get("/auth/user").then(response => {
      // console.log(response.data);
      if (!!response.data.user) {
        // console.log("THERE IS A USER");
        this.setState({
          loggedIn: true,
          user: response.data.user,
        });
      } else {
        this.setState({
          loggedIn: false,
          user: null,
        });
      }
    });
  }

  _logout(event) {
    event.preventDefault();
    // console.log("logging out");
    axios.post("/auth/logout").then(response => {
      // console.log(response.data);
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null,
        });
      }
    });
  }

  // _login(username, password) {
  //   axios
  //     .post("/auth/login", {
  //       username,
  //       password,
  //     })
  //     .then(response => {
  //       console.log(response);
  //       if (response.status === 200) {
  //         // update the state
  //         this.setState({
  //           loggedIn: true,
  //           user: response.data.user,
  //         });
  //       }
  //     });
  // }

  render() {
    const { user, loggedIn } = this.state;
    return (
      <div className="App">
        <h1>This is the main App component</h1>
        <Header user={user} />
        <DisplayLinks _logout={this._logout} loggedIn={loggedIn} />
        <Route exact path="/" render={() => <Home user={user} />} />
        <Route exact path="/login" render={() => <LoginForm />} />
        {/* <Route exact path="/signup" component={SignupForm} /> */}
      </div>
    );
  }
}

export default App;
