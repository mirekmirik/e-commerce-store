import React from "react"
import { Link } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"
import styles from '../../styles/Categories.module.css'
import Spinner from "../Spinner/Spinner"
const Categories = ({ title, products = [], amount, isLoading }) => {

    const list = products.filter((_, idx) => idx < amount)

    return (
        <section className={styles.section}>
            <h2>{title}</h2>
            <div className={styles.list}>
                {isLoading && <div className={styles.spinner}>
                    <Spinner />
                </div>}
                {list.map(({ id, name, image }) => {
                    return (
                        <Link to={`categories/${id}`} key={id} className={styles.item}>
                            <div className={styles.image} style={{ backgroundImage: `url(${image})` }}></div>
                            <h3 className={styles.title}>{name}</h3>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}


export default Categories