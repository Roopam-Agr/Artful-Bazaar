// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1wtoGxTjE-RPifOOihQ3xWL3itq_VHLk",
  authDomain: "artfulbazaar-83f39.firebaseapp.com",
  projectId: "artfulbazaar-83f39",
  storageBucket: "artfulbazaar-83f39.appspot.com",
  messagingSenderId: "469097977622",
  appId: "1:469097977622:web:873b94e1e92f45aae62237",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const fireDB = getFirestore(app)
const auth = getAuth(app)
export { fireDB, auth }
