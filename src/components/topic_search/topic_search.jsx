import React from "react";
import { Link } from "react-router-dom";
import "./topic_search.css";

class TopicSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSearch: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  renderTopicResults() {
    if (this.state.currentSearch === "") {
      return null;
    } else {
      let topics = this.props.topics;
      let searchedTopics = topics.filter(topic => {
        return (
          this.state.currentSearch !== "" &&
          topic.toLowerCase().includes(this.state.currentSearch.toLowerCase())
        );
      });

      searchedTopics = searchedTopics.map((topic, idx) => {
        return (
          <li key={idx}>
            <p>{topic}</p>
          </li>
        );
      });

      return <ul className="topic-search-results">{searchedTopics}</ul>;
    }
  }

  render() {
    return (
      <div id="topic-search">
        <input
          className="topic-search-bar"
          value={this.state.currentSearch}
          placeholder="Search topic..."
          onChange={this.handleChange("currentSearch")}
        />

        {this.renderTopicResults()}
      </div>
    );
  }
}

export default TopicSearch;
