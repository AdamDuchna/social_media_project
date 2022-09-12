import '../../styling/posts/PostForm.css'
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState } from 'react';
import Picker from 'emoji-picker-react';
const PostForm = ({user}) => {
    const [status,setStatus] = useState(false);
    const [text,setText] = useState('');
    const [showEmojis,setShowEmojis] = useState(false);
    const [image,setImage] = useState()
    return ( 
    <div className={`post-form ${status}`}>
        { !status ? 
        <>
            { user && user.image ? <img></img> : <img className="user-icon" src="/default-avatar.png"></img> } 
            <button onClick={()=>{setStatus(!status)}} className="post-form-view">
            {`What's on your mind, ${user ? user.first_name : "wait who are you"}?`}
            </button>
        </>
        : 
        <div className='post-form-full-view'>
            <div className='user-info-box'>
                { user && user.image ? <img></img> : <img className="user-icon" src="/default-avatar.png"></img> } 
                <div className='user-fullname'>{ user ? <>{user.first_name} {user.last_name}</> : "User Missing"}</div>
            </div>
            <div className='content'>
                <form>
                    <div>
                        <TextareaAutosize  
                        placeholder={`What's on your mind, ${user ? user.first_name : "wait who are you"}?`} 
                        spellCheck="false" required maxRows="20" minRows="1" onChange={e=>{setText(e.target.value)}} />
                        <img onClick={()=>(setShowEmojis(!showEmojis))} className="smiley" src='/smiley.png'></img>
                        { showEmojis ? <div className="emoji-picker"><Picker pickerStyle={{ width: '300px', height: '280px' }} /></div> : <></>}
                    </div>
                    { image && <img width="100%" className="post-image" src={URL.createObjectURL(image)}></img> }
                    <div className='upload-post-box'>
                        <label htmlFor="inputTag">
                            <img className="upload" src="/upload.png"></img>
                            <input onChange={e=>{setImage(e.target.files[0])}} id="inputTag" type="file"/>
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