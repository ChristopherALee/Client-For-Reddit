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
    this.props.fetchRedditAccessToken().then(success => {
      for (let i = 0; i < TOPICS.length; i++) {
        this.props.fetchSubReddits(this.props.accessToken, TOPICS[i]);
      }
    });
  }

  redditTopics() {
    return TOPICS.map((topic, idx) => {
      return (
        <Link to={`/topics/${topic}`} key={idx}>
          <p className="topic">{topic}</p>
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
