import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../../styling/posts/PostList.css';
import '../../styling/interactions/Comments.css'
import '../../styling/interactions/Likes.css';
import Comments from "../interactions/Comments";
import Likes from "../interactions/Likes";
import prettyDate from "../../pretty";
const PostList =({posts,replacePost,getPosts, user}) =>{
    const navigate = useNavigate()
    useEffect(()=>{if(!posts){getPosts()}})
    return(
        <div className="post-wrapper">
            { posts && posts.map(post=>
            (<div key={post._id} className='post-box'>
                <div className="owner-info">
                    <div className="user-icon" onClick={()=>{navigate(`/${post.owner.username}`) }}>
                    { post.owner && post.owner.image ? <img src={`${post.owner.image}`} ></img> : <img src="/default-avatar.png"></img> } 
                    </div>
                    <div className="name" onClick={()=>{navigate(`/${post.owner.username}`) }}>{post.owner.first_name} {post.owner.last_name}</div>
                    { post.creationDate && <div className="date">{prettyDate(post.creationDate)}</div>}
                </div>
                <div className="post-content">
                    <div>{post.text}</div>
                    <div>{post.image ? <img src={post.image}></img> : <></>}</div>
                </div>
                <div className="post-interactions">
                    <Likes likes={post.likes} replacePost={replacePost} post_id={post._id} user={user}/>
                    <Comments comments={post.comments} replacePost={replacePost} post_id={post._id} user={user}/>
                </div>
            </div>))}
        </div>
    )

}
export default PostList;