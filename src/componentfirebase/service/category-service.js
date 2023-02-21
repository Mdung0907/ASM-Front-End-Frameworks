import { db, storage } from "../../firebase/config";

import {
    collection,
    getDocs,
    addDoc,

} from "firebase/firestore";

const CategoryCollectionRef = collection(db, "category");
class CategoryDataService {
    addproduct = (name) => {
        try {
            return addDoc(CategoryCollectionRef, {
                name: name
            });
        } catch (error) {
            alert(error.message)
        }

    };
    getAllCategorys = () => {
        return getDocs(CategoryCollectionRef);
    };

}

export default new CategoryDataService();