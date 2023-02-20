import { auth, db, storage } from "../../firebase/config";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,where, query,orderBy
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { async } from "@firebase/util";
import {
    updateEmail, updatePassword, updateProfile
} from "firebase/auth";


const AccountCollectionRef = collection(db, "users");
class AccountDataService {

    deleteAccount = (id) => {
        const AccountDoc = doc(AccountCollectionRef, id);
        return deleteDoc(AccountDoc);
    };

    getAllAccounts = () => {
        return getDocs(AccountCollectionRef);
    };
    updateAccounts = async (id, account) => {
        const AccountDoc = doc(AccountCollectionRef, id);
        return updateDoc(AccountDoc, account)
    }
    getAccount = (id) => {
        const AccountDoc = doc(AccountCollectionRef, id);
        return getDoc(AccountDoc);
    };
    getAllAccountsASC = () => {
        return getDocs(query(AccountCollectionRef, orderBy('name', 'asc')));
    };
    getAllAccountsDESC = () => {
        return getDocs(query(AccountCollectionRef, orderBy('name', 'desc')));
    };

}

export default new AccountDataService();