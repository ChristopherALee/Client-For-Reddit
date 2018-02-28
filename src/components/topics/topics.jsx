import React from "react";
import { Link } from "react-router-dom";
import "./topics.css";

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

class Topics extends React.Component {
  constructor(props) {
    super(props);

    this.redditTopics = this.redditTopics.bind(this);
  }

  componentDidMount() {
    let that = this;
    this.props.fetchRedditAccessToken().then(success => {
      for (let i = 0; i < TOPICS.length; i++) {
        this.props
          .fetchSubReddits(this.props.accessToken, TOPICS[i])
          .then(success => {
            for (let j = 0; j < success.length; j++) {
              that.props.fetchSubRedditPosts(
                this.props.accessToken,
                success[j].name
              );
            }
          });
      }
    });
  }

  redditTopics() {
    let topicsPoints = this.props.topicsPoints;
    let topics = Object.values(topicsPoints).reverse();
    let points = Object.keys(topicsPoints).reverse();

    return topics.map((topic, idx) => {
      return (
        <Link to={`/topics/${topic}`} key={idx}>
          <div className="topic">
            <p className="topic-name">{topic}</p>
            <p className="topic-points">Points: {points[idx]}</p>
          </div>
        </Link>
      );
    });
  }

  render() {
    return (
      <div id="topics-container">
        <div className="topics-header">
          <p>Top Topics</p>
        </div>
        <div className="reddit-topics">{this.redditTopics()}</div>
      </div>
    );
  }
}

export default Topics;
