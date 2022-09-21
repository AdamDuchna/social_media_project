import axios from "axios";
import { useEffect, useState } from "react";
const CommentsLike = ({replacePost,likes, post_id, user, comment_id}) => {
    const [viewLikes,setViewLikes] = useState(likes)
    const likePost = ()=>{
        axios
        .post('http://localhost:5000/comments/like',{post_id: post_id, user_id: user._id, comment_id: comment_id})
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

export default CommentsLike;