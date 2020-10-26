import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLMT3lv8n8Fw1LEyDC6EEiM-fct7ejA_o",
  authDomain: "translearn-99873.firebaseapp.com",
  databaseURL: "https://translearn-99873.firebaseio.com",
  projectId: "translearn-99873",
  storageBucket: "translearn-99873.appspot.com",
  messagingSenderId: "391114135129",
  appId: "1:391114135129:web:b305a9e07099fa211dc348",
  measurementId: "G-7MQM4PZYT8",
};

// app.initializeApp(firebaseConfig);

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  loginWithEmail(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async registerWithEmail(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    await this.db.collection("users").add({
      name: name,
      email: email,
    });
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  // addQuote(quote) {
  //   if (!this.auth.currentUser) {
  //     return alert("Not authorized");
  //   }

  //   return this.db.doc(this.auth.currentUser.uid).set({
  //     quote,
  //   });
  // }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    // this.auth.currentUser.nam
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  getCurrentUserEmail() {
    return this.auth.currentUser && this.auth.currentUser.email;
  }

  // addNametoDb(fname) {
  //   this.db.collection("newcl").add({
  //     firstname: fname,
  //   });
  // }
}

export default new Firebase();
