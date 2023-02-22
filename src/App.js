
import './App.css';
import Header from './componentfirebase/Home/Header'
import Footer from './componentfirebase/Home/Footer'
import React, { useReducer } from 'react'
import {
  Routes, Router, Route, BrowserRouter

} from "react-router-dom";
import Login from './componentfirebase/Account/Login'
import Register from './componentfirebase/Account/Register'
import NoPage from './componentfirebase/Home/NoPage';
import Posts from './componentfirebase/Home/HomeProduct';
import PostDetail from './componentfirebase/Home/Detail';
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
import ManageMentUser from './componentfirebase/Account/ManagementUser';
import Cart from './componentfirebase/cart/cart';
import FormForgot from './componentfirebase/Account/ForgotPassword';
import { ACTION } from './Support/const';
import { CartContext } from './Support/context';
import Historypay from './componentfirebase/cart/historypay';
import ManagementPay from './componentfirebase/cart/managementPay';


const listid = {
  id: ''
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.GETID_CATEGORY: {
      const { id = {} } = action.payload
      return {
        id:id
      };
    }
    default:
      return state;
  }
}


function App() {
  const [data, setdata] = useState([])
  const [state, dispatch] = useReducer(reducer, listid);
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
       <CartContext.Provider
          value={{
            cartReducer: state,
            cartDispatch: dispatch,
          }}
        >
      <Header authen={data} />
      <Routes>
        <Route path='/' element={<Posts currentUser={data} />} />
        <Route path='login' element={<Login />} />
        <Route path='forgotpassword' element={<FormForgot />} />
        <Route path='register' element={<Register />} />
        <Route path="/detail/:id" element={<PostDetail currentUser={data} />} />
        <Route path='management' element={<ManageMent current={data} />} />
        <Route path='infomation' element={<Information currentUser={data} />} />
        <Route path='managementuser' element={<ManageMentUser current={data}/>} />
        <Route path='cart' element={<Cart currentUser={data} />} />
        <Route path='historypay' element={<Historypay currentUser={data} />} />
        <Route path='managementPay' element={<ManagementPay currentUser={data} />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
      </CartContext.Provider>
    </div>
  );


}
export default App;
/**json-server --watch db.json */
