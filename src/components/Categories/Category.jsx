import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
// import { getAllProductsByCategory } from '../../features/categories/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../../styles/Category.module.css'
import Spinner from '../Spinner/Spinner'
import { useGetProductsQuery } from '../../features/api/apiSlice'
import Products from '../Products/Products'
import { throttle } from 'lodash'

const Category = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const defaultValues = {
        title: "",
        price_min: 0,
        price_max: 0,
    }

    const defaultParams = {
        categoryId: id,
        limit: 5,
        offset: 0,
        ...defaultValues
    }

    const [isEnd, setIsEnd] = useState(false)
    const [items, setItems] = useState([])
    const [params, setParams] = useState(defaultParams)
    const [values, setValues] = useState(defaultValues)
    const [isScrolling, setIsScrolling] = useState(false);

    const loadMoreRef = useRef(null);

    const { data = [], isLoading, isSuccess } = useGetProductsQuery(params)
    const { category: { name } } = data?.[0] || { category: { name: 'Shoes' } };





    useEffect(() => {

        if (!id) return;

        if (id > 5) {
            navigate('/')
        }

        setItems([])
        setIsEnd(false)
        setValues(defaultValues)
        setParams(defaultParams)
    }, [id])

    useEffect(() => {
        const handleScroll = () => {

            const scrollPosition = window.innerHeight + window.scrollY;
            const heightOfPage = document.documentElement.scrollHeight;

            if (scrollPosition >= heightOfPage - 10 && !isLoading && !isEnd & !isScrolling) {

                setIsScrolling(true);
                setParams((prevState) => ({
                    ...prevState,
                    offset: prevState.offset + prevState.limit,
                }));
            }

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isEnd, isLoading, isScrolling]);




    useEffect(() => {
        if (isLoading) return;
        if (!data.length) {
            setIsEnd(true)
            return
        }
        setIsScrolling(false);


        setItems((prevState) => [...prevState, ...data])
    }, [data, isLoading])


    const handleChange = ({ target: { value, name } }) => {
        setValues((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setItems([])
        setIsEnd(false)
        setParams({ ...defaultParams, ...values })
    }

    const handleReset = () => {
        setValues(defaultValues)
        setParams(defaultParams)
        setIsEnd(false)
    }


    return (
        <section className={styles.wrapper} >

            <h2 className={styles.title}>{name}</h2>
            <form className={styles.filters} onSubmit={handleSubmit}>
                <div className={styles.filter}>
                    <input type="text" name='title' placeholder='Product name' onChange={handleChange} value={values.title} />
                </div>
                <div className={styles.filter}>
                    <input type="number" name='price_min' placeholder='0' onChange={handleChange} value={values.price_min} />
                    <span>Price from</span>
                </div>
                <div className={styles.filter}>
                    <input type="number" name='price_max' placeholder='100' onChange={handleChange} value={values.price_max} />
                    <span>Price to</span>
                </div>


                <button type="submit" hidden></button>
            </form>

            {isLoading && <Spinner />}
            {!isSuccess || !items.length ?
                <div className={styles.back}>
                    <span>No results...</span>
                    <button onClick={handleReset}>Reset</button>
                </div> : (<Products products={items} style={{ padding: 0 }} amount={items.length} />)}
            <div className='see-more' ref={loadMoreRef}></div>
            {/* {!isEnd && (
                <div className={styles.more}>
                    <button onClick={() => setParams((prevState) => ({ ...prevState, offset: params.offset + params.limit }))}>See more</button>
                </div>
            )} */}

        </section>
    )
}

export default Category

