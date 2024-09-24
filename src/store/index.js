import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './reducers'; 

export const store = configureStore({
  reducer: {
    video: videoReducer, 
  },
});

