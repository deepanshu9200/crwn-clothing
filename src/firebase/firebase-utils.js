import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

 const config = {
   apiKey: "AIzaSyCbNv1OY2RXhy1pc8X8HbCMCqCCJe-hRY4",
   authDomain: "crown-db-af838.firebaseapp.com",
   databaseURL: "https://crown-db-af838.firebaseio.com",
   projectId: "crown-db-af838",
   storageBucket: "crown-db-af838.appspot.com",
   messagingSenderId: "843271740586",
   appId: "1:843271740586:web:2401ff563e8eea4b11c4d3",
   measurementId: "G-0LL3P40REH",
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
