import React, { Component } from 'react';
import Board from './Board';
import Counter from './Counter';

const directions = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];

class Game extends Component {
  state = {
    size: this.props.settings.size,
    steps: this.props.settings.steps,
  }

  floodIt = (currentX, currentY) => {
    this.refs.counter.inc();
    const visited = [];
    const stack = [{ x: 1, y: 1 }];
    const oldColor = this.getElementColor(1, 1);
    const newColor = this.getElementColor(currentX, currentY);

    while (stack.length) {
      const sq = stack.pop();
      this.setElementColor(sq.x, sq.y, newColor);
      visited.push(sq);
      directions.forEach((dir) => {
        const x = sq.x + dir.x;
        const y = sq.y + dir.y;
        if (!this.floodElement(x, y, oldColor, newColor))
          return;

        if (!visited.find(obj => obj.x === x && obj.y === y))
          stack.push({ x, y });
      });
    }
  }

  setElementColor(x, y, color) {
    const id = `square_x${x}_y${y}`;
    const sq = document.getElementById(id);
    sq.style.background = color;
  }

  getElementColor(x, y) {
    const id = `square_x${x}_y${y}`;
    const sq = document.getElementById(id);
    return sq.style.background;
  }

  checkBorder(x, y) {
    const top = y > 0;
    const bottom = y <= this.state.size;
    const left = x > 0;
    const right = x <= this.state.size;
    return top && bottom && left && right;
  }

  floodElement(x, y, oldColor, newColor) {
    if (!this.checkBorder(x, y)) return false;
    const sqColor = this.getElementColor(x, y);
    return sqColor === oldColor;
  }

  counterHandle = (clicks) => {
    console.log(clicks);
  }

  render() {
    return (
      <div>
        <Board settings={this.props.settings} floodIt={this.floodIt} />
        <Counter ref='counter' steps={this.state.steps} counterHandle={this.counterHandle}/>
      </div>
    );
  }
}


export default Game;
