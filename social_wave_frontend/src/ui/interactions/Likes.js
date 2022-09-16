import axios from "axios";
import { useEffect, useState } from "react";
const Likes = ({replacePost,likes, post_id, user}) => {
    const [viewLikes,setViewLikes] = useState(likes)
    const likePost = ()=>{
        axios
        .post('http://localhost:5000/posts/like',{post_id: post_id, user_id: user._id})
        .then(res=>{replacePost(res.data); setViewLikes(res.data.likes)})
        .catch(err=>console.log(err))
    }
    useEffect(()=>{setViewLikes(likes)},[likes])
    return (
        <div className="like-box">
        <img className="like-icon" src="/like.png" onClick={()=>{likePost()}}></img>
        <div className="like-text">{ viewLikes.length === 0 ? "Like" : viewLikes.length }</div>
        </div>
    )
}

export default Likes;