// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDupX8Pbp5ZlzLplnR5iDlsixAvElojcGY',
  authDomain: 'safepassage-nu.firebaseapp.com',
  projectId: 'safepassage-nu',
  storageBucket: 'safepassage-nu.firebasestorage.app',
  messagingSenderId: '139558185877',
  appId: '1:139558185877:web:a992f07026a760aa66649c',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = initializeFirestore(app, { localCache: persistentLocalCache({}) })

const auth = getAuth(app)

export { auth, db }
