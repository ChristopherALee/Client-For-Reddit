import React from "react";
import { Route, Switch } from "react-router-dom";
import "./main_page.css";
import TopicsContainer from "../topics/topics_container";
import SubRedditsContainer from "../sub_reddits/sub_reddits_container";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.homePage = this.homePage.bind(this);
  }

  componentDidMount() {
    this.props.fetchRedditAccessToken().then(data => {
      if (this.props.location.pathname.includes("topics")) {
        let currentTopic = this.props.location.pathname.slice(8).toLowerCase();
        this.props.fetchSubReddits(this.props.accessToken, currentTopic);
      }
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      if (newProps.location.pathname.includes("topics")) {
        let currentTopic = newProps.location.pathname.slice(8).toLowerCase();
        this.props.fetchSubReddits(this.props.accessToken, currentTopic);
      }
    }
  }

  homePage() {
    this.props.history.push("/");
  }

  render() {
    return (
      <main id="main-page">
        <div className="reddit-header" onClick={this.homePage}>
          <div className="logo" />
          <p className="reddit-header-title">A Client for Reddit</p>
        </div>

        <Switch>
          <Route path="/topics/" component={SubRedditsContainer} />
          <Route exact path="/" component={TopicsContainer} />
        </Switch>
      </main>
    );
  }
}

export default MainPage;
