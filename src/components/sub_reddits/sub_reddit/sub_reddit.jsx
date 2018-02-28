import React from "react";
import { Link } from "react-router-dom";

class SubReddit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="sub-reddit-view">
        <div>subreddit</div>
        <div>subreddit details</div>
      </div>
    );
  }
}

export default SubReddit;
