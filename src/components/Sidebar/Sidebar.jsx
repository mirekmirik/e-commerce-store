import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from '../../styles/Sidebar.module.css'
import Spinner from "../Spinner/Spinner";


const Sidebar = ({ amount }) => {

    // const {list} = useSelector(({categories}) => categories)
    const { list, isLoading } = useSelector(({ categories }) => categories)
    const filterList = list.filter((_, i) => i < amount);


    return (
        <section className={styles.sidebar}>
            <div className={styles.title}>CATEGORIES</div>
            <nav>
                <ul className={styles.menu}>
                    {isLoading && <Spinner />}
                    {filterList.map(({ name, id }) => (
                        <li key={id}>
                            <NavLink to={`/categories/${id}`}
                                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                            >{name}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.footer}>
                <a href="/help" target="_blank" className={styles.link}>Help</a>
                <a href="/terms" target="_blank" className={styles.link} style={{ textDecoration: "underline" }}>Terms & Coditions</a>
            </div>
        </section >
    );
}

export default Sidebar;
