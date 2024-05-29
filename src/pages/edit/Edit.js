import React from "react";
import Write from "../write/Write";
import { useParams } from "react-router-dom";

function Edit () {
    const {postId} = useParams();
    return (
        <Write edit={true} postId={postId}/>
    )
}

export default Edit;