import {LOG_IN, LOG_OUT} from './actionTypes';

export const log_in = (payload) => {
  return {
    type: LOG_IN,
    payload
  }
}

export const log_out = () => {
  return {
    type: LOG_OUT
  }
}