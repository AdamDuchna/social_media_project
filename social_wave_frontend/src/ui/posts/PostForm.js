import '../../styling/posts/PostForm.css'
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState } from 'react';
import Picker from 'emoji-picker-react';
import axios from "axios";
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid"

const PostForm = ({user}) => {
    const [status,setStatus] = useState(undefined);
    const [text,setText] = useState('');
    const [showEmojis,setShowEmojis] = useState(false);
    const [imageUpload, setImageUpload] = useState(null);
    
    const uploadFile = async () => {
      if (imageUpload ===  null){uploadPost()}
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload)
      .then((snapshot) => { getDownloadURL(snapshot.ref).then((url) => { uploadPost(url); }); });
    };
    const uploadPost = ( url ) =>{
        axios
        .post('http://localhost:5000/posts/post',{ owner: user,text: text, image: url })
        .then(res=>{console.log(res)})
        .catch(err=>{console.log(err)})
        document.location.reload();
    }

    const handleSubmit = (e) => { uploadFile(); e.preventDefault()}
    const onEmojiClick = (event, emojiObject) => {setText(text+emojiObject.emoji)};

    return ( 
    <div className={`post-form post-form-${status}`}>
        { !status ? 
        <>
           <div className="user-icon">{ user && user.image ? <img src={user.image}></img> : <img className="user-icon" src="/default-avatar.png"></img> }</div>
            <button onClick={()=>{setStatus(!status)}} className="post-form-view">
            {`What's on your mind, ${user ? user.first_name : "wait who are you"}?`}
            </button>
        </>
        : 
        <div className='post-form-full-view'>
            <div className='close-button' onClick={()=>{setStatus(!status)}}>X</div>
            <div className='user-info-box'>
                <div className="user-icon">{ user && user.image ? <img src={user.image}></img> : <img className="user-icon" src="/default-avatar.png"></img> }</div>
                <div className='user-fullname'>{ user ? <>{user.first_name} {user.last_name}</> : "User Missing"}</div>
            </div>
            <div className='content'>
                <form onSubmit={handleSubmit}>
                    <div className='text-box'>
                        <TextareaAutosize value={text}
                        placeholder={`What's on your mind, ${user ? user.first_name : "wait who are you"}?`} 
                        spellCheck="false" required maxRows="20" minRows="1" onChange={e=>{setText(e.target.value)}} />
                        <img onClick={()=>(setShowEmojis(!showEmojis))} className="smiley" src='/smiley.png'></img>
                        { showEmojis ? 
                        <div className="emoji-picker">
                            <Picker className="picker" pickerStyle={{ width: '300px', height: '280px' }} onEmojiClick={onEmojiClick} />
                        </div>
                        : <></>}
                    </div>
                    { imageUpload && <img width="100%" className="post-image" src={URL.createObjectURL(imageUpload)}></img> }
                    <div className='upload-post-box'>
                        <label htmlFor="inputTag">
                            <img className="upload" src="/upload.png"></img>
                            <input onChange={(e)=>{setImageUpload(e.target.files[0])}} id="inputTag" type="file"/>
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