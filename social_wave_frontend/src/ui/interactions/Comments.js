import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';
import CommentsReply from "./CommentsReply";
import CommentsLike from "./CommentsLike";
const Comments = ({replacePost,comments, post_id, user}) => {
    const navigate = useNavigate()
    const [showComments,setShowComments] = useState(false)
    const [comment,setComment] = useState('')
    const [commentCount, setCommentCount ] = useState(0)

    const commentPost = ()=>{
        axios
        .post('http://localhost:5000/posts/comment',{post_id: post_id, user_id: user._id, comment: comment})
        .then(res=>replacePost(res.data))
        .catch(err=>console.log(err))
    }
    const handleEnter = (e) => { if(e.key === 'Enter'){
        e.preventDefault();
        setComment('');
        commentPost(comment)}}
    const countComments = () => {
        var count = 0;
        comments.forEach(e => { count = count + e.comments.length + 1 });
        setCommentCount(count)
    }
    useEffect( countComments , [comments])
    return (
        <>
        <div className="comment-box">
            <div className="comment-text" onClick={()=>{setShowComments(!showComments)}}>{ comments.length === 0 ? "Comment" : `${commentCount} Comments` }</div>
        </div>
        { showComments ? <div className={`comment-bottom ${showComments}`}>
            { comments && comments.map( comment =>(
                <div key={comment._id}>
                    <div className="comment-owner" onClick={()=>{navigate(`/${comment.owner.username}`)}}>
                    <div className="user-icon">{ comment.owner && comment.owner.image ? <img src={`${comment.owner.image}`} ></img> : <img src="/default-avatar.png"></img> } </div>
                    <div className="comment-data">
                        <div onClick={()=>{navigate(`${comment.owner.username}`)}} className='name'>{comment.owner.first_name} {comment.owner.last_name}</div>
                        <div className="text">{comment.text}</div>
                    </div>
                    </div>
                    <div className="sub-interactions">
                    <CommentsLike post_id={post_id} user={user} comment_id={comment._id} replacePost={replacePost} likes={comment.likes}/>
                    <CommentsReply comment_id={comment._id} user={user} replacePost={replacePost} comments={comment.comments} post_id={post_id} />
                    </div>
                </div>
            ))}
            <form className="comment-input" onSubmit={handleEnter}>
                <div className="user-icon">{ user && user.image ? <img src={user.image} onClick={()=>{navigate(`${user.username}`)}}></img> : <img  src="/default-avatar.png" onClick={()=>{navigate(`${user.username}`)}}></img> }</div>
                <TextareaAutosize value={comment} onChange={e=>setComment(e.target.value)} onKeyDown={handleEnter} placeholder="Write a comment..."
                spellCheck="false" required maxRows="20" minRows="1" />
            </form>
        </div> : <></> }
        </>
    )
}

export default Comments;