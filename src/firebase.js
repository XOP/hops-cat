import Firebase from 'firebase';

import { FIREBASE_CFG } from './constants/firebase';

export const firebaseApp = Firebase.initializeApp(FIREBASE_CFG);

const db = firebaseApp.database();

export default db;
