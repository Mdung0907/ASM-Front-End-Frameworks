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


const ProductCollectionRef = collection(db, "carts");
class ProductDataServiceCart {
    addproduct = (uid, name, price, category, description, image, usercreate) => {
        try {
            return addDoc(ProductCollectionRef, {
                uid: uid,
                name: name,
                category: category,
                quantity: 1,
                price: price,
                description: description,
                image: image,
                usercreate: usercreate,
            });
        } catch (error) {
            alert(error.message)
        }

    };

    updateproduct = (id, setquantity) => {
        const ProductDoc = doc(db, "carts", id);
        return updateDoc(ProductDoc, {
            quantity: setquantity,
        });
    };

    deleteProduct = (id) => {
        const ProductDoc = doc(db, "carts", id);
        return deleteDoc(ProductDoc);
    };

    getAllproductcart = () => {
        return getDocs(ProductCollectionRef);
    };

    getAllproductcartEmail = (email) => {
        return getDocs(query(ProductCollectionRef, where("usercreate", "==", email)));
    };


    getProduct = (id) => {
        const ProductDoc = doc(db, "carts", id);
        return getDoc(ProductDoc);
    };


}

export default new ProductDataServiceCart();