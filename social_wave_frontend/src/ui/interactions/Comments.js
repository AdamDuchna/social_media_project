import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';
const Comments = ({replacePost,comments, post_id, user}) => {
    const navigate = useNavigate()
    const [showComments,setShowComments] = useState(false)
    const [comment,setComment] = useState()
    const commentPost = ()=>{
        axios
        .post('http://localhost:5000/posts/comment',{post_id: post_id, user_id: user._id, comment: comment})
        .then(res=>replacePost(res.data))
        .catch(err=>console.log(err))
    }
    const handleEnter = (e) => { if(e.key === 'Enter') commentPost()}
    return (
        <>
        <div className="comment-box">
            <div className="comment-text" onClick={()=>{setShowComments(!showComments)}}>{ comments.length === 0 ? "Comment" : `${comments.length} Comments` }</div>
        </div>
        { showComments ? <div className={`comment-bottom ${showComments}`}>
            <div className="comment-input" >
                <div className="user-icon">{ user && user.image ? <img src={user.image} onClick={()=>{navigate(`${user.username}`)}}></img> : <img  src="/default-avatar.png" onClick={()=>{navigate(`${user.username}`)}}></img> }</div>
                <TextareaAutosize value={comment} onKeyDown={handleEnter} placeholder="Write a comment..."
                spellCheck="false" required maxRows="20" minRows="1" onChange={e=>setComment(e.target.value)} />
            </div>
            { comments && comments.map( comment =>(
                <div>
                    <div className="comment-owner" onClick={()=>{navigate(`${comment.owner.username}`)}}>
                    <div className="user-icon">{ comment.owner && comment.owner.image ? <img src={`${comment.owner.image}`} ></img> : <img src="/default-avatar.png"></img> } </div>
                    <div className="comment-data">
                        <div onClick={()=>{navigate(`${comment.owner.username}`)}} className='name'>{comment.owner.first_name} {comment.owner.last_name}</div>
                        <div className="text">{comment.text}</div>
                    </div>
                    </div>
                </div>
            ))}
        </div> : <></> }
        </>
    )
}

export default Comments;