import React, { useEffect } from "react";
import styles from './board.module.css';
import { useParams } from "react-router-dom";

function Board ({setCategory}) {
    const {bname} = useParams();

    useEffect(() => {  
        setCategory(bname);
    }, [bname, setCategory]);


    return (
        <div className={styles.container}>
            <div className={styles.pc_board}>
                PC 게시판
            </div>
            <div className={styles.mobile_board}>
                모바일 게시판
            </div>
        </div>
    )
}

export default Board;