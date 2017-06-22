import React, { Component } from 'react';
import Square from './Square';

const colors = [
  'rgb(244,67,54)',
  'rgb(63,81,181)',
  'rgb(0,230,118)',
  'rgb(255,255,0)',
  'rgb(121,85,72)',
  'rgb(144,164,174)',
  'rgb(213,0,249)',
  'rgb(46,125,50)',
  'rgb(255,109,0)',
  'rgb(24,255,255)',
];

class Board extends Component {
  state = {
    size: this.props.settings.size,
    colors: this.props.settings.colors,
  }

  renderSquare(x, y) {
    const color = colors[Math.floor(Math.random() * this.state.colors)];
    const key = `square_x${x}_y${y}`;
    return (
      <Square
        key={key}
        id={key}
        color={color}
        x={x}
        y={y}
        handleClick={() => this.props.floodIt(x, y)}
      />
    );
  }

  renderRow(x) {
    const rows = [];
    for (let y = 1; y <= this.state.size; y++) {
      rows.push(this.renderSquare(x, y));
    }
    return (
      <div className="board-row">
        {rows}
      </div>
    );
  }

  renderColumns() {
    const columns = [];
    for (let x = 1; x <= this.state.size; x++) {
      columns.push(
        <div key={`column_${x}`}>
          {this.renderRow(x)}
        </div>
      );
    }
    return columns;
  }

  render() {
    const columns = this.renderColumns();

    return (
      <div className="board">
        {columns}
      </div>
    );
  }
}


export default Board;