// import React, { useState, useRef } from "react";
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import SariskaMediaTransport from 'sariska-media-transport';

// import{
//   TextField, 
//   Button, 
//   Box, 
//   Typography, 
//   Container, 
//   Grid, 
//   IconButton, 
//   Card,
//   CardContent,
//   CardActions
// } from '@mui/material';
// import { getToken } from "../../utils";
// import {useDispatch,useSelector} from 'react-redux';
// import { addConnection } from "../../store/action/connection";

// // const RoomForm = () => {
// //   const [meetingTitle, setMeetingTitle] = useState('');
// //   // const [userName, setUserName] = useState('');
// //   const [name, setname]= useState('');
// //   const [micEnabled, setMicEnabled] = useState(true);
// //   const [videoEnabled, setVideoEnabled] = useState(true);
// //   const [stream, setStream] = useState(null);
// //   const videoRef = useRef(null);
// //   const dispatch = useDispatch();
// //   const profile = useSelector((state) => state.profile);
// //     SariskaMediaTransport.initialize();
  
// //   const handleSubmit = async (e) => {
// //    e.preventDefault();
// //   console.log("Submission started."); // Step 1
  
// //   //   if (!meetingTitle) {
// //   //     console.warn("room Title is required."); // Log warning
// //   //     // dispatch(
// //   //     //   showNotification({
// //   //     //     message: "Meeting Title is required",
// //   //     //     severity: "warning",
// //   //     //     autoHide: true,
// //   //     //   })
// //   //     // );
// //   //     return;
// //   //   }

// //   //   console.log("Fetching token..."); // Step 5
// //   //   const token = await getToken(name);
// //   //   console.log("Token retrieved:", token); // Log the token
  
// //   //   if (!token) {
// //   //     console.error("Failed to retrieve token."); // Check if token is valid
// //   //     return; // Exit if token retrieval failed
// //   //   }

// //   //   console.log("Setting up Jitsi connection with meeting title:", meetingTitle); // Step 6
// //   //   const connection = new SariskaMediaTransport.JitsiConnection(
// //   //    token,
// //   //     meetingTitle,
// //   //     process.env.REACT_APP_ENV === "development" ? true : false
// //   //   );
  
// //   //   connection.addEventListener(
// //   //     SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED,
// //   //     () => {
// //   //       console.log("Connection established."); // Log successful connection
// //   //       dispatch(addConnection(connection));
// //   //       // createConference(connection);
// //   //     }
// //   //   );
// //   //   connection.connect();

// //   // };

// //   // const requestMediaPermissions = async () => {
// //   //   try {
// //   //     // Request media permissions with current states
// //   //     const mediaStream = await navigator.mediaDevices.getUserMedia({
// //   //       audio: micEnabled,
// //   //       video: videoEnabled
// //   //     });
      
// //   //     // Stop previous stream if it exists
// //   //     if (stream) {
// //   //       stream.getTracks().forEach(track => track.stop());
// //   //     }
      
// //   //     // Update stream and attach it to video element
// //   //     setStream(mediaStream);
// //   //     if (videoRef.current) {
// //   //       videoRef.current.srcObject = mediaStream;
// //   //     }
// //   //   } catch (error) {
// //   //     console.error('Media access denied or error occurred', error);
// //   //   }
// //   // };


// //   const token = await getToken(); // Fetch the token dynamically

// // // Create a new connection instance with the token, room name, and isNightly flag
// // const connection = new SariskaMediaTransport.JitsiConnection(token, "name");

// // // Event listener for a successful connection
// // connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED, () => {
// //     console.log('Connection successful!!!');
// //     // You can now proceed to join the room and add tracks
// // });

// // // Handle connection failure, such as token expiration
// // connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_FAILED, (error) => {
// //     // Check if token needs to be refreshed (e.g., when PASSWORD_REQUIRED is the reason)
// //     if (error.code === SariskaMediaTransport.events.connection.PASSWORD_REQUIRED) {
// //         // Fetch a new token and set it again
// //         const newToken = getToken(); 
// //         connection.setToken(newToken);
// //         console.log('Token expired, refreshed and set new token.');
// //     } else {
// //         console.error('Connection failed!!!', error);
// //     }
// // });
// // // Handle connection being disconnected
// // connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_DISCONNECTED, (error) => {
// //     console.log('Connection disconnected!!!', error);
// //     // You can reconnect or handle the disconnection here
// // });

