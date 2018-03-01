import React from "react";
import { Link } from "react-router-dom";
import "./sub_reddit_list.css";

class SubRedditList extends React.Component {
  constructor(props) {
    super(props);

    this.subReddits = this.subReddits.bind(this);
    this.numbersWithCommas = this.numbersWithCommas.bind(this);
  }

  componentDidMount() {
    let that = this;

    this.props
      .fetchSubReddits(this.props.accessToken, this.props.topic)
      .then(success => {
        for (let i = 0; i < success.length; i++) {
          this.props
            .fetchSubRedditPosts(this.props.accessToken, success[i].name)
            .then(success => {
              this.props.fetchSubRedditAbout(
                this.props.accessToken,
                success.data.children[0].data.subreddit
              );
            });
        }
      });

    // this.props.fetchRedditAccessToken().then(success => {
    //   this.props
    //     .fetchSubReddits(this.props.accessToken, this.props.topic)
    //     .then(success => {
    //       for (let i = 0; i < success.length; i++) {
    //         that.props
    //           .fetchSubRedditPosts(this.props.accessToken, success[i].name)
    //           .then(success => {
    //             this.props.fetchSubRedditAbout(
    //               this.props.accessToken,
    //               success.data.children[0].data.subreddit
    //             );
    //           });
    //       }
    //     });
    // });
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.accessToken && newProps.accessToken) {
      newProps
        .fetchSubReddits(newProps.accessToken, newProps.topic)
        .then(success => {
          for (let i = 0; i < success.length; i++) {
            newProps
              .fetchSubRedditPosts(newProps.accessToken, success[i].name)
              .then(success => {
                newProps.fetchSubRedditAbout(
                  newProps.accessToken,
                  success.data.children[0].data.subreddit
                );
              });
          }
        });
    }
  }

  numbersWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  subReddits() {
    let subRedditDetails;

    if (this.props.relevantSubReddits) {
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
        let description;
        if (!subReddit.about.data.public_description) {
          description = "No description";
        } else {
          description = subReddit.about.data.public_description;
        }

        return (
          <Link
            to={`/r/${subReddit.about.data.display_name}`}
            key={subReddit.about.data.id}
          >
            <div className="subreddit-item">
              <p className="subreddit-name">
                {subReddit.about.data.url.slice(
                  0,
                  subReddit.about.data.url.length - 1
                )}: {subReddit.about.data.display_name}
              </p>
              <p className="subreddit-description">{description}</p>
              <p className="subreddit-mini-stats">
                <strong>{this.numbersWithCommas(subReddit.points)}</strong>{" "}
                total points,{" "}
                <strong>
                  {this.numbersWithCommas(subReddit.about.data.subscribers)}
                </strong>{" "}
                subscribers,{" "}
                <strong>
                  {this.numbersWithCommas(subReddit.about.data.accounts_active)}
                </strong>{" "}
                active users
              </p>
            </div>
          </Link>
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

export default SubRedditList;
