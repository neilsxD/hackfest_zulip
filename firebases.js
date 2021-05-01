import firebase from "@firebase/app"
import "@firebase/auth"
import "@firebase/firestore"


  const firebaseConfig = {
    "apiKey": "AIzaSyB7g48CWUE3OVG3I8KrcZk_ljNIivVYVFg",
    "authDomain": "hackfest-zulip.firebaseapp.com",
    "databaseURL": "https://hackfest-zulip-default-rtdb.asia-southeast1.firebasedatabase.app",
    "projectId": "hackfest-zulip",
    "storageBucket": "hackfest-zulip.appspot.com",
    "messagingSenderId": "452566394435",
    "appId": "1:452566394435:web:2726bbd949e93cb14616f6",
    "measurementId": "G-T05FBZE59G" ,
  };



var database = firebase.database();
firebase.initializeApp(firebaseConfig);

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }


const dbRef = firebase.database().ref();

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

writeUserData('dsa' , 'das' , 'asd' , 'dsa') ;
