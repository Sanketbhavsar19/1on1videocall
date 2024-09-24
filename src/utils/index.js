import { GENERATE_TOKEN_URL } from "../constants";

// export function getRoomId(){
//     const characters = 'abcdefghijklmnopqrstuvwxyz';
//     function generateString(length){
//         let result = '';
//         const charactersLength = characters.length;
//         for (let i = 0; i < length; i++) {
//             result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }
// const str = generateString(9).trim()
// const strArr = str.match(/.{3}/g);
// console.log('Room id',strArr);
// return strArr.join("-");

// }

// export async function getToken(name ){
//   const apikey = process.env.REACT_APP_SARISKA_MEET_APP_API_KEY;
//   console.log("Api Key : ",apikey);
  
//   const body = {
//     method:"POST",
//     headers:{
//         'Content-Type' :'application/json'
//     },
//     body:JSON.stringify({
//         apikey:apikey,
//         user:{
//             name:name,
//         },
//         exp: "48 hours"
//   })
// };
// try{
//   const response = await fetch(GENERATE_TOKEN_URL,body);
//   if(response.ok){
//     const json = await response.json();
//     localStorage.setItem("SARISKA_TOKEN",json.token);
//     return json.token;
//   }else{
//     console.log("Error : ",response.status,response.statusText);
//   }
// }catch(error){
//     console.log("error",error);
// }
// }

// export async function getToken(profile, name) {
//   const body = {
//       method: "POST",
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//           apiKey: process.env.REACT_APP_SARISKA_MEET_APP_API_KEY,
//           user: {
//               // id: profile.id,
//               // avatar: avatarColor,
//               name: name,
//               // email: profile.email
//           },
//           exp: "48 hours"
//       })
//   try {
//       const response = await fetch(GENERATE_TOKEN_URL, body);
//       if (response.ok) {
//           const json = await response.json();
//           localStorage.setItem("SARISKA_TOKEN", json.token);
//           return json.token;
//       } else {
//           console.log(response.status);
//       }
//   } catch (error) {
//       console.log('error', error);
//   }
// }
// src/utils/index.js
// import { GENERATE_TOKEN_URL } from "../constants";

export async function getToken(mettingTitle) {
  console.log("getToken called with:", { mettingTitle }); // Step 1

  const body = {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          apiKey: process.env.REACT_APP_SARISKA_MEET_APP_API_KEY,
          user: {
            //   id: profile.id,
            //   avatar: avatarColor,
              name: mettingTitle,
            //   email: profile.email
          },
          exp: "48 hours"
      })
  };

  console.log("Request body:", body); // Step 2

  try {
      console.log("Sending fetch request to:", GENERATE_TOKEN_URL); // Step 3
      const response = await fetch(GENERATE_TOKEN_URL, body);
      console.log("Response received with status:", response.status); // Step 4

      if (response.ok) {
          const json = await response.json();
          console.log("Response JSON:", json); // Step 5
          localStorage.setItem("SARISKA_TOKEN", json.token);
          console.log("Token stored in localStorage:", json.token); // Step 6
          return json.token;
      } else {
          console.error("Fetch error with status:", response.status); // Log error status
      }
  } catch (error) {
      console.error("Error during fetch:", error); // Step 7
  }

};
