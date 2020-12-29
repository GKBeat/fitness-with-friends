import { LOG_IN, LOG_OUT } from '../actions/actionTypes';
const initialState = {
  username: '',
  _id: '',
  isAdmin: false,
  createdAt: 0,
  level: 0,
  amount: 5,
  theme: 0,
  machines: [],
  currentStreak: 0,
  highestStreak: 0
}

const user = (state=initialState, action) => {
  switch(action.type){
    case LOG_IN: {
      const { username, _id, isAdmin, createdAt, level, amount, theme, machines, currentStreak, highestStreak } = action.payload;
      return {
        username,
        _id,
        isAdmin,
        createdAt,
        level,
        amount,
        theme,
        machines,
        currentStreak,
        highestStreak
      }
    }
    case LOG_OUT: {
      return initialState;
    }
    default:
      return state;
  }
}

export default user;