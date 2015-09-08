import React, { Component } from 'react';
import { connect } from 'react-redux';

import  * as player from 'actions/player';
import Player from 'components/Player';
import SongsList from 'components/SongsList';

class Application extends Component {
  render() {
    const { dispatch } = this.props;
    const {songs, current, playing} = this.props;

    return (
      <div>
        <header>
          <h1>Player de Mizik</h1>
        </header>
        <aside>
          <SongsList
            songs={songs}
          />
        </aside>
        <footer>
          <Player
            songs={songs}
            playing={playing}
            current={current}
            onBackward={() => dispatch(player.backward())}
            onForward={() => dispatch(player.forward())}
            onPause={() => dispatch(player.pause())}
            onPlay={() => dispatch(player.play())}
            onStop={() => dispatch(player.stop())}
          />
        </footer>
      </div>
    );
  }
}

function select(state) {
  return state.player;
}

export default connect(select)(Application);
