import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';



const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} /> {/** The :category is a dynamic route that will match any path that comes after shop/ */}
        </Routes>
    );
};

export default Shop;