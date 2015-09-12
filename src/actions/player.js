export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_STOP = 'PLAYER_STOP';

export const PLAYER_REPEAT = 'PLAYER_REPEAT';
export const PLAYER_RANDOM = 'PLAYER_RANDOM';

export const PLAYER_VOLUME_CHANGE = 'PLAYER_VOLUME_CHANGE';
export const PLAYER_SONG_CHANGE = 'PLAYER_SONG_CHANGE';

export function play(song) {
  return { type: PLAYER_PLAY, payload: { song }  };
}

export function pause() {
  return { type: PLAYER_PAUSE };
}

export function stop() {
  return { type: PLAYER_STOP };
}

export function volumeChange(value) {
  return { type: PLAYER_VOLUME_CHANGE, payload: { value } };
}

export function songChange(song) {
  return { type: PLAYER_SONG_CHANGE, payload: { song } };
}

export function repeat(song) {
  return { type: PLAYER_REPEAT, payload: { song } };
}

export function random(songs) {
  return { type: PLAYER_RANDOM, payload: { songs } };
}
