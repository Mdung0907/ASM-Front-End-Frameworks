import { db, storage } from "../../firebase/config";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    orderBy, query, where
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { async } from "@firebase/util";
import { toast } from "react-toastify";

const ProductCollectionRef = collection(db, "products");
const Category = collection(db, "category");
class ProductDataService {
    addProducts = (name, file, price, category, description, usercreate) => {
        try {
            const storageRef = ref(storage, `images / ${Date.now() + file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    toast.error(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await addDoc(collection(db, "products"), {
                            name: name,
                            downloadURL: downloadURL,
                            price: price,
                            category: category,
                            description: description,
                            usercreate: usercreate
                        });
                    });
                }
            );
        } catch (error) {
            alert(error.message);
        };
    }
    updateProductsmoi = (id, newProduct, file) => {
        if (file == '') {
            try {

                return (updateDoc(doc(db, "products", id), {
                    name: newProduct.name,
                    downloadURL: newProduct.downloadURL,
                    price: newProduct.price,
                    category: newProduct.category,
                    description: newProduct.description,
                    usercreate: newProduct.usercreate
                }))

            }
            catch (error) {
                alert(error.message);
            };
        } else {
            try {
                const storageRef = ref(storage, `images / ${Date.now() + file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    (error) => {
                        alert(error.message);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, "products", id), {
                                name: newProduct.name,
                                downloadURL: downloadURL,
                                price: newProduct.price,
                                category: newProduct.category,
                                description: newProduct.description,
                                usercreate: newProduct.usercreate
                            })
                        });
                    }
                );
            } catch (error) {
                alert(error.message);
            };
        }

    }

    deleteProduct = (id) => {
        const ProductDoc = doc(db, "products", id);
        return deleteDoc(ProductDoc);
    };

    getAllProducts = () => {
        return getDocs(ProductCollectionRef);
    };
    getProductswithcategory = (cate) => {
        return getDocs(query(ProductCollectionRef, where("category", "==", cate)));
    };
    getcategory = (id) => {
        return getDoc(query(Category), where('id', "==", id));
    };

    getProduct = (id) => {
        const ProductDoc = doc(db, "products", id);
        return getDoc(ProductDoc);
    };
    getProduct2 = (id) => {
        const ProductDoc = doc(db, "products", id);
        return getDocs(query(ProductDoc), where("uid", "==", id));
    };
    getAllProductsdesc = () => {
        return getDocs(query(ProductCollectionRef, orderBy('price', 'desc')));
    };
    getAllProductsasc = () => {
        return getDocs(query(ProductCollectionRef, orderBy('price', 'asc')));
    };

}

export default new ProductDataService();