import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut, onAuthStateChanged,deleteUser
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref } from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyDpQX1oZoCK_1-uY2qzIx5-VSVlbAwmM5M",
//   authDomain: "mdungapi-71439.firebaseapp.com",
//   projectId: "mdungapi-71439",
//   storageBucket: "mdungapi-71439.appspot.com",
//   messagingSenderId: "639956086060",
//   appId: "1:639956086060:web:072c07d3d63d776bc21089"
// };


const firebaseConfig = {
  apiKey: "AIzaSyAbL0o1sofCre9sWohPEcC14okhzx7-Cys",
  authDomain: "mdung-811dc.firebaseapp.com",
  projectId: "mdung-811dc",
  storageBucket: "mdung-811dc.appspot.com",
  messagingSenderId: "337245016760",
  appId: "1:337245016760:web:d65e5d4fa7038d4f72da4d"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = ('/')
  } catch (err) {
    console.error(err);
    alert('Sai Email hoặc mật khẩu');
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      password: password,
      role: "user"
    });
    window.location.href = ('/login')
  } catch (err) {
    console.error(err);
    alert('Email đã tồn tại');
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Đã gửi mật khẩu mới đến Email của bạn!");
    window.location.href=('/login')
  }
  catch (err) {
    console.error(err);
    alert('Email không tồn tại');
  }
};
const deleteAccount = async (email) => {
  try {
    await deleteUser(email)
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  storage,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout, onAuthStateChanged,deleteAccount
};

