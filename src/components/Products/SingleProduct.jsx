import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useGetProductQuery } from "../../features/api/apiSlice"
import { ROUTES } from "../../utils/routes"
import Product from "./Product"
import { useDispatch, useSelector } from "react-redux"
import { getProduct, getRelatedProducts } from "../../features/products/productsSlice"
import Products from "./Products"
import Spinner from "../Spinner/Spinner"


const SingleProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { related, list, product, isLoading } = useSelector(({ products }) => products)

    useEffect(() => {
        dispatch(getProduct(id))
    }, [id, dispatch])



    useEffect(() => {
        if (!product || !list.length) return;
        dispatch(getRelatedProducts(product.category.id))
    }, [product, list.length, dispatch])

    return isLoading ?
        (
            <Spinner />
        )
        : (
            <>
                <Product {...product} /> 
                <Products products={related} amount={5} title="Related Products" />
            </>
        )



}

export default SingleProduct


  // useEffect(() => {
    //     if (!isFetching && !isLoading && !isSuccess) {
    //         navigate(ROUTES.HOME)
    //     }
    // }, [isFetching, isLoading, isSuccess, navigate])