// // // Establish the connection
// // connection.connect();

// // };
// //   const toggleMic = () => {
// //     setMicEnabled(prevState => {
// //       const newMicState = !prevState;
// //       requestMediaPermissions();
// //       return newMicState;
// //     });
// //   };

// //   const toggleVideo = () => {
// //     setVideoEnabled(prevState => {
// //       const newVideoState = !prevState;
// //       requestMediaPermissions(); 
// //       return newVideoState;
// //     });
// //   };
// //   return (
// //     <Container maxWidth="sm">
// //       <Box sx={{ mt: 5 }}>
// //         <Typography variant="h4" component="h2" color="black">
// //           Create Room
// //         </Typography>

// //         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
// //           <IconButton onClick={toggleVideo} color={videoEnabled ? 'primary' : 'secondary'}>
// //             {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
// //           </IconButton>

// //           {/* Mic Icon */}
// //           <IconButton onClick={toggleMic} color={micEnabled ? 'primary' : 'secondary'}>
// //             {micEnabled ? <MicIcon /> : <MicOffIcon />}
// //           </IconButton>
// //         </Box>

// //         {/* Video Stream Preview */}
// //         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
// //           <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />
// //         </Box>

// //         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
// //           <Grid container spacing={2}>
// //             <Grid item xs={12}>
// //               <TextField
// //                 required
// //                 fullWidth
// //                 id="roomTitle"
// //                 label="Room Title"
// //                 name="roomTitle"
// //                 autoComplete="roomTitle"
// //                 value={meetingTitle}
// //                 onChange={(event) => setMeetingTitle(event.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 required
// //                 fullWidth
// //                 id="userId"
// //                 label="UserName"
// //                 value={name}
// //                 onChange={(event) => setname(event.target.value)}
// //               />
// //             </Grid>
// //           </Grid>
// //           <Button
// //             type="submit"
// //             fullWidth
// //             variant="contained"
// //             sx={{ mt: 3, mb: 2 }}
// //           >
// //             Create Room
// //           </Button>
// //         </Box>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default RoomForm;


// const RoomForm = () => {
//   const [meetingTitle, setMeetingTitle] = useState('');
//   const [name, setName] = useState('');
//   const [micEnabled, setMicEnabled] = useState(true);
//   const [videoEnabled, setVideoEnabled] = useState(true);
//   const [stream, setStream] = useState(null);
//   const videoRef = useRef(null);
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.profile);

//   SariskaMediaTransport.initialize();

//   const requestMediaPermissions = async () => {
//     try {
//       // Request media permissions based on current mic and video states
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         audio: micEnabled,
//         video: videoEnabled,
//       });

//       // Stop previous stream if it exists
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }

//       // Update stream and attach it to the video element
//       setStream(mediaStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }
//     } catch (error) {
//       console.error('Media access denied or error occurred', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Fetch and set token, handle connection, etc.
//     const token = await getToken();
//     const connection = new SariskaMediaTransport.JitsiConnection(token, name);

//     connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED, () => {
//       console.log('Connection successful!!!');
//       dispatch(addConnection(connection));
//     });

//     connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_FAILED, async (error) => {
//       if (error.code === SariskaMediaTransport.events.connection.PASSWORD_REQUIRED) {
//         const newToken = await getToken();
//         connection.setToken(newToken);
//         console.log('Token refreshed and set.');
//       } else {
//         console.error('Connection failed!!!', error);
//       }
//     });

//     connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_DISCONNECTED, (error) => {
//       console.log('Connection disconnected!!!', error);
//     });

//     connection.connect();
//   };

//   const toggleMic = () => {
//     setMicEnabled((prevState) => {
//       const newMicState = !prevState;
//       requestMediaPermissions();
//       return newMicState;
//     });
//   };

