import React, { Component } from 'react';

class Couner extends Component {
  state = {
    counter: 0,
    steps: this.props.steps
  }

  inc() {
    this.setState({ counter: this.state.counter + 1 })
  }

  render() {
    return (
      <span className="couner">
        {this.state.counter}/{this.state.steps}
      </span>
    );
  }
}

export default Couner;