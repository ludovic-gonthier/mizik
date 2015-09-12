import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as player from 'actions/player';
import Controls from 'components/Controls';
import Volume from 'components/Volume';
import Timeline from 'components/Timeline';
import Player from 'components/Player';
import PlayList from 'components/PlayList';

class Application extends Component {
  render() {
    const { dispatch } = this.props;
    const { playlist, song, playing, volume } = this.props;

    const onPause = () => dispatch(player.pause());
    const onSongChange = (value) => dispatch(player.songChange(value));
    const onPlay = (value) => dispatch(player.play(value));
    const onStop = () => dispatch(player.stop());
    const onVolumeChange = (value) => dispatch(player.volumeChange(value));

    return (
      <div>
        <header>
          <h1>Player de Mizik</h1>
        </header>
        <PlayList {...{ onPlay, playlist }} />
        <Player {...{
          // Actions
          onPlay, onSongChange,
          // Properties
          song, playing, playlist, volume,
        }} />
        <Controls {...{
          // Actions
           onPause, onPlay, onStop,
          // Properties
          playlist, song, playing,
        }} />
        <Volume {...{ onVolumeChange, volume }} />
        <Timeline {...{ song }}/>
      </div>
    );
  }
}

function select(state) {
  return state.player;
}

export default connect(select)(Application);


Application.propTypes = {
  dispatch: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    })
  ),
  playing: PropTypes.bool.isRequired,
  volume: React.PropTypes.number,
};