//   const toggleVideo = () => {
//     setVideoEnabled((prevState) => {
//       const newVideoState = !prevState;
//       requestMediaPermissions();
//       return newVideoState;
//     });
// //   };
// //   return (
// //     <div >
// //         <Box sx={{display: 'flex',alignItems:'flex-start',left:0 , justifyContent: 'center', mb: 2 }}>
// //           <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />
// //          </Box>
// //     <Card
// //       sx={{
// //         maxWidth: 400,
// //         margin: "auto",
// //         alignContent:"flex-end",
// //         marginTop: 15,
// //         right:0,
// //         backgroundColor: "transparent",
// //       }}
// //     >
// //       <CardContent>
// //         <Typography
// //           variant="h5"
// //           component="div"
// //           align="center"
// //           sx={{ marginBottom: 2 }}
// //         >
// //           Create Meet
// //         </Typography>
// //         <form
// //           onSubmit={handleSubmit}
// //           style={{ display: "flex", flexDirection: "column", gap: "16px" }}
// //         >
// //           <TextField
// //             fullWidth
// //             label="Room Name"
// //             value={meetingTitle}
// //             onChange={(e) => setMeetingTitle(e.target.value)}
// //             required
// //           />
// //           <TextField
// //             fullWidth
// //             label="Your Name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             required
// //           />
// //           <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
// //             <IconButton
// //               onClick={() => setMicEnabled(!micEnabled)}
// //               color={micEnabled ? "primary" : "default"}
// //             >
// //               {micEnabled ? <MicIcon /> : <MicOffIcon />}
// //             </IconButton>
// //             <IconButton
// //               onClick={() => setVideoEnabled(!videoEnabled)}
// //               color={videoEnabled ? "primary" : "default"}
// //             >
// //               {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
// //             </IconButton>
// //           </Box>
// //         </form>
// //       </CardContent>
// //       <CardActions>
// //         <Button
// //           fullWidth
// //           variant="contained"
// //           color="primary"
// //           onClick={handleSubmit}
// //           sx={{ marginTop: 2 }}
// //         >
// //           Create Room
// //         </Button>
// //       </CardActions>
// //     </Card>
// //     </div>
// //   );
// // }
// // export default RoomForm ; 

// return (
//   <Grid container spacing={2} sx={{ mt: 5 }}>
//     {/* Video on the left */}
//     <Grid item xs={12} md={6}>
//       <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//         <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />
//       </Box>
//     </Grid>

//     {/* Card on the right */}
//     <Grid item xs={12} md={6}>
//       <Card
//         sx={{
//           maxWidth: 400,
//           margin: "auto",
//           backgroundColor: "transparent",
//         }}
//       >
//         <CardContent>
//           <Typography
//             variant="h5"
//             component="div"
//             align="center"
//             sx={{ marginBottom: 2 }}
//           >
//             Create Meet
//           </Typography>
//           <form
//             onSubmit={handleSubmit}
//             style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//           >
//             <TextField
//               fullWidth
//               label="Room Name"
//               value={meetingTitle}
//               onChange={(e) => setMeetingTitle(e.target.value)}
//               required
//             />
//             <TextField
//               fullWidth
//               label="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
//               <IconButton
//                 onClick={toggleMic}
//                 color={micEnabled ? "primary" : "default"}
//               >
//                 {micEnabled ? <MicIcon /> : <MicOffIcon />}
//               </IconButton>
//               <IconButton
//                 onClick={toggleVideo}
//                 color={videoEnabled ? "primary" : "default"}
//               >
//                 {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
//               </IconButton>
//             </Box>
//           </form>
//         </CardContent>
//         <CardActions>
//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             sx={{ marginTop: 2 }}
//           >
//             Create Room
//           </Button>
//         </CardActions>
//       </Card>
//     </Grid>
//   </Grid>
// );
// };
// };

// export default RoomForm;


// import React, { useState, useRef } from "react";
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import SariskaMediaTransport from 'sariska-media-transport';
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Grid,
//   IconButton,
//   Card,
//   CardContent,
//   CardActions,
// } from '@mui/material';
// import { getToken } from "../../utils";
// import { useDispatch, useSelector } from 'react-redux';
// import { addConnection } from "../../store/action/connection";
// import { useNavigate } from 'react-router-dom'; // Import useNavigate


// const RoomForm = () => {
//   const [meetingTitle, setMeetingTitle] = useState('');
//   const [name, setName] = useState('');
//   const [micEnabled, setMicEnabled] = useState(true);
//   const [videoEnabled, setVideoEnabled] = useState(true);
//   const [stream, setStream] = useState(null);
//   const videoRef = useRef(null);
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.profile);
//   const navigate = useNavigate(); // Initialize useNavigate


