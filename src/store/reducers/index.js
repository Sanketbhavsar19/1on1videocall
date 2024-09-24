import { createSlice } from "@reduxjs/toolkit";
// import { removeConnection } from "../action/connection";
// import { addConnection } from "../action/connection";
   
     const initialState ={
      connection:null,
       localTracks: [],// Array to hold local tracks

     }

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
  
    addConnection: (state, action) => {
      state.connection = action.payload;
    },
    removeConnection: (state) => {
      state.connection = null;
    },
    addLocalTrack: (state, action) => {
      state.localTracks.push(action.payload); // Add a new local track
    },
    updateLocalTrack: (state, action) => {
      const index = state.localTracks.findIndex(
        (track) => track.getId() === action.payload.track.getId()
      );
      if (index !== -1) {
        state.localTracks[index] = action.payload.newTrack; // Update the local track
      }
  },
  removeLocalTrack:(state,action) => {
    state.localTracks = state.localTracks.filter(
      (track) => track.getId() !== action.payload.getId()
    );
  action.payload.dispose();
  },
  localTrackMuteChanged:(state) => {
  },
  removeAllLocalTracks:(state) => {
    state.localTracks.forEach((track) =>track.dispose());
    state.localTracks = [];
  },
},
});

export const {
  addConnection,
  removeConnection, 
  addLocalTrack,
  updateLocalTrack,
  removeLocalTrack,
  localTrackMuteChanged,
  removeAllLocalTracks, } = videoSlice.actions;

export default videoSlice.reducer;
