import React, { Component } from 'react';

class Counter extends Component {
  state = {
    counter: 0,
    steps: this.props.steps
  }

  inc() {
    this.setState({ counter: this.state.counter + 1 });
  }

  restart() {
    this.setState({ counter: 0 });
  }

  render() {
    return (
      <span className="counter">
        {this.state.counter}/{this.state.steps}
      </span>
    );
  }
}

export default Counter;