import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBzVNrEx5a8TDvk27t28Tm4ermLSLZwbfs",
    authDomain: "earthfreshacres-7fe29.firebaseapp.com",
    databaseURL: "https://earthfreshacres-7fe29.firebaseio.com",
    projectId: "earthfreshacres-7fe29",
    storageBucket: "earthfreshacres-7fe29.appspot.com",
    messagingSenderId: "634605421820"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;