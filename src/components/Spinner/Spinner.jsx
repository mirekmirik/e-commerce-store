import React from 'react'
import { ThreeDots } from "react-loader-spinner"
import styles from '../../styles/Spinner.module.css'

const spinnerByDefault = {
    height: 80,
    width: 80,
    radius: 9,
    color: "#4fa94d",
    ariaLabel: "three-dots-loading",
    wrapperStyle: {},
    wrapperClassName: "",
    visible: true
}


const Spinner = (props = spinnerByDefault) => {
    return (
        <div className={styles.wrapper}>
            <ThreeDots
                {...props}
            // height="80"
            // width="80"
            // radius="9"
            // color="#4fa94d"
            // ariaLabel="three-dots-loading"
            // wrapperStyle={{}}
            // wrapperClassName=""
            // visible={true}
            />
        </div>
    )
}

export default Spinner