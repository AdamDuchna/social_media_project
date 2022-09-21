import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../posts/PostList";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { storage } from '../../firebase';
import {v4} from "uuid";
import Navbar from "../main_page/Navbar";
import ProfileInfo from "./ProfileInfo";
import ProfileDetails from "./ProfileDetails";
import '../../styling/main_page/navbar/Navbar.css';
import '../../styling/profile/Profile.css';
import '../../styling/profile/ProfileInfo.css';
import '../../styling/profile/ProfileDetails.css';

const Profile = ({user, setUser}) => {
    const { username } = useParams();
    const [profile,setProfile] = useState();
    const [profilePosts, setProfilePosts] = useState()

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
    useEffect(()=>{window.scrollTo(0,0)},[])
    return (
        <>
        <div className="nav-wrapper"><Navbar setUser={setUser} /></div>
        <div className="profile">
            <div className="profile-content">
                <ProfileInfo profile={profile} uploadFile={uploadFile} user={user} setUser={setUser}/>
                <ProfileDetails profile={profile} profilePosts={profilePosts} />
                <div className="owner-posts">
                    <PostList posts={profilePosts} 
                    user={user} getPosts={getProfile} 
                    replacePost={replacePost}></PostList>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;