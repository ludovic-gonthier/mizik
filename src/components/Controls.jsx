import React, { Component, PropTypes } from 'react';

export default class Controls extends Component {
  render() {
    // Actions
    const { onPause, onPlay, onStop } = this.props;
    // Properties
    const { playing, playlist, song } = this.props;

    return (
      <div id="controls">
        <button onClick={song && () => onPlay(playlist[song.prev])} disabled={!song}>Previous</button>
        { playing ?
          <button onClick={onPause}>Pause</button>
          :
          <button onClick={() => onPlay(song || playlist[0])}>Play</button>
        }
        <button onClick={onStop} disabled={!song}>Stop</button>
        <button onClick={song && () => onPlay(playlist[song.next])} disabled={!song}>Next</button>
      </div>
    );
  }
}

Controls.propTypes = {
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  song: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  playlist: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    })
  )
};
