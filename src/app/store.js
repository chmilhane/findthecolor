import { configureStore } from '@reduxjs/toolkit'

import gameReducer from '../features/gameSlice';
import menuReducer from '../features/menuSlice';

export default configureStore({
  reducer: {
    menu: menuReducer,
    game: gameReducer
  }
});