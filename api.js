

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, query, where } from "firebase/firestore/lite"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyYncKpZLjBTifnNKO-7SnvALM0d2QY5A",
  authDomain: "vanlife-a1fbe.firebaseapp.com",
  projectId: "vanlife-a1fbe",
  storageBucket: "vanlife-a1fbe.appspot.com",
  messagingSenderId: "1060649424285",
  appId: "1:1060649424285:web:a80e11bcd8b529a6fa4b74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

//Gets collection of vans from database
export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}
//Gets a single by van's id from database and returns data inside vanDetail.jsx for receiving and displaying
export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}