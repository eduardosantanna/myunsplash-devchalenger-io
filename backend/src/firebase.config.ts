import * as firebase from 'firebase-admin'

export function initializeFirebase() {
  const serviceAccount = JSON.parse(process.env.FIREBASE_KEY)
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_BUCKET_URL,
  })
}
