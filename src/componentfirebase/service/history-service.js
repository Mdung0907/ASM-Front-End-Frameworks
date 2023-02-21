import { db, storage } from "../../firebase/config";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    orderBy, query, where,
} from "firebase/firestore";


const ProductCollectionRef = collection(db, "historypay");
class ProductDataServiceHistory {
    addproduct = (uid, name, price, category,quantity, description, image, usercreate) => {
        try {
            return addDoc(ProductCollectionRef, {
                uid: uid,
                name: name,
                category: category,
                quantity: quantity,
                price: price,
                description: description,
                image: image,
                usercreate: usercreate,
                datepay:new Date().toLocaleString(),
            });
        } catch (error) {
            alert(error.message)
        }

    };

    getAllproductHistory = () => {
        return getDocs(query(ProductCollectionRef));
    };
    getAllproductHistoryEmail = (email) => {
        return getDocs(query(ProductCollectionRef, where("usercreate", "==", email)));
    };



}

export default new ProductDataServiceHistory();