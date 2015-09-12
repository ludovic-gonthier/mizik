import React, { Component, PropTypes } from 'react';

export default class Player extends Component {
  componentDidUpdate(prevProps) {
    const { onPlay, onSongChange } = this.props;
    const { playing, playlist, volume } = this.props;
    let { song } = this.props;

    const audio = React.findDOMNode(this.refs.myAudio);

    playing ? audio.play() : audio.pause();

    audio.volume = volume;
    audio.onended = () => onPlay(playlist[song.next]);
    audio.ondurationchange = () => {
      song = Object.assign({}, song, {duration: audio.duration});
      onSongChange(song);
    };
    audio.ontimeupdate = () => {
      song = Object.assign({}, song, {time: audio.currentTime})
      onSongChange(song);
    };
  }

  shouldComponentUpdate(nextProps) {
    const { song } = this.props;

    return (song && nextProps.song && song.next !== nextProps.song.next)
      || this.props.playing !== nextProps.playing
      || this.props.volume !== nextProps.volume;
  }

  render() {
    const { song } = this.props;

    return (
      <div id="player">
        <audio src={song && song.src} autoPlay ref="myAudio" />
      </div>
    );
  }
}

Player.propTypes = {
  onPlay: PropTypes.func.isRequired,
  song: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  playing: PropTypes.bool.isRequired,
  volume: PropTypes.number,
};
