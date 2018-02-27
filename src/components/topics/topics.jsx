import React from "react";
import { Link } from "react-router-dom";
import "./topics.css";

class Topics extends React.Component {
  constructor(props) {
    super(props);

    this.redditTopics = this.redditTopics.bind(this);
  }

  redditTopics() {
    const topics = [
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

    return topics.map((topic, idx) => {
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
