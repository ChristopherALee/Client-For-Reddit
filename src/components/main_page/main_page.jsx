import React from "react";
import { Route, Switch } from "react-router-dom";
import "./main_page.css";
import TopicsContainer from "../topics/topics_container";
import SubRedditListContainer from "../sub_reddits/sub_reddit_list_container";
import SubRedditContainer from "../sub_reddits/sub_reddit/sub_reddit_container";
import TopicSearch from "../topic_search/topic_search";

const TOPICS = [
  "Architecture",
  "Art",
  "Business",
  "Education",
  "Entertainment",
  "Gaming",
  "General",
  "Hobbies and Interests",
  "Law",
  "Lifestyle",
  "Locations",
  "Meta",
  "Music",
  "News and Politics",
  "Science",
  "Social Science and Humanities",
  "Sports",
  "Technology",
  "Travel",
  "Other"
];

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.homePage = this.homePage.bind(this);
    this.loading = this.loading.bind(this);
  }

  componentDidMount() {
    this.props.fetchRedditAccessToken().then(success => {
      let counter = 0;
      this.props.fetchSubRedditAbout(
        this.props.accessToken,
        this.props.currentSubReddit
      );
      for (let i = 0; i < TOPICS.length; i++) {
        let isLoading = true;
        if (counter === TOPICS.length - 2) {
          isLoading = false;
        }

        this.props
          .fetchSubReddits(this.props.accessToken, TOPICS[i])
          .then(success => {
            for (let j = 0; j < success.length; j++) {
              this.props.fetchSubRedditPosts(
                this.props.accessToken,
                success[j].name,
                isLoading
              );
            }
          });

        counter += 1;
      }
    });
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
        <div className="reddit-header">
          <div className="reddit-header-left" onClick={this.homePage}>
            <div className="logo" />
            <p className="reddit-header-title">A Client for Reddit</p>
          </div>
          <div className="reddit-header-right">
            <TopicSearch topics={this.props.topics} />
          </div>
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
