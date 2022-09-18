import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../posts/PostList";
import axios from "axios";
import '../../styling/main_page/navbar/Navbar.css';
import '../../styling/profile/Profile.css';
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { storage } from '../../firebase';
import {v4} from "uuid"
const Profile = ({user}) => {
    const { username } = useParams();
    const [profile,setProfile] = useState();
    const [profilePosts, setProfilePosts] = useState()
    const [profileDate,setProfileDate] = useState()
    const getProfile= ()=>{
        axios
        .post('http://localhost:5000/profile/find',{username: username})
        .then(res=>{setProfile(res.data.user); setProfilePosts(res.data.posts)})
        .catch(err=>console.log(err))
    }
    const replacePost = ( post ) => {
        const result = profilePosts.reduce( (acc,e)=>{ return e._id === post._id ? [...acc,post] : [...acc,e] } ,[])
        setProfilePosts(result);
    }
    const uploadFile = async (picType,imageUpload) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `${picType}/${imageUpload.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, imageUpload)
        const url = await getDownloadURL(snapshot.ref)
        uploadPicture(picType,url);
      };
    const uploadPicture = (picType,url)=>{
        axios
        .post('http://localhost:5000/profile/image',{ owner: user._id, picType: picType, url: url})
        .then(res=>{setProfile(res.data.user); setProfilePosts(res.data.posts)})
        .catch(err=>{console.log(err)})
    }
    useEffect(()=>{if(profile){setProfileDate( new Date(profile.registrationDate) )}},[profile])
    return (
        <div className="profile">
            <div className="profile-content">
                <div className="user-info-wrapper">
                    <div className="user-background">{ profile && profile.background ? <img src={`${profile.background}`} ></img> : <img></img> } </div>
                    <label htmlFor="inputTag2">
                        <img className="upload background" src="/photo.png"></img>
                        <input onChange={(e)=>{uploadFile("background",e.target.files[0])}} id="inputTag2" type="file"/>
                    </label>
                    <div className="user-info">
                        <div className="user-icon">{ profile && profile.image ? <img src={`${profile.image}`} ></img> : <img src="/default-avatar.png"></img> } </div>
                        <label htmlFor="inputTag">
                                <img className="upload" src="/photo.png"></img>
                                <input onChange={(e)=>{uploadFile("image",e.target.files[0])}} id="inputTag" type="file"/>
                        </label>
                        <div className="name-wrapper">
                        {profile && <div>{profile.first_name} {profile.last_name}</div>}
                        {profile && <div className="username">@{profile.username}</div>}
                        <div className="friends-count">{profile && <div>{profile.friends.length} friends</div>}</div>
                        </div>
                        <div className="interactions-wrapper">
                            <div className="friend-button">Add Friend</div>
                            <div className="follow-button">Follow</div>
                        </div>
                    </div>
                </div>
                <div className="user-data">
                    { profile && profileDate &&(
                    <>
                    <div className="info-box">
                        Info
                        <div className="membership-status">Member since {profileDate.toDateString()}</div>
                    </div>
                    <div className="photos-container">
                        Photos
                        <div className="photos-list">{ profilePosts.slice(0,10).map( post => ( <div className="photo"><img key={post.image} src={post.image}></img> </div>))}</div>
                    </div>
                    <div className="friends-list">
                        Friends
                    </div>
                    </>) }

                </div>
                <div className="owner-posts">
                    <PostList posts={profilePosts} 
                    user={user} getPosts={getProfile} 
                    replacePost={replacePost}></PostList>
                </div>
            </div>
        </div>
    )
}

export default Profile;