import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "../Routes/Routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { getCategories } from "../../features/categories/categoriesSlice";
import { getProducts } from '../../features/products/productsSlice'
import UserForm from "../User/UserForm";
function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch])



    return (
        <div className="app">
            <Header />
            <UserForm />
            <div className="container">
                <Sidebar amount={5}/>
                <AppRoutes />
            </div>
            <Footer />
        </div>
    );
}

export default App;
