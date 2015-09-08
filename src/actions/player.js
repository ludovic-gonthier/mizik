export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_STOP = 'PLAYER_STOP';
export const PLAYER_FORWARD = 'PLAYER_FORWARD';
export const PLAYER_BACKWARD = 'PLAYER_BACKWARD';
export const PLAYER_REPEAT = 'PLAYER_REPEAT';
export const PLAYER_RANDOM = 'PLAYER_RANDOM';

export function play() {
  return { type: PLAYER_PLAY };
}

export function pause() {
  return { type: PLAYER_PAUSE };
}

export function stop() {
  return { type: PLAYER_STOP };
}

export function forward(index) {
  return { type: PLAYER_FORWARD, payload: { index } };
}

export function backward(index) {
  return { type: PLAYER_BACKWARD, payload: { index } };
}

export function repeat(song) {
  return { type: PLAYER_REPEAT, payload: { song } };
}

export function random(songs) {
  return { type: PLAYER_RANDOM, payload: { songs } };
}
