import App from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCQzfLE2gvMf_CMK0ajW4RIR0M07ze0ibA",
    authDomain: "react-shop-eaad7.firebaseapp.com",
    databaseURL: "https://react-shop-eaad7.firebaseio.com",
    projectId: "react-shop-eaad7",
    storageBucket: "react-shop-eaad7.appspot.com",
    messagingSenderId: "94268002213",
    appId: "1:94268002213:web:44401d3fdcd341e808224c",
    measurementId: "G-VRKT1QH54X"
};

class Firebase {
  constructor() {
    App.initializeApp(firebaseConfig);
    this.auth = App.auth();
    this.db = App.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email, password, username) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: username
    });
  }

  logout() {
    return this.auth.signOut();
  }

  getUser() {
    return this.auth.currentUser();
  }
  
  authChange(user) {
    return this.auth.onAuthStateChanged(user);
  }
}

export default new Firebase();