import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './dashboard.module.css'

function Dashboard () {
    const [posts, setPosts] = useState([]);

    useEffect(()=> {
        axios.get("/assets/data/posts.json").then((a)=>{
            setPosts(a.data.posts)
        })
    }, [setPosts]);
    
    return (
        <div className={styles.container}> 
            {posts.map((post, idx)=>
            (
            <div className={styles.post_wrap} key={idx}>
                {post.title}
                {post.option["1번"]}
            </div>
            ))}
        </div>
    )
}

export default Dashboard;