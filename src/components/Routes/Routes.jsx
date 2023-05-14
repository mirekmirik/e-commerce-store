import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../Home/Home'
import { ROUTES } from '../../utils/routes'
import SingleProduct from '../Products/SingleProduct'
import Profile from '../Profile/Profile'
import SingleCategory from '../Categories/SingleCategory'
import Cart from '../Cart/Cart'
import Favourites from '../Favourites/Favourites'
import CreateProduct from '../Products/CreateProduct/CreateProduct'
import ListCreatedProduct from '../Products/ListCreatedProducts/ListCreatedProduct'
import UpdateProduct from '../Products/UpdateProduct/UpdateProduct'


const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.FAVOURITES} element={<Favourites />} />
            <Route path={ROUTES.CREATE_PRODUCT} element={<CreateProduct />} />
            <Route path={ROUTES.CREATED_PRODUCT} element={<ListCreatedProduct />} />
            <Route path={ROUTES.UPDATE_PRODUCT} element={<UpdateProduct />} />
        </Routes>
    )
}

export default AppRoutes