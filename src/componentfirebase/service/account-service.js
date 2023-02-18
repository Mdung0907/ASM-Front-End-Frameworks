import { auth, db, storage } from "../../firebase/config";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,where, query
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { async } from "@firebase/util";
import {
    updateEmail, updatePassword, updateProfile
} from "firebase/auth";


const AccountCollectionRef = collection(db, "users");
class AccountDataService {

    deleteAccount = (id) => {
        const AccountDoc = doc(db, "users", id);
        return deleteDoc(AccountDoc);
    };

    getAllAccounts = () => {
        return getDocs(AccountCollectionRef);
    };
    updateAccounts = async (id, account) => {
        const AccountDoc = doc(db, "users", id);
        return updateDoc(AccountDoc, account)
    }
    getAccount = (id) => {
        const AccountDoc = doc(db, "users", id);
        return getDoc(AccountDoc);
    };

}

export default new AccountDataService();