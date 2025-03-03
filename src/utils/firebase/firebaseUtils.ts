import type { DocumentData, WithFieldValue } from 'firebase/firestore'
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'

import { db } from './firebaseConfig'

/**
 * Get a document from Firestore for a given uid.
 *
 * @param uid The unique identifier for the document.
 * @param collection The collection to get the document from.
 * @returns The document data if it exists.
 */
const getDocument = async <T extends WithFieldValue<DocumentData>>(
  uid: string,
  collection: string,
): Promise<T | undefined> => {
  try {
    const docRef = doc(db, collection, uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as T
    }

    return undefined
  }
  catch (error) {
    console.error(`Error in getDocument for ${uid}:`, error)
    return undefined
  }
}

/**
 * Get a document from Firestore or create it if it doesn't exist.
 *
 * @param uid The unique identifier for the document.
 * @param collection The collection to get or create the document in.
 * @param defaultData The default data to create the document with if it doesn't exist.
 * @returns The existing or newly created document data.
 */
const getOrCreateDocument = async <T extends WithFieldValue<DocumentData>>(
  uid: string,
  collection: string,
  defaultData: T,
): Promise<T | undefined> => {
  try {
    const docRef = doc(db, collection, uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as T // Return existing document data
    }

    await setDoc(docRef, defaultData)
    return defaultData // Return the newly created document data
  }
  catch (error) {
    console.error(`Error in getOrCreateDocument for ${uid}:`, error)
    return undefined // Return undefined on failure
  }
}

/**
 * Update a document in Firestore.
 *
 * @param uid The unique identifier for the document.
 * @param collection The collection to update the document in.
 * @param updates The data to update in the document.
 * @returns A promise that resolves when the update is complete.
 */
const updateDocument = async <T>(
  uid: string,
  collection: string,
  updates: Partial<T>,
): Promise<void> => {
  try {
    const docRef = doc(db, collection, uid)
    await setDoc(docRef, updates, { merge: true }) // Merge updates with existing data
  }
  catch (error) {
    console.error(`Error updating document in ${uid}:`, error)
    throw error // Rethrow error to be handled by caller
  }
}

/**
 * Listen for updates to a document in Firestore.
 *
 * @param collection The collection to listen for updates in
 * @param docId The unique identifier for the document
 * @param onUpdate Callback to be called when the document is updated (undefined if it doesn't exist)
 * @param onError Optional callback to be called if an error occurs
 * @returns A function to unsubscribe from the listener
 */
const subscribeToDocument = <T>(
  collection: string,
  docId: string,
  onUpdate: (data: T | undefined) => void,
  onError?: (error: Error) => void,
): (() => void) => {
  const docRef = doc(db, collection, docId)
  const unsubscribe = onSnapshot(
    docRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        onUpdate(docSnapshot.data() as T)
      }
      else {
        onUpdate(undefined)
      }
    },
    onError,
  )
  return unsubscribe
}

export { getDocument, getOrCreateDocument, subscribeToDocument, updateDocument }
