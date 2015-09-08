import React, { Component, PropTypes } from 'react';

export default class SongsList extends Component {
  render () {
    const { songs } = this.props;

    return (
      <div>
        <h2>Songs List:</h2>
        <ul>
          {songs.map((song, index) => {
            return <li key={index}>{song.title} <button>Play</button></li>
          })
          }
        </ul>
      </div>
    );
  }
}

SongsList.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    })
  )
};
