import React from "react";
import styles from './hot.module.css';

function Hot({posts}) {
    return (
        <>
            <div className={styles.header}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id}>
                            {post.title}
                        </div>
                    ))
                )
            : <>Loading...</>
            }
            </div>
        </>
    )
}

export default Hot;