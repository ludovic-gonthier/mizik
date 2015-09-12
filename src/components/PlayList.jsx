import React, { Component, PropTypes } from 'react';

export default class PlayList extends Component {
  render() {
    const { playlist, onPlay } = this.props;

    return (
      <div>
        <h2>Songs List:</h2>
        <ul>
          {playlist.map((song, index) => {
            return (
              <li key={index}>
                {song.title} <button onClick={() => onPlay(song)}>Play</button>
              </li>
            );
          })
          }
        </ul>
      </div>
    );
  }
}

PlayList.propTypes = {
  onPlay: PropTypes.func.isRequired,
  playlist: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ),
};
