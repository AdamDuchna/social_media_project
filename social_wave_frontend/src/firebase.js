import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZONpXBTQ0HDYaKvlpJMkgCTHgDliuAKU",
  authDomain: "socialmediaproject-71f7d.firebaseapp.com",
  projectId: "socialmediaproject-71f7d",
  storageBucket: "socialmediaproject-71f7d.appspot.com",
  messagingSenderId: "310953259323",
  appId: "1:310953259323:web:90a94b0f23bef30bf0071e",
  measurementId: "G-N0407C8WQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)