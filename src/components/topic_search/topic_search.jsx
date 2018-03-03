import React from "react";
import { Link } from "react-router-dom";
import "./topic_search.css";

class TopicSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSearch: "",
      searchedTopic: "",
      topicSearch: true,
      subRedditSearch: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  resetSearch() {
    this.setState({
      ["currentSearch"]: "",
      ["searchedTopic"]: "",
      ["topicSearch"]: true,
      ["subRedditSearch"]: false
    });
  }

  autoComplete(topic) {
    return e => {
      e.preventDefault();
      this.setState({
        ["currentSearch"]: `${topic}: `,
        ["searchedTopic"]: topic,
        ["topicSearch"]: false,
        ["subRedditSearch"]: true
      });
    };
  }

  renderTopicResults() {
    if (this.state.currentSearch === "" && !this.state.topicSearch) {
      return null;
    } else if (this.state.currentSearch !== "" && this.state.topicSearch) {
      let topics = Object.keys(this.props.topics);
      let searchedTopics = topics.filter(topic => {
        return (
          this.state.currentSearch !== "" &&
          topic.toLowerCase().includes(this.state.currentSearch.toLowerCase())
        );
      });

      searchedTopics = searchedTopics.map((topic, idx) => {
        return (
          <li key={idx} onClick={this.autoComplete(topic)}>
            {topic}
          </li>
        );
      });

      return <ul className="topic-search-results">{searchedTopics}</ul>;
    } else {
      return null;
    }
  }

  renderSubRedditResults() {
    const subRedditSearchParams = this.state.currentSearch.slice(
      this.state.currentSearch.length - 1
    );

    if (
      !this.state.topicSearch &&
      this.state.subRedditSearch &&
      subRedditSearchParams !== " " &&
      this.state.searchedTopic !== ""
    ) {
      let subReddits = this.props.topics[this.state.searchedTopic];

      let searchedSubReddits = subReddits.filter(subReddit => {
        return subReddit.toLowerCase().includes(subRedditSearchParams);
      });

      searchedSubReddits = searchedSubReddits.map((subReddit, idx) => {
        return (
          <li key={idx} onClick={this.resetSearch}>
            <Link to={`/r/${subReddit}`}>/r/{subReddit}</Link>
          </li>
        );
      });

      return <ul className="subreddit-search-results">{searchedSubReddits}</ul>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div id="topic-search">
        <input
          className="topic-search-bar"
          value={this.state.currentSearch}
          placeholder="Search subreddits by topic..."
          onChange={this.handleChange("currentSearch")}
        />

        {this.renderTopicResults()}
        {this.renderSubRedditResults()}
      </div>
    );
  }
}

export default TopicSearch;
