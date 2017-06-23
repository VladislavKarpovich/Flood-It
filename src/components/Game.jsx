import React, { Component } from 'react';
import Board from './Board';
import Counter from './Counter';
import Alert from './Alert';

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

  floodIt = (oX, oY) => {
    if (!this.checkStep())
      return this.showAlert('You lose!', 'loser.png');

    const oldColor = this.getElementColor(1, 1);
    const newColor = this.getElementColor(oX, oY);
    // if (newColor === oldColor)
    // return;

    this.refs.counter.inc();
    const stack = [{ x: 1, y: 1 }];
    const visited = [];

    while (stack.length) {
      const sq = stack.pop();
      visited.push(sq);
      this.setElementColor(sq.x, sq.y, newColor);
      directions.forEach(dir => {
        const x = sq.x + dir.x;
        const y = sq.y + dir.y;
        if (!this.floodElement(x, y, oldColor, newColor))
          return;
        if (!visited.find(obj => obj.x === x && obj.y === y))
          stack.push({ x, y });
      });
    }

    if (this.checkResult())
      return this.showAlert('You win!', 'winner.png');

    if (!this.checkStep())
      return this.showAlert('You lose!', 'loser.png');
  }

  showAlert(text, img) {
    setTimeout(() => {
      this.refs.msg.handleOpen(text, img);
    }, 0);
  }

  checkStep() {
    const steps = this.state.steps;
    const curStep = this.refs.counter.state.counter + 1;
    return curStep <= steps;
  }

  checkResult() {
    const color = this.getElementColor(1, 1);
    for (let i = 1; i <= this.state.size; i++) {
      for (let j = 1; j <= this.state.size; j++) {
        const cur = this.getElementColor(i, j);
        if (cur !== color) return false;
      }
    }
    return this.checkStep();
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
        <Counter ref='counter' steps={this.state.steps} counterHandle={this.counterHandle} />
        <Alert ref='msg' />
      </div>
    );
  }
}


export default Game;
