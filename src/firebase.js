import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDCuuLgHsxXkrSh6ojklFw6zDkKaDPnYMY",
    authDomain: "se-project-268809.firebaseapp.com",
    databaseURL: "https://se-project-268809.firebaseio.com",
    projectId: "se-project-268809",
    storageBucket: "se-project-268809.appspot.com",
    messagingSenderId: "692247152850",
    appId: "1:692247152850:web:6b2e6e6b9b432f368b050b"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;