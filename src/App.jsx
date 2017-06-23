import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';

import './App.css';
import Header from './components/Header';
import Settings from './components/Settings';
import Game from './components/Game';

injectTapEventPlugin();

class App extends Component {
    state = {
        playing: false,
        settings: {
            colors: 4,
            size: 22,
            steps: 0,
        }
    }

    startGame = (event, settings) => {
        this.setState({ playing: true, settings });
    }

    exitGame = (event) => {
        this.setState({ playing: false });
    }

    restartGame = (event) => {
        this.refs.game.restartGame();
    }

    render() {
        return (
            <div className="app">
                <Header title="flood it" />
                {this.renderMain()}
            </div>
        );
    }

    renderMain() {
        const isPlaying = this.state.playing;
        const content = isPlaying ? this.renderGameField() : this.renderSettings();
        return (
            <main className="main-container">
                {content}
            </main>
        );
    }

    renderSettings() {
        return (
            <div className="settings">
                <Settings handleStartGame={this.startGame} />
            </div>
        )
    }

    renderGameField() {
        const actions = [
            <FlatButton
                label="Restart"
                primary={true}
                onTouchTap={this.restartGame}
                fullWidth={true}
            />,
            <FlatButton
                label="Exit"
                primary={true}
                onTouchTap={this.exitGame}
                fullWidth={true}
            />
        ];
        return (
            <div className="game-field">
                <Game ref='game' settings={this.state.settings} />
                {actions}
            </div>
        )
    }
}

export default App;