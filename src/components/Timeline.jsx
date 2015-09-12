import React, { Component, PropTypes } from 'react';

export default class Timeline extends Component {
  render() {
    const { song } = this.props;
    let { time, duration } = this.props.song || {};

    time = time || 0;
    duration = duration || 1;

    // seconds  103.79  time
    // pixels   500     X

    let advance = time ? (time * 500) / duration : 0;

    const styles = {
      position: {
        height: '10px',
        width: `${advance}px`,
        backgroundColor: '#000',
        display: 'inline-block',
        float: 'left',
      },
      timeline: {
        float: 'left',
        height: '10px',
        width: '500px',
        backgroundColor: 'grey'
      }
    };

    return (
      <div>
        <header>
          <span ref="songTitle"></span>
        </header>
        <span style={{float: 'left'}}>0</span>
        <div style={styles.timeline}>
          <span ref="songPosition" style={styles.position}></span>
          <span style={{width: '500px', margin: 'auto', marginTop: '10px', display: 'inline-block', textAlign: 'center'}}>{this.formatTime(time)}</span>
        </div>
        <span style={{float: 'left'}} ref="songDuration">{this.formatTime(duration)}</span>
      </div>
    );
  }

  formatTime(time) {
    const pad = '00';
    const minutes = String(parseInt(time / 60));
    let seconds = String(parseInt(time % 60));

    seconds = pad.substring(0, pad.length - seconds.length) + seconds;

    return `${minutes}:${seconds}`;
  }

  shouldComponentUpdate(nextProps) {
    const { song } = this.props;

    return !!song && !!nextProps.song
      && (song.time !== nextProps.song.time
        || song.duration !== nextProps.song.duration)
  }
}

Timeline.propTypes = {
  song: PropTypes.shape({
    time: PropTypes.number,
    duration: PropTypes.number,
  }),
};