//   SariskaMediaTransport.initialize();

//   const requestMediaPermissions = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         audio: micEnabled,
//         video: videoEnabled,
//       });

//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }

//       setStream(mediaStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }
//     } catch (error) {
//       console.error('Media access denied or error occurred', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

    
//     const token = await getToken();
//     const connection = new SariskaMediaTransport.JitsiConnection(token, name);

//     connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED, () => {
//       console.log('Connection successful!!!');
//       dispatch(addConnection(connection));
//     });
//     navigate('/jointracks', { state: { tracks, name } });


//     connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_FAILED, async (error) => {
//       if (error.code === SariskaMediaTransport.events.connection.PASSWORD_REQUIRED) {
//         const newToken = await getToken();
//         connection.setToken(newToken);
//         console.log('Token refreshed and set.');
//       } else {
//         console.error('Connection failed!!!', error);
//       }
//     });

//     connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_DISCONNECTED, (error) => {
//       console.log('Connection disconnected!!!', error);
//     });

//     connection.connect();
//   };

//   const toggleMic = () => {
//     setMicEnabled((prevState) => {
//       const newMicState = !prevState;
//       requestMediaPermissions();
//       return newMicState;
//     });
//   };

//   const toggleVideo = () => {
//     setVideoEnabled((prevState) => {
//       const newVideoState = !prevState;
//       requestMediaPermissions();
//       return newVideoState;
//     });
//   };

//   return (
//     <Grid container spacing={3} sx={{ mt: 5 }}>
//       {/* Video on the left */}
//       <Grid item xs={12} md={6}>
//         <Box sx={{ display: 'flex', justifyContent: 'center',marginTop:"-30px", marginLeft:'20px',mb: 2 }}>
//           <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />
//         </Box>
//       </Grid>

//       {/* Card on the right */}
//       <Grid item xs={12} md={6}>
//         <Card
//           sx={{
//             maxWidth: 400,
//             margin: "auto",
//             backgroundColor: "transparent",
//           }}
//         >
//           <CardContent>
//             <Typography
//               variant="h5"
//               component="div"
//               align="center"
//               sx={{ marginBottom: 2 }}
//             >
//               Create Meet
//             </Typography>
//             <form
//               onSubmit={handleSubmit}
//               style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//             >
//               <TextField
//                 fullWidth
//                 label="Room Name"
//                 value={meetingTitle}
//                 onChange={(e) => setMeetingTitle(e.target.value)}
//                 required
//               />
//               <TextField
//                 fullWidth
//                 label="Your Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//               <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
//                 <IconButton
//                   onClick={toggleMic}
//                   color={micEnabled ? "primary" : "default"}
//                 >
//                   {micEnabled ? <MicIcon /> : <MicOffIcon />}
//                 </IconButton>
//                 <IconButton
//                   onClick={toggleVideo}
//                   color={videoEnabled ? "primary" : "default"}
//                 >
//                   {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
//                 </IconButton>
//               </Box>
//             </form>
//           </CardContent>
//           <CardActions>
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               sx={{ marginTop: 2 }}
//             >
//               Create Room
//             </Button>
//           </CardActions>
//         </Card>
//       </Grid>
//     </Grid>        
//   );
// };

// export default RoomForm;

import React, { useState, useRef, useEffect } from "react";
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import SariskaMediaTransport from 'sariska-media-transport';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { getToken } from "../../utils";
import { useDispatch } from 'react-redux';
import { addConnection } from "../../store/action/connection";

