
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, getAuth ,signOut} from "firebase/auth";
import { addDoc,collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyClrTbalobXhxsbNAG0swqS07Zcg_5LSD0",
  authDomain: "netflix-clone-ab195.firebaseapp.com",
  projectId: "netflix-clone-ab195",
  storageBucket: "netflix-clone-ab195.appspot.com",
  messagingSenderId: "50867211224",
  appId: "1:50867211224:web:62fb43f355bf9a5d6280ad"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
          uid: user.uid,
          name,
          authProvider: "local",
          email
      })
    } catch (error) {
        console.log(error)
       toast.error(error.code.split("/")[1].split("-").join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }

}

const logout = () => {
    signOut(auth)
}

export { auth, db, signup, login, logout }