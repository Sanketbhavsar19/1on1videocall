// import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Mic, MicOff, Videocam, VideocamOff, CallEnd } from '@mui/icons-material';

// const JoinTracks = (tracks,isMicrophone,isCamera) => {     
//     const dispatch = useDispatch();

//     const audioTrack = useSelector((state) => state.localTrack).find((track) =>
//         track?.isAudioTrack()
//       );
//       const videoTrack = useSelector((state) => state.localTrack).find((track) =>
//         track?.isVideoTrack()
//       );

// //   const [isAudioMuted, setIsAudioMuted] = useState(false);
// //   const [isVideoMuted, setIsVideoMuted] = useState(false);
//   const [isCallEnded, setIsCallEnded] = useState(false);
//   const [localStream, setLocalStream] = useState(null);
//   const videoRef = useRef(null); // Reference to the video element

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         setLocalStream(stream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream; // Assign the stream to the video element
//         }
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const handleAudioMute = () => {
//     setIsAudioMuted(!isAudioMuted);
//     if (localStream) {
//       localStream.getAudioTracks().forEach(track => {
//         track.enabled = !isAudioMuted;
//       });
//     }
//   };

//   const handleVideoMute = () => {
//     setIsVideoMuted(!isVideoMuted);
//     if (localStream) {
//       localStream.getVideoTracks().forEach(track => {
//         track.enabled = !isVideoMuted;
//       });
//     }
//   };

//   const handleCallEnd = () => {
//     setIsCallEnded(true);
//     if (localStream) {
//       localStream.getTracks().forEach(track => {
//         track.stop();
//       });
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-200">
//       <div className="w-full h-full flex justify-center items-center">
//         {localStream && (
//           <video
//             className="w-full h-full object-cover"
//             ref={videoRef} // Reference the video element
//             autoPlay
//             muted={isAudioMuted}
//           />
//         )}
//       </div>
//       <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex justify-center items-center gap-4">
//         <button
//           className={`bg-${isAudioMuted ? 'red' : 'green'}-500 hover:bg-${isAudioMuted ? 'red' : 'green'}-700 text-white font-bold py-2 px-4 rounded`}
//           onClick={handleAudioMute}
//         >
//           {isAudioMuted ? <MicOff /> : <Mic />}
//         </button>
//         <button
//           className={`bg-${isVideoMuted ? 'red' : 'green'}-500 hover:bg-${isVideoMuted ? 'red' : 'green'}-700 text-white font-bold py-2 px-4 rounded`}
//           onClick={handleVideoMute}
//         >
//           {isVideoMuted ? <VideocamOff /> : <Videocam />}
//         </button>
//         <button
//           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handleCallEnd}
//         >
//           <CallEnd />
//         </button>
//       </div>
//       {isCallEnded && (
//         <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex justify-center items-center">
//           <h1 className="text-3xl font-bold">Call Ended</h1>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JoinTracks;


import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Mic, MicOff, Videocam, VideocamOff, CallEnd } from '@mui/icons-material';
import { localTrackMutedChanged } from '../../store/action/track';
import { useLocation } from 'react-router-dom';

const JoinTracks = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { meetingTitle, name } = location.state; 
  const tracks = useSelector((state) => state.localTrack); // Fetching local tracks from Redux
  const audioTrack = tracks.find((track) => track?.getType() === 'audio');
  const videoTrack = tracks.find((track) => track?.getType() === 'video');

  const [isCallEnded, setIsCallEnded] = useState(false);
  const videoRef = useRef(null); // Reference to the video element

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      videoTrack.attach(videoRef.current); // Attach the video track correctly
    }
  }, [videoTrack]);

  useEffect(() => {
    dispatch(localTrackMutedChanged({ audioTrack, videoTrack }));
  }, [audioTrack, videoTrack, dispatch]);

  const handleAudioMute = async () => {
    if (audioTrack) {
      if (audioTrack.isMuted()) {
        await audioTrack.unmute();
      } else {
        await audioTrack.mute();
      }
      dispatch(localTrackMutedChanged({ audioTrack, videoTrack })); // Update the state in Redux
    }
  };

  const handleVideoMute = async () => {
    if (videoTrack) {
      if (videoTrack.isMuted()) {
        await videoTrack.unmute();
      } else {
        await videoTrack.mute();
      }
      dispatch(localTrackMutedChanged({ audioTrack, videoTrack })); // Update the state in Redux
    }
  };

  const handleCallEnd = () => {
    setIsCallEnded(true);
    if (videoTrack) {
      videoTrack.detach(); // Detach the video track when the call ends
    }
    if (audioTrack) {
      audioTrack.detach(); // Detach the audio track when the call ends
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-200 relative">
      <div className="w-full h-full flex justify-center items-center">
        {videoTrack && (
          <video
            className="w-full h-full object-cover"
            ref={videoRef} // Reference the video element
            autoPlay
            muted
          />
        )}
      </div>
      {/* Displaying the meeting title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <h2 className="text-lg font-bold">{meetingTitle}</h2>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-4">
        <button
          className={`bg-${audioTrack?.isMuted() ? 'red' : 'green'}-500 hover:bg-${audioTrack?.isMuted() ? 'red' : 'green'}-700 text-white font-bold py-2 px-4 rounded`}
          onClick={handleAudioMute}
        >
          {audioTrack?.isMuted() ? <MicOff /> : <Mic />}
        </button>
        <button
          className={`bg-${videoTrack?.isMuted() ? 'red' : 'green'}-500 hover:bg-${videoTrack?.isMuted() ? 'red' : 'green'}-700 text-white font-bold py-2 px-4 rounded`}
          onClick={handleVideoMute}
        >
          {videoTrack?.isMuted() ? <VideocamOff /> : <Videocam />}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCallEnd}
        >
          <CallEnd />
        </button>
      </div>
      {isCallEnded && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex justify-center items-center">
          <h1 className="text-3xl font-bold">Call Ended</h1>
        </div>
      )}
    </div>
  );
};

export default JoinTracks;
