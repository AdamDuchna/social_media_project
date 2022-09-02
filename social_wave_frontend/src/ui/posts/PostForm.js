import '../../styling/posts/PostForm.css'
const PostForm = ({user}) => {
    return ( 
    <div className="post-form">
        { user && user.image ? <img></img> : <img className="user-icon" src="/default-avatar.png"></img> } 
        <button className="post-form-view">{`What's on your mind, ${user.first_name}?`}</button>
    </div>
    )
}

export default PostForm;