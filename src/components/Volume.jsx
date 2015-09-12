import React, { Component, PropTypes } from 'react';

import styles from 'assets/css/volume.css';

const WHEEL_VOLUME_DELTA = 0.05;

const VOLUME_PICKER_WIDTH = 70;
const VOLUME_PICKER_HEIGHT = 20;

export default class Volume extends Component {
  handleWheelEvent(event) {
    let { volume } = this.props;

    volume = parseFloat(volume.toFixed(2));

    event.preventDefault();

    if (event.deltaY > 0 && volume > 0) {
      return this.props.onVolumeChange(parseFloat(volume - WHEEL_VOLUME_DELTA));
    }


    if (event.deltaY < 0 && volume < 1) {
      return this.props.onVolumeChange(parseFloat(volume + WHEEL_VOLUME_DELTA));
    }
  }

  handleVolumeChange(event) {
    const rect = React.findDOMNode(this.refs.volumePicker).getBoundingClientRect();

    // position within the element
    const position = event.clientY - rect.top;
    // the volume
    const volume = position / rect.height;

    this.props.onVolumeChange(parseFloat(volume.toFixed(2)));
  }

  render() {
    const { volume } = this.props;

    const x = volume * VOLUME_PICKER_WIDTH;
    const y = volume * VOLUME_PICKER_HEIGHT;

    return (
      <svg
        height={VOLUME_PICKER_HEIGHT}
        width={VOLUME_PICKER_WIDTH}
        onClick={(event) => this.handleVolumeChange(event)}
        onWheel={::this.handleWheelEvent}
        ref="volumePicker"
      >
        <polygon points={`0,${VOLUME_PICKER_HEIGHT} ${VOLUME_PICKER_WIDTH},${VOLUME_PICKER_HEIGHT} ${VOLUME_PICKER_WIDTH},0`} style={{fill:'grey',stroke:'#393939',strokeWidth:1}} />
        <svg
          height={VOLUME_PICKER_HEIGHT}
          width={VOLUME_PICKER_WIDTH}
        >
          <polygon points={`0,${VOLUME_PICKER_HEIGHT} ${x},${VOLUME_PICKER_HEIGHT} ${x},${VOLUME_PICKER_HEIGHT - y}`} style={{fill:'black'}} />
        </svg>
      </svg>
    );
  }
}

Volume.propTypes = {
  onVolumeChange: PropTypes.func.isRequired,
  volume: React.PropTypes.number,
};
