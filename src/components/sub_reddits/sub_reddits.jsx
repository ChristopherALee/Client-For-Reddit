import React from "react";
import { Link } from "react-router-dom";
import "./sub_reddits.css";

class SubReddits extends React.Component {
  constructor(props) {
    super(props);

    this.subReddits = this.subReddits.bind(this);
  }

  componentDidMount() {
    let that = this;

    this.props.fetchRedditAccessToken().then(success => {
      this.props
        .fetchSubReddits(this.props.accessToken, this.props.topic)
        .then(success => {
          for (let i = 0; i < success.length; i++) {
            that.props
              .fetchSubRedditPosts(this.props.accessToken, success[i].name)
              .then(success => {
                this.props.fetchSubRedditAbout(
                  this.props.accessToken,
                  success.data.children[0].data.subreddit
                );
              });
          }
        });
    });
  }

  subReddits() {
    let subReddits;
    let subRedditDetails;
    if (this.props.subReddits && this.props.relevantSubReddits) {
      subReddits = this.props.subReddits;
      subRedditDetails = this.props.relevantSubReddits;

      if (subRedditDetails.length) {
        subRedditDetails = subRedditDetails.sort((a, b) => {
          let subReddit1 = a.points;
          let subReddit2 = b.points;

          if (subReddit1 < subReddit2) {
            return 1;
          } else if (subReddit1 > subReddit2) {
            return -1;
          } else {
            return 0;
          }
        });
      }

      let subRedditItems = subRedditDetails.map(subReddit => {
        return (
          <div className="subreddit-item" key={subReddit.about.data.id}>
            <p className="subreddit-name">{subReddit.about.data.url}</p>
            <p className="subreddit-description">
              {subReddit.about.data.public_description}
            </p>
            <p className="subreddit-mini-stats">
              Total Points: {subReddit.points},{" "}
              {subReddit.about.data.subscribers} subscribers,{" "}
              {subReddit.about.data.accounts_active} active users
            </p>
          </div>
        );
      });

      return subRedditItems;
    }
  }

  render() {
    return (
      <section id="subreddit-container">
        <Link to="/">
          <p className="see-all-topics-link">See All Topics</p>
        </Link>

        <div className="subreddit-list-header">
          <p>Top SubReddits of {this.props.topic}</p>
        </div>

        <div className="subreddit-list">{this.subReddits()}</div>
      </section>
    );
  }
}

export default SubReddits;
