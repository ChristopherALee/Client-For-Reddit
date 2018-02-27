import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import "./reset.css";
import { Route } from "react-router-dom";
import MainPageContainer from "./components/main_page/main_page_container";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}

        <Route path="/" component={MainPageContainer} />
      </div>
    );
  }
}

export default App;
