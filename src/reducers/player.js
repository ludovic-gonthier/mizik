import { combineReducers } from 'redux';
import {
  PLAYER_PLAY,
  PLAYER_PAUSE,
  PLAYER_STOP,
  PLAYER_SONG_CHANGE,
  PLAYER_VOLUME_CHANGE,
} from 'actions/player';

const initial = {
  playlist: [{
    prev: 2,
    next: 1,
    title: '01 - That’s How Strong My Love Is',
    src: require('../../medias/Otis\ Redding/The\ Great\ Otis\ Redding\ Sings\ Soul\ Ballads/01\ -\ That\’s\ How\ Strong\ My\ Love\ Is.mp3'),
  }, {
    prev: 0,
    next: 2,
    title: '02 - Chained and Bound',
    src: require('../../medias/Otis\ Redding/The\ Great\ Otis\ Redding\ Sings\ Soul\ Ballads/02\ -\ Chained\ and\ Bound.mp3'),
  }, {
    prev: 1,
    next: 0,
    title: '03 - A Woman, A Lover, A Friend',
    src: require('../../medias/Otis\ Redding/The\ Great\ Otis\ Redding\ Sings\ Soul\ Ballads/03\ -\ A\ Woman,\ A\ Lover,\ A\ Friend.mp3'),
  }],
  song: undefined,
  playing: false,
  volume: 0.5,
};

function player(state = initial, action) {
  const { type, payload } = action;
  const assign = Object.assign.bind(Object, {});

  switch (type) {

  case PLAYER_PLAY:
    return assign(state, {playing: true, song: payload.song});

  case PLAYER_PAUSE:
    return assign(state, {playing: false});

  case PLAYER_STOP:
    return assign(state, {playing: false, song: undefined});

  case PLAYER_SONG_CHANGE:
    return assign(state, {song: payload.song});

  case PLAYER_VOLUME_CHANGE:
    return assign(state, {volume: payload.value});

  default:
    return state;
  }
}

export default combineReducers({
  player,
});
