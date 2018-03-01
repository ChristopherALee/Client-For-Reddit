import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "./topics.css";

class Topics extends React.Component {
  constructor(props) {
    super(props);

    this.redditTopics = this.redditTopics.bind(this);
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
