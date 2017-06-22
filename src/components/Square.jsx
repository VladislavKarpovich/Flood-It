import React, { Component } from 'react';

class Square extends Component {
  render() {
    const style = {background: this.props.color};
    return (
      <button id={this.props.id}
        className="square"
        onClick={this.props.handleClick}
        style={style}>
      </button>
    );
  }
}

export default Square;