import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDNvzcgH5Qo8CZyozmx3i4D7SJZf33b7f0',
  authDomain: 'threads-e7733.firebaseapp.com',
  databaseURL: 'https://threads-e7733-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'threads-e7733',
  storageBucket: 'threads-e7733.appspot.com',
  messagingSenderId: '639657688196',
  appId: '1:639657688196:web:fea7207fadc84a0fec56d1',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
