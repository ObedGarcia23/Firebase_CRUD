
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
  import { collection, getFirestore, addDoc,getDocs, onSnapshot,deleteDoc,doc,getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"

  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBIKkkuVPwSR7goJTZ8Kr_OHLR4OTj82h4",
    authDomain: "fir-crud-ebde2.firebaseapp.com",
    projectId: "fir-crud-ebde2",
    storageBucket: "fir-crud-ebde2.appspot.com",
    messagingSenderId: "596030861289",
    appId: "1:596030861289:web:47959ad145759f343c6578",
    measurementId: "G-003HHLZ6YT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const db = getFirestore();

  export const saveTask = (title,description) => 
    //console.log(title, description);
    addDoc(collection(db,"tasks"), {title, description});
  
export const getTasks = () => getDocs(collection(db,"tasks"));

export const onGetTasks = (callback) => onSnapshot(collection(db,"tasks"), callback); 

export const deleteTasks = (id) => deleteDoc(doc(db,"tasks",id));

export const  getTask = (id) => getDoc(doc(db,"tasks",id));

export const updateTask = (id,newFields) => updateDoc(doc(db,"tasks",id),newFields);