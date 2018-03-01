import React from "react";
import { Link } from "react-router-dom";
import "./sub_reddit.css";

class SubReddit extends React.Component {
  constructor(props) {
    super(props);

    this.numbersWithCommas = this.numbersWithCommas.bind(this);
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

  numbersWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    if (this.props.subRedditDetails) {
      return (
        <div id="subreddit-view">
          <div className="subreddit-item">
            <p className="subreddit-name">
              {this.props.subRedditDetails.about.data.url.slice(
                0,
                this.props.subRedditDetails.about.data.url.length - 1
              )}: {this.props.subRedditDetails.about.data.display_name}
            </p>
            <p className="subreddit-description">{this.props.description}</p>
            <p className="subreddit-mini-stats">
              <strong>
                {this.numbersWithCommas(this.props.subRedditDetails.points)}
              </strong>{" "}
              total points,{" "}
              <strong>
                {this.numbersWithCommas(
                  this.props.subRedditDetails.about.data.subscribers
                )}
              </strong>{" "}
              subscribers,{" "}
              <strong>
                {this.numbersWithCommas(
                  this.props.subRedditDetails.about.data.accounts_active
                )}
              </strong>{" "}
              active users
            </p>
            <p className="last-active-stats">
              Last Active Date:{" "}
              {this.props.latestActiveDate.toString().slice(0, 15)}
            </p>
          </div>

          <div>subreddit</div>
          <div>subreddit details</div>
          <div className="subreddit-preview">subreddit preview</div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SubReddit;
