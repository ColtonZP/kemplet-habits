// Start writing functions
// https://firebase.google.com/docs/functions/typescript
// See a full list of supported triggers at https://firebase.google.com/docs/functions
import { UserRecord } from 'firebase-admin/auth';

import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();

exports.addUser = functions.auth.user().onCreate((user: UserRecord) => {
    const { uid } = user;
    return admin
        .firestore()
        .collection('users')
        .doc(uid)
        .set({ habits: [], habitHistory: {} });
});

exports.removeUser = functions.auth.user().onDelete((user: UserRecord) => {
    const { uid } = user;
    const doc = admin.firestore().collection('users').doc(uid);
    return doc.delete();
});
