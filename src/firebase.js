import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    getAuth,
    signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCk6uB-mXYVhpnatRH2l4zPU9VRWzyO6rU",
  authDomain: "netflix-clone-c5c95.firebaseapp.com",
  projectId: "netflix-clone-c5c95",
  storageBucket: "netflix-clone-c5c95.firebasestorage.app",
  messagingSenderId: "707130451931",
  appId: "1:707130451931:web:a2b151b49a8235061829fe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, signUp, login, logout };