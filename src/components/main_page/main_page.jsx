import React from "react";
import { Route, Switch } from "react-router-dom";
import "./main_page.css";
import TopicsContainer from "../topics/topics_container";
import SubRedditListContainer from "../sub_reddits/sub_reddit_list_container";
import SubRedditContainer from "../sub_reddits/sub_reddit/sub_reddit_container";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.homePage = this.homePage.bind(this);
    this.loading = this.loading.bind(this);
  }

  homePage() {
    this.props.history.push("/");
  }

  loading() {
    if (this.props.loadingShown) {
      return (
        <div id="loading">
          <p>Loading...</p>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <main id="main-page">
        <div className="reddit-header" onClick={this.homePage}>
          <div className="logo" />
          <p className="reddit-header-title">A Client for Reddit</p>
        </div>

        {this.loading()}

        <Switch>
          <Route path="/topics/" component={SubRedditListContainer} />
          <Route path="/r/" component={SubRedditContainer} />
          <Route exact path="/" component={TopicsContainer} />
        </Switch>
      </main>
    );
  }
}

export default MainPage;