const RoomForm = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [name, setName] = useState('');
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [localTracks, setLocalTracks] = useState([]);
  const [participants, setParticipants] = useState([]);
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const remoteAudioRef = useRef([]);
  const remoteVideoRef = useRef([]);

  SariskaMediaTransport.initialize();

  const createLocalTracks = async () => {
    try {
      const tracks = await SariskaMediaTransport.createLocalTracks({
        devices: [micEnabled ? 'audio' : null, videoEnabled ? 'video' : null].filter(Boolean),
      });
      setLocalTracks(tracks);
      tracks.forEach((track) => {
        if (track.getType() === 'video' && videoRef.current) {
          track.attach(videoRef.current);
        }
      });
      return tracks;
    } catch (error) {
      console.error('Error creating local tracks', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    const connection = new SariskaMediaTransport.JitsiConnection(token, meetingTitle);

    connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED, async () => {
      console.log('Connection successful!!!');
      dispatch(addConnection(connection));
      const tracks = await createLocalTracks();
      createConference(connection, tracks); // Pass the tracks to the conference
    });

    connection.connect();
  };
  const createConference = async (connection, tracks) => {
    console.log("Initializing conference..."); // Log when starting to initialize the conference
    const conference = connection.initJitsiConference();
    console.log("Conference initialized:", conference); // Log the initialized conference object
  
    // Publish local tracks to the conference
    console.log("Publishing local tracks to the conference..."); // Log before publishing tracks
    tracks.forEach(track => {
      conference.addTrack(track);
      console.log("Track added:", track); // Log each track that is added
    });
  
    conference.addEventListener(SariskaMediaTransport.events.conference.USER_JOINED, (id, participant) => {
      console.log("User joined!!!", id, participant); // Log when a user joins
      setParticipants(prev => {
        const updatedParticipants = [...prev, { id, participant }];
        console.log("Updated participants list:", updatedParticipants); // Log updated participants
        return updatedParticipants;
      });
  
      // Create remote video/audio elements for new participants
      console.log("Creating remote audio and video elements for participant:", id); // Log before creating elements
      const remoteAudioElem = document.createElement('audio');
      const remoteVideoElem = document.createElement('video');
      remoteAudioElem.autoplay = true;
      remoteVideoElem.autoplay = true;
      remoteAudioElem.style.width = '100%';
      remoteVideoElem.style.width = '100%';
  
      remoteAudioRef.current[id] = remoteAudioElem;
      remoteVideoRef.current[id] = remoteVideoElem;
      console.log("Remote elements created for participant:", id); // Log after creating elements
  
      conference.addEventListener(SariskaMediaTransport.events.conference.TRACK_ADDED, (track) => {
        console.log("Track added for participant:", id, "Track:", track); // Log when a track is added
        if (track.getType() === "audio") {
          remoteAudioElem.srcObject = track.attach(remoteAudioElem); // Attach audio track
          console.log("Audio track attached for participant:", id); // Log when audio track is attached
        } else if (track.getType() === "video") {
          remoteVideoElem.srcObject = track.attach(remoteVideoElem); // Attach video track
          console.log("Video track attached for participant:", id); // Log when video track is attached
        }
      });
    });
  
    conference.join();
    console.log("Conference joined successfully!"); // Log after joining the conference
  };
  
  const toggleMic = () => {
    setMicEnabled(prevState => !prevState);
  };

  const toggleVideo = () => {
    setVideoEnabled(prevState => !prevState);
  };

  return (
    <Grid container spacing={3} sx={{ mt: 5 }}>
      {/* Local Video on the left */}
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "-30px", marginLeft: '20px', mb: 2 }}>
          <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />
        </Box>
      </Grid>

      {/* Card on the right */}
      <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 400, margin: "auto", backgroundColor: "transparent" }}>
          <CardContent>
            <Typography variant="h5" component="div" align="center" sx={{ marginBottom: 2 }}>
              {participants.length > 0 ? "Participants" : "Create Meet"}
            </Typography>
            {participants.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {participants.map((participant) => (
                  <Box key={participant.id} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography>{participant.participant}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <video ref={(el) => remoteVideoRef.current[participant.id] = el} autoPlay style={{ width: '100%' }} />
                      <audio ref={(el) => remoteAudioRef.current[participant.id] = el} autoPlay />
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <TextField
                  fullWidth
                  label="Room Name"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                  <IconButton onClick={toggleMic} color={micEnabled ? "primary" : "default"}>
                    {micEnabled ? <MicIcon /> : <MicOffIcon />}
                  </IconButton>
                  <IconButton onClick={toggleVideo} color={videoEnabled ? "primary" : "default"}>
                    {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
                  </IconButton>
                </Box>
              </form>
            )}
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginTop: 2 }}
            >
              Create Room
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RoomForm;
