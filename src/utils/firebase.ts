import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDpEILEk9Jmwy2xarMWis0od2DCWayIF84',
    authDomain: 'kemplet.firebaseapp.com',
    databaseURL: 'https://kemplet.firebaseio.com',
    projectId: 'kemplet',
    storageBucket: 'kemplet.appspot.com',
    messagingSenderId: '86090933157',
    appId: '1:86090933157:web:792793c90586fc41437e4c',
    measurementId: 'G-VLSLQQMBBB',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
