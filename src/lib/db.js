import { initializeApp } from 'firebase/app'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { person, bests } from '$lib/state.svelte.js'
import { get } from 'svelte/store'

const firebaseConfig = {
  apiKey: 'AIzaSyDeRUSK4JPQXFiAaCPIs3WjugrgblvD8YQ',
  authDomain: 'fir-example-bd9b1.firebaseapp.com',
  projectId: 'fir-example-bd9b1',
  storageBucket: 'fir-example-bd9b1.firebasestorage.app',
  messagingSenderId: '403132158288',
  appId: '1:403132158288:web:0d9cc2cdb853753181dc55',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

// Saves a bests object to the database with the UID of the person as the ID.
export async function setBests() {
  const bestDoc = await setDoc(doc(db, 'bests', person.uid), bests)
}

// Gets the logged in person's bests from the database.
export async function getBests() {
  // Get the bests document for the given UID
  const bestRef = doc(db, 'bests', person.uid)
  const bestSnap = await getDoc(bestRef)

  if (bestSnap.exists()) {
    // Get the bests data from the snapshot
    const bestData = bestSnap.data()

    // and set the bests state with the data
    bests.uid = bestData.uid
    bests.olympicLifts = bestData.olympicLifts
    bests.powerlifts = bestData.powerlifts
    bests.other = bestData.other
  } else {
    alert('No saved bests!')
  }
}

// Signs in a user with Google authentication.
export async function login() {
  // Sign in with Google
  const result = await signInWithPopup(auth, provider)

  // Set the person state with the logged in user's information so that it can be used in the app
  person.uid = result.user.uid
  person.email = result.user.email
  person.displayName = result.user.displayName
  person.photoURL = result.user.photoURL

  // Save the person state to local storage as well so that it persists across page reloads
  let data = JSON.stringify(person)
  localStorage.setItem('person', data)

  // Set the bests state with the logged in user's UID
  getBests()
}

// Signs out the current user.
export async function logout() {
  // Clear the person state
  person.uid = null
  person.email = null
  person.displayName = null
  person.photoURL = null

  // Clear the bests state
  bests.uid = null
  bests.olympicLifts = [
    {
      type: 'clean',
      weight: 0,
    },
    {
      type: 'snatch',
      weight: 0,
    },
    {
      type: 'jerk',
      weight: 0,
    },
  ]
  bests.powerlifts = [
    {
      type: 'squat',
      weight: 0,
    },
    {
      type: 'deadlift',
      weight: 0,
    },
    {
      type: 'bench',
      weight: 0,
    },
  ]
  bests.other = []

  // Clear local storage
  localStorage.removeItem('person')

  // Sign out from Firebase
  await signOut(auth)
}
