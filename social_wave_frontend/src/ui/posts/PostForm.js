import '../../styling/posts/PostForm.css'
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState } from 'react';
import Picker from 'emoji-picker-react';
const PostForm = ({user}) => {
    const [status,setStatus] = useState(false);
    const [text,setText] = useState('');
    const [showEmojis,setShowEmojis] = useState(false);
    return ( 
    <div className={`post-form ${status}`}>
        { user && user.image ? <img></img> : <img className="user-icon" src="/default-avatar.png"></img> } 
        { !status ? 
        <button onClick={()=>{setStatus(!status)}} className="post-form-view">
        {`What's on your mind, ${user ? user.first_name : "wait who are you"}?`}
        </button>
        : 
        <div className='post-form-full-view'> 
            <div className='user-fullname'>{ user ? <>{user.first_name} {user.last_name}</> : "User Missing"}</div>
            <div className='content'>
                <form>
                <TextareaAutosize  
                placeholder={`What's on your mind, ${user ? user.first_name : "wait who are you"}?`} 
                spellCheck="false" required maxRows="20" minRows="12" onChange={e=>{setText(e.target.value)}} />
                <div>
                    <img onClick={()=>(setShowEmojis(!showEmojis))} className="smiley" src='/smiley.png'></img>
                    { showEmojis ? <div className="emoji-picker"><Picker /></div> : <></>}
                </div>
                <div className='upload-post-box'>
                    <label htmlFor="inputTag">
                        <img className="upload" src="/upload.png"></img>
                        <input id="inputTag" type="file"/>
                    </label>
                    <button className={`post-button ${text.length !== 0}`} type="submit">Post</button>
                </div>
                </form>
            </div>
        </div>
        }
    </div>
    )
}

export default PostForm;