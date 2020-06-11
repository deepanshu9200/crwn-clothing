import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

 const config = {
   apiKey: "AIzaSyBGACq3wtzRaK20EaSawB9Ey-eowOk9YUk",
   authDomain: "crwn-clothing-f2479.firebaseapp.com",
   databaseURL: "https://crwn-clothing-f2479.firebaseio.com",
   projectId: "crwn-clothing-f2479",
   storageBucket: "crwn-clothing-f2479.appspot.com",
   messagingSenderId: "646682542305",
   appId: "1:646682542305:web:b9b0d34c1075defe37b7a0",
   measurementId: "G-WBN6SB78P9",
 };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
