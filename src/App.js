
import './App.css';
import Header from './Component/Header'
import Footer from './Component/Footer'
import React from 'react'
import {
  Routes, Router, Route, BrowserRouter

} from "react-router-dom";
import Login from './componentfirebase/Account/Login'
import Register from './componentfirebase/Account/Register'
import NoPage from './Component/NoPage';
import Posts from './Component/HomeProduct';
import PostDetail from './Component/Detail';
import ManageMent from './componentfirebase/Product/ManagementProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useRef } from "react";
import Information from './componentfirebase/Account/Infomation';
import { onAuthStateChanged, auth, db } from './firebase/config'
import {
  query,
  getDocs,
  collection,
  where,
} from "firebase/firestore";
import './Component/Infomation.css'
import ManageMentUser from './componentfirebase/Account/ManagementUser';
import Cart from './componentfirebase/cart/cart';
import FormForgot from './componentfirebase/Account/ForgotPassword';
function App() {
  const [data, setdata] = useState([])
  const log = useRef(true)
  useEffect(() => {
    if (log.current) {
      log.current = false
      onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchUserName(user)
        } else {
          console.log("user is logged out")
        }
      });
    }
  }
    , [])
  const fetchUserName = async (e) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", e?.uid));
      const doc = await getDocs(q);
      const value = doc.docs[0].data();
      value['id'] = doc.docs[0].id;
      setdata(value)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header authen={data} />
      <Routes>
        <Route path='/' element={<Posts emailnow={data} />} />
        <Route path='login' element={<Login />} />
        <Route path='forgotpassword' element={<FormForgot />} />
        <Route path='register' element={<Register />} />
        <Route path="/detail/:id" element={<PostDetail />} />
        <Route path='management' element={<ManageMent current={data}/>} />
        <Route path='infomation' element={<Information currentUser={data} />} />
        <Route path='managementuser' element={<ManageMentUser />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );


}
export default App;
/**json-server --watch db.json */
