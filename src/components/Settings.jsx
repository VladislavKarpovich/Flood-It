import React, { Component } from 'react';
import Slider from 'material-ui/Slider';
import FlatButton from 'material-ui/FlatButton';

class Settings extends Component {
    state = {
        colors: 3,
        size: 6,
        steps: 6,
    }

    calcClicksAmount = () => {
        const steps = Math.ceil(this.state.colors * this.state.size / 3);
        this.setState({ steps });
    }

    handleFirstSlider = (event, value) => {
        this.setState({ colors: value }, this.calcClicksAmount);
    };

    handleSecondSlider = (event, value) => {
        this.setState({ size: value }, this.calcClicksAmount);
    };

    handleStartGame = (event) => {
        this.props.handleStartGame(event, this.state);
    }

    render() {
        return (
            <div className="settings">
                <p>Colors: <span>{this.state.colors}</span></p>
                <Slider
                    min={3}
                    max={10}
                    step={1}
                    value={this.state.colors}
                    onChange={this.handleFirstSlider}
                />

                <p>Size: <span>{this.state.size}X{this.state.size}</span></p>
                <Slider
                    min={6}
                    max={26}
                    step={2}
                    value={this.state.size}
                    onChange={this.handleSecondSlider}
                />

                <h3>Max steps amount: {this.state.steps}</h3>

                <FlatButton
                    label="Start"
                    onTouchTap={this.handleStartGame}
                    fullWidth={true}
                />
            </div>
        );
    }
}

export default Settings;
