import React, { Component } from "react";
import LaunchItem from "./LaunchItem";

class LaunchesList extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      this.props.onLoadMore();
    }
  };

  render() {
    if (!this.props.launches && this.props.loading) return <p>Loading....</p>;
    const launches = this.props.launches || [];
    return (
      <ul>
        {launches.map(launch => (
          <div key={launch.id}>
            <LaunchItem launch={launch} />
          </div>
        ))}
        {this.props.loading && <h2>Loading...</h2>}
      </ul>
    );
  }
}

export default LaunchesList;
