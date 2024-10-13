import { createContext, useState, useEffect } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";


export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // this is commented out because we are using the addCollectionAndDocuments function to add the shop data to the Firestore database.
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    }, []);


    const value = { categoriesMap };

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};

