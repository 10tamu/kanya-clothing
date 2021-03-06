import firebase from "firebase/app";
import "firebase/firestore"; // for databse
import "firebase/auth"; // for authentication

const config = {
  apiKey: "AIzaSyAsW8LysnNzOKksQyzBSo6_jPpRvalvWLc",
  authDomain: "kanya-db.firebaseapp.com",
  databaseURL: "https://kanya-db.firebaseio.com",
  projectId: "kanya-db",
  storageBucket: "kanya-db.appspot.com",
  messagingSenderId: "177353976542",
  appId: "1:177353976542:web:d1f47a72e841f25be4f04f",
  measurementId: "G-CMLKDKL28C",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exist) {
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
      console.log("error creating user ", error.message);
    }
  }
 return userRef;
};
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
