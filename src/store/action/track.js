import * as Constants from "./types";

export const addLocalTrack = (track) => {
    return {
        type: Constants.ADD_LOCAL_TRACK,
        payload: track
    }
}

export const removeLocalTrack = (track) => {
    return {
        type: Constants.REMOVE_LOCAL_TRACK,
        payload: track
    }
}

export const updateLocalTrack = (track, newTrack) => {
    return {
        type: Constants.UPDATE_LOCAL_TRACK,
        payload: { track, newTrack}
    }
    
}
export const localTrackMutedChanged = () => {
    return {
        type: Constants.LOCAL_TRACK_MUTE_CHANGED
    }
}

export const remoteAllLocalTracks = () => {
    return {
        type: Constants.REMOVE_ALL_LOCAL_TRACK
    }
}
