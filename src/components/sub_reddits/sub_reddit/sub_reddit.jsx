import React from "react";
import { Link } from "react-router-dom";

class SubReddit extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchRedditAccessToken().then(success => {
      this.props
        .fetchSubRedditPosts(
          this.props.accessToken,
          this.props.currentSubReddit
        )
        .then(success => {
          this.props.fetchSubRedditAbout(
            this.props.accessToken,
            this.props.currentSubReddit
          );
        });
    });
  }

  render() {
    return (
      <div id="sub-reddit-view">
        <div>subreddit</div>
        <div>subreddit details</div>
        <div className="subreddit-preview">subreddit preview</div>
      </div>
    );
  }
}

export default SubReddit;
