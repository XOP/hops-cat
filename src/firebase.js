import Firebase from 'firebase';

import { FIREBASE_CFG } from './constants/firebase';

import auth from '../auth.json';

const firebaseApp = Firebase.initializeApp(FIREBASE_CFG);

firebaseApp
    .auth()
    .signInWithEmailAndPassword(auth.email, auth.pass)
    .catch((error) => console.error(error));

const db = firebaseApp.database();

export default db;
