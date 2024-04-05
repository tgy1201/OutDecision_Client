import React from "react";
import styles from './floatingBanner.module.css'
import { Link } from "react-router-dom";

function FloatingBanner() {
    return (
        <div className={styles.container}>
            <Link to="/" className={styles.write_wrap}>
                <div className={styles.write_img}>
                    <img src="/assets/images/write.png" alt="투표작성" />
                </div>
                <div>투표작성</div>
            </Link>
        </div>
    )
}

export default FloatingBanner