import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    difficulty: 0,
    score: 0,
    currentColor: {
      r: 0,
      g: 0,
      b: 0
    },
    submittedColor: {
      r: 0,
      g: 0,
      b: 0
    },
    hasSubmitted: false,
    percentage: 0
  },
  reducers: {
    setHasSubmitted: (state, action) => {
      state.hasSubmitted = action.payload;
    },

    reset(state) {
      state.difficulty = 0;
      state.score = 0;

      state.currentColor.r = 0;
      state.currentColor.g = 0;
      state.currentColor.b = 0;

      state.submittedColor.r = 0;
      state.submittedColor.g = 0;
      state.submittedColor.b = 0;

      state.hasSubmitted = false;
      state.percentage = 0;
    },

    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    
    nextDifficulty: (state) => {
      state.difficulty = state.difficulty === 2 ? 0 : state.difficulty + 1;
    },

    setScore: (state, action) => {
      state.score = action.payload;
    },

    setRandomColor: (state) => {
      state.currentColor.r = Math.floor(Math.random() * 256);
      state.currentColor.g = Math.floor(Math.random() * 256);
      state.currentColor.b = Math.floor(Math.random() * 256);
    },

    submitGuess(state, action) {
      const { r, g, b } = action.payload;
      const { r: cr, g: cg, b: cb } = state.currentColor;

      const diff = Math.abs(r - cr) + Math.abs(g - cg) + Math.abs(b - cb);

      state.hasSubmitted = true;

      state.submittedColor.r = r;
      state.submittedColor.g = g;
      state.submittedColor.b = b;

      const percentage = 100 - (diff / 255) * 100;
      state.percentage = Math.min(Math.max(percentage, 0), 100);

      const points = 255 - diff;

      if (percentage >= 30 && state.difficulty === 0) {
        state.score += points;
      }

      if (percentage >= 50 && state.difficulty === 1) {
        state.score += points * 1.5;
      }

      if (percentage >= 70 && state.difficulty === 2) {
        state.score += points * 2;
      }
    }
  }
})

export const { reset, setDifficulty, setScore, nextDifficulty, setRandomColor, submitGuess, setHasSubmitted } = gameSlice.actions;

export default gameSlice.reducer;