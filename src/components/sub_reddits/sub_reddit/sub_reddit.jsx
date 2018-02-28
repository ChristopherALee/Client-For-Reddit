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
      let description;
      if (!this.props.subRedditDetails.about.data.public_description) {
        description = "No description";
      } else {
        description = this.props.subRedditDetails.about.data.public_description;
      }

      let latestPost = this.props.subRedditDetails.posts[
        this.props.subRedditDetails.posts.length - 1
      ];
      let latestActiveDate = new Date(latestPost.data.created * 1000);

      return (
        <div id="subreddit-view">
          <div className="subreddit-item">
            <p className="subreddit-name">
              {this.props.subRedditDetails.about.data.url.slice(
                0,
                this.props.subRedditDetails.about.data.url.length - 1
              )}: {this.props.subRedditDetails.about.data.display_name}
            </p>
            <p className="subreddit-description">{description}</p>
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
              Last Active Date: {latestActiveDate.toString().slice(0, 15)}
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
