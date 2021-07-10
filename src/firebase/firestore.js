import { firestore } from "./firebase";

export async function createUserProfileDocument(user, notes = []) {
  if (!user) return null; //onAuthStateChanged gives user null at signout
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  //if no profile exists for this user, create one
  if (!snapshot.exists) {
    const createdAt = new Date();
    const { displayName, email, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        notes,
      });
    } catch (e) {
      console.error("Error creating user", e.message);
    }
  }
  return getUserDocument(user.uid);
}

export async function getUserDocument(uid) {
  if (!uid) return null;
  try {
    const documentData = await firestore.doc(`users/${uid}`).get();
    console.log("documentData: ", documentData);
    return { uid, ...documentData.data() };
  } catch (e) {
    console.error("Error get user document", e.message);
  }
}

export async function updateUserNotes(user, notes) {
  if (!user) return null;
  try {
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (snapshot.exists) {
      userRef.update({ notes });
    }
  } catch (e) {}
}
