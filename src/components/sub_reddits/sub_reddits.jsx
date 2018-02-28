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

    this.props.fetchRedditAccessToken().then(success =>
      this.props
        .fetchSubReddits(this.props.accessToken, this.props.topic)
        .then(success => {
          for (let i = 0; i < success.length; i++) {
            that.props.fetchSubRedditAbout(
              this.props.accessToken,
              success[i].name
            );
          }
        })
    );
  }

  subReddits() {
    let subReddits;
    if (this.props.subReddits) {
      subReddits = this.props.subReddits;

      return subReddits.map((subReddit, idx) => {
        return (
          <div className="subreddit-item" key={idx}>
            <p>{`/r/${subReddit}`}</p>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <section id="subreddit-container">
        <Link to="/">
          <p className="see-all-topics-link">See All Topics</p>
        </Link>

        <div className="subreddit-list-header">
          <p>Top SubReddits</p>
        </div>

        <div className="subreddit-list">{this.subReddits()}</div>
      </section>
    );
  }
}

export default SubReddits;
