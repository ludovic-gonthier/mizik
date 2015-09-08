import React, { Component, PropTypes } from 'react';

export default class Player extends Component {
  render () {
    const {playing, current, songs } = this.props;


    return (
      <div id="player">
        <audio></audio>

        <h2>{playing ? 'Playing' : 'Paused'}</h2>

        <button onClick={this.handleBackward.bind(this)}>◂◂</button>
        {this.renderPlayPauseButton()}
        <button onClick={this.props.onStop}>■</button>
        <button onClick={this.handleForward.bind(this)}>▸▸</button>
      </div>
    );
  }

  renderPlayPauseButton () {
    let button = <button onClick={this.props.onPlay}>►</button>;

    if (this.props.playing) {
      button = <button onClick={this.props.onPause}>▮▮</button>;
    }

    return button;
  }

  handleBackward () {
    return this.props.onBackward(this.props.current);
  }

  handleForward () {
    return this.props.onForward(this.props.current);
  }
}

Player.propTypes = {
  onBackward: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};
