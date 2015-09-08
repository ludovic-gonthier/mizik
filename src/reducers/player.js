import { combineReducers } from 'redux';
import {
  PLAYER_PLAY,
  PLAYER_PAUSE,
  PLAYER_STOP,
  PLAYER_FORWARD,
  PLAYER_BACKWARD
} from 'actions/player';

const initial = {
  songs: [{
    title: 'Ray charles - What I\'d say',
    src: ''
  }, {
    title: 'Ray charles - Georgia',
    src: ''
  }, {
    title: 'Ray charles - Hit the road',
    src: ''
  }],
  current: undefined,
  playing: false
}

function player(state = initial, action) {
  let update;

  switch (action.type) {
    case PLAYER_PLAY:
      update = {
        playing: true,
        current: !state.current && state.songs.length ? 0 : undefined
      };

      return Object.assign({}, state, update);
    case PLAYER_PAUSE:
      return Object.assign({}, state, {playing: false});
    case PLAYER_STOP:
      return Object.assign({}, state, {playing: false, current: undefined});
    case PLAYER_FORWARD:
      update = {
        playing: true
      };

      if (state.songs.length > state.current + 1) {
        update.current = state.current + 1
      } else if (state.songs.length) {
        update.current = 0;
      } else {
        update.current = undefined;
      }

      return Object.assign({}, state, update);
    case PLAYER_BACKWARD:
      update = {
        playing: true
      };

      if (state.current > 0) {
        update.current = state.current - 1
      } else if (state.songs.length) {
        update.current = state.songs.length - 1;
      } else {
        update.current = undefined;
      }

      return Object.assign({}, state, update);
    default:
      return state;
  }
}

export default combineReducers({
  player
});
