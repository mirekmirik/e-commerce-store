import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import LOGO from '../../images/logo.svg'
import AVATAR from '../../images/avatar.jpg'
import { useDispatch, useSelector } from "react-redux";
import { logoutAccount, logoutUser, toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import Spinner from "../Spinner/Spinner";
import styles from '../../styles/Header.module.css'
import CreateProductSVG from "../Products/CreateProduct/CreateProductSVG";


const valuesByDefault = { "name": "Guest", "avatar": AVATAR }

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { currentUser, cart, favourites } = useSelector(({ user }) => user)

    const [values, setValues] = useState(valuesByDefault)
    const [searchValue, setSearchValue] = useState("")


    const { data, isLoading } = useGetProductsQuery({ title: searchValue })



    useEffect(() => {
        setValues(currentUser || valuesByDefault)
    }, [currentUser])


    const showFormHandler = () => {
        if (!currentUser) {
            dispatch(toggleForm(true));
            return
        } else {
            navigate(ROUTES.PROFILE)
        }
    }

    const logoutHandler = () => {
        if (currentUser) {
            dispatch(logoutUser())
            // dispatch(logoutAccount())
        }
    }

    const handleSearch = ({ target: { value } }) => {
        setSearchValue(value)
    }


    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="LOGO" />
                </Link>
            </div>

            <div className={styles.info}>
                <div className={styles.user} onClick={showFormHandler}>
                    <div className={styles.avatar} style={{ backgroundImage: `url(${values?.avatar})` }}></div>
                    <div className={styles.username}>{values?.name}</div>
                </div>
                {currentUser && <div className={styles.user} onClick={logoutHandler}>
                    <div>Logout</div>
                </div>}

                <form className={styles.form}>
                    <div className={styles.icon}>
                        <svg className="icon">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}></use>
                        </svg>
                    </div>
                    <div className={styles.input}>
                        <input
                            type="search"
                            name="search"
                            placeholder="Search for anything..."
                            autoComplete="off"
                            onChange={handleSearch}
                            value={searchValue} />
                    </div>
                    {searchValue && <div className={styles.box}>
                        {isLoading ? <Spinner /> : !data.length ? "No results" : (
                            data.map(({ title, images, id }) => {
                                return (
                                    <Link key={id} onClick={() => setSearchValue('')} className={styles.item} to={`/products/${id}`}>
                                        <div className={styles.image} style={{ backgroundImage: `url(${images[0]})` }}>
                                        </div>
                                        <div className={styles.title}>{title}</div>
                                    </Link>
                                )
                            })
                        )}
                    </div>}
                </form>
                <div className={styles.account}>

                    {currentUser && <Link to={ROUTES.CREATE_PRODUCT} className={styles.favourites}>
                        {/* <CreateProductSVG /> */}
                        <CreateProductSVG />

                        {/* <span className={styles.count}>{cart.length}</span> */}

                    </Link>}

                    <Link to={ROUTES.FAVOURITES} className={styles.favourites}>
                        <svg className={styles['icon-fav']}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`}></use>
                        </svg>
                        {favourites.length && (
                            <span className={styles.count}>{favourites.length}</span>
                        )}
                        {/* <span className={styles.count}>{cart.length}</span> */}

                    </Link>

                    <Link to={ROUTES.CART} className={styles.cart}>
                        <svg className={styles['icon-cart']}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`}></use>
                        </svg>

                        {cart.length && (
                            <span className={styles.count}>{cart.length}</span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
