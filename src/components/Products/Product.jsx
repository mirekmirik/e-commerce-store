import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import styles from '../../styles/Product.module.css'
import { useDispatch, useSelector } from "react-redux"
import { addItemToCart, addItemToFavourites, toggleForm } from "../../features/user/userSlice"
import UserForm from "../User/UserForm"


const SIZES = [4, 4.5, 5]

const Product = (item) => {

    const { title, description, price, images } = item

    const dispatch = useDispatch()

    const [currentImage, setCurrentImage] = useState()
    const [activeSize, setActiveSize] = useState('')
    const [favouriteItem, setFavouriteItem] = useState(false)
    const [isCreatedProduct, setIsCreatedProduct] = useState(false)

    const { favourites, currentUser } = useSelector(({ user }) => user)
    const { createdProducts } = useSelector(({ products }) => products)





    useEffect(() => {
        if (!images?.length) return;
        setCurrentImage(images[0])

        const favouriteIt = favourites.findIndex(({ id }) => item.id == id)
        const isCreatedProduct = createdProducts.find(({ id }) => item.id == id)
        if (isCreatedProduct) {
            setIsCreatedProduct(true)
        } else {
            setIsCreatedProduct(false)
        }
        if (favouriteIt >= 0) {
            setFavouriteItem(true)
        } else {
            setFavouriteItem(false)
        }

    }, [images, createdProducts])


    const setImageHandler = (img) => {
        setCurrentImage(img)
    }

    const setSizeHandler = (size) => {
        setActiveSize(size)
    }

    let registerForm = null;
    const addToCartHandler = () => {
        if (!currentUser) {
            registerForm = <UserForm />
            dispatch(toggleForm(true))
            return;
        }

        dispatch(addItemToCart({ ...item, size: activeSize }))
    }

    const addToFavouriteHandler = () => {
        dispatch(addItemToFavourites(item))
        setFavouriteItem((prevState) => !prevState)
    }





    return (
        <section className={styles.product}>
            {registerForm}
            <div className={styles.images}>
                <div className={styles.current} style={{ backgroundImage: `url(${currentImage})` }} />
                <div className={styles['images-list']}>
                    {images?.map((image, idx) => {
                        return (
                            <div
                                key={idx}
                                className={styles.image}
                                style={{ backgroundImage: `url(${image})` }}
                                onClick={() => setImageHandler(image)}>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.wrap}>
                    <h1 className={styles.title}>{title}</h1>
                    {isCreatedProduct && <Link to={ROUTES.CREATED_PRODUCT}><p href={ROUTES.CREATED_PRODUCT} className={styles.yourproduct}>Thats your product</p></Link>}
                </div>
                <div className={styles.price}>{price}$</div>
                <div className={styles.color}>
                    <span>Color:</span> Green
                </div>
                <div className={styles.sizes}>
                    <span>Sizes:</span>
                    <div className={styles.list}>
                        {SIZES.map((size) => {
                            return (
                                <div
                                    onClick={() => setSizeHandler(size)}
                                    className={`${styles.size} ${activeSize === size ? styles.active : ''}`}
                                    key={size}>{size}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.description}>
                    {description}
                </div>
                <div className={styles.actions}>
                    <button className={styles.add} disabled={!activeSize} onClick={addToCartHandler}>Add to cart</button>
                    {/*  */}
                    <button className={`${styles.favourite} ${favouriteItem ? styles.active : ''}`} onClick={addToFavouriteHandler}>Add to favourite</button>

                </div>

                <div className={styles.bottom}>
                    <div className={styles.purchase}>19 people purchase</div>
                    <Link className={ROUTES.HOME}>Return to store</Link>
                    {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est minima alias vitae sequi facilis repudiandae maxime fugit voluptatibus, nihil nam culpa itaque inventore quibusdam! Quae tenetur deleniti vero possimus consectetur. */}
                </div>



            </div>
        </section>
    )
}

export default Product