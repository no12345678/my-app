const firebase = require("firebase");
var firebaseConfig = {
  apiKey: "AIzaSyA1oUm6fvhBa4dwMHDZIm6hjHSxA8Luqv8",
  authDomain: "react-test-ac89b.firebaseapp.com",
  projectId: "react-test-ac89b",
  storageBucket: "react-test-ac89b.appspot.com",
  messagingSenderId: "1080575332782",
  appId: "1:1080575332782:web:cf6eb0f70f246c110ab83f",
  measurementId: "G-1M5HPPT7JG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = db;
