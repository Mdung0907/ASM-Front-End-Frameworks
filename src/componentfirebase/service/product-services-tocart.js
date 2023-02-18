import { db, storage } from "../../firebase/config";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    orderBy, query
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { async } from "@firebase/util";

const ProductCollectionRef = collection(db, "productcart");
class ProductDataServiceCart {
    addproductcart = (name, file, price, category, description, usercreate) => {
        try {
            const storageRef = ref(storage, `images / ${Date.now() + file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    alert(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await addDoc(collection(db, "productcart"), {
                            name: name,
                            downloadURL: downloadURL,
                            price: price,
                            category: category,
                            description: description,
                            quantity:0,
                            status: false,
                            date:new Date,
                            usercreate: usercreate
                        });
                    });
                }
            );
        } catch (error) {
            alert(error.message);
        };
    }

    updateproductcart = (id, name, file, price, category, description, usercreate) => {
        try {
            const storageRef = ref(storage, `images / ${Date.now() + file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    alert(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "productcart", id), {
                            name: name,
                            downloadURL: downloadURL,
                            price: price,
                            category: category,
                            description: description,
                            usercreate: usercreate
                        }
                        );
                    });
                }
            );
        } catch (error) {
            alert(error.message);
        };
    }

    deleteProduct = (id) => {
        const ProductDoc = doc(db, "productcart", id);
        return deleteDoc(ProductDoc);
    };

    getAllproductcart = () => {
        return getDocs(ProductCollectionRef);
    };

    getProduct = (id) => {
        const ProductDoc = doc(db, "productcart", id);
        return getDoc(ProductDoc);
    };
    getAllproductcartdesc = () => {
        return getDocs(query(ProductCollectionRef, orderBy('price', 'desc')));
    };
    getAllproductcartasc = () => {
        return getDocs(query(ProductCollectionRef, orderBy('price', 'asc')));
    };

}

export default new ProductDataServiceCart();