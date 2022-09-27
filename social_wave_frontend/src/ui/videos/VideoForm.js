import { useState } from "react";
import '../../styling/videos/VideoForm.css';
import TextareaAutosize from 'react-textarea-autosize';
const VideoForm = ({user}) => {
    const [status,setStatus] = useState(undefined);
    const [videoUpload, setVideoUpload] = useState(null);
    const [text,setText] = useState("")

    return ( 
        <div className={`video-form video-form-${status}`}>
        { !status ? 
            <>
            <div className="user-icon">{ user && user.image ? <img src={user.image}></img> : <img className="user-icon" src="/default-avatar.png"></img> }</div>
                <button onClick={()=>{setStatus(!status)}} className="post-form-view">
                {`Got anything to share, ${user ? user.first_name : "wait who are you"}?`}
                </button>
            </> :
            <div className={`video-form-full-view`}>
                    <img src="/arrow.png" className="close-button" onClick={()=>{setStatus(!status)}}></img> 
                    { videoUpload && 
                    <video width="100%" controls className="post-video">
                        <source src={URL.createObjectURL(videoUpload)} type="video/mp4"/>
                    </video> }
                    <TextareaAutosize value={text}
                        placeholder={`Give your creation a title...`} 
                        spellCheck="false" required maxRows="2" minRows="1" onChange={e=>{setText(e.target.value)}} />
                    <div className='user-info-box'>
                        <div className="user-icon">{ user && user.image ? <img src={user.image}></img> : <img className="user-icon" src="/default-avatar.png"></img> }</div>
                        <div className='user-fullname'>{ user ? <>{user.first_name} {user.last_name}</> : "User Missing"}</div>
                    </div>
                    <div className='upload-post-box'>
                        <label htmlFor="inputTag">
                            <img className="upload" src="/upload.png"></img>
                            <input onChange={(e)=>{setVideoUpload(e.target.files[0])}} id="inputTag" type="file"/>
                        </label>
                        <button className={`post-button ${text.length !== 0}`} type="submit">Post</button>
                    </div>
            </div> }
        </div>
        )
}

export default VideoForm;