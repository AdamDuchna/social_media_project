import axios from "axios";
const ProfileInfo = ({profile,setProfile, uploadFile,user, setUser}) => {
    const followUser = () => {
        axios.post('http://localhost:5000/profile/follow',{user_id: user._id, profile_id: profile._id} )
        .then(res=>{setUser(res.data)})
        .catch(err=>console.log(err))
     }
     const unfollowUser = () => {
        axios.post('http://localhost:5000/profile/unfollow',{user_id: user._id, profile_id: profile._id} )
        .then(res=>{setUser(res.data)})
        .catch(err=>console.log(err))
     }

     const friendRequest = () => {
        axios.post('http://localhost:5000/profile/friend_request',{user_id: user._id, profile_id: profile._id} )
        .then(res=>{setProfile(res.data)})
        .catch(err=>console.log(err))
     }

     const cancelFriendRequest = () => {
        axios.post('http://localhost:5000/profile/cancel_friend_request',{user_id: user._id, profile_id: profile._id} )
        .then(res=>{setProfile(res.data)})
        .catch(err=>console.log(err))
     }

    const confirmFriend = () => {
        axios.post(`http://localhost:5000/friends/add`,{user_id: user._id, profile_id: profile._id})
        .then(res=>{setUser(res.data)})
        .catch(err=>console.log(err))
    }
    const removeFriend = () => {
        axios.post(`http://localhost:5000/friends/remove`,{user_id: user._id, profile_id: profile._id})
        .then(res=>{setUser(res.data.user); setProfile(res.data.profile)})
        .catch(err=>console.log(err))
    }
    const removeRequest = () => {
        axios.post(`http://localhost:5000/profile/cancel_friend_request`,{user_id: profile._id, profile_id: user._id})
        .then(res=>{setUser(res.data)})
        .catch(err=>console.log(err))  
    }
    return (
        <div className="user-info-wrapper">
            <div className="user-background">
                { profile && profile.background ? <img src={`${profile.background}`} ></img> : <div className="background-placeholder"></div> } 
                </div>
            { user && profile && ( profile._id === user._id) &&
            <label htmlFor="inputTag2">
                <div className="upload-wrapper">
                    <img className="upload background" src="/photo-white.png"></img>
                    <div>Change background</div>
                </div>
            <input onChange={(e)=>{uploadFile("background",e.target.files[0])}} id="inputTag2" type="file"/>
                </label> }
            <div className="user-info">
                <div className="user-icon">{ profile && profile.image ? <img src={`${profile.image}`} ></img> : <img src="/default-avatar.png"></img> } </div>
                { user && profile && ( profile._id === user._id) &&
                <label htmlFor="inputTag">
                        <img className="upload" src="/photo.png"></img>
                        <input onChange={(e)=>{uploadFile("image",e.target.files[0])}} id="inputTag" type="file"/>
                </label>}
                <div className="name-wrapper">
                {profile && <div>{profile.first_name} {profile.last_name}</div>}
                {profile && <div className="username">@{profile.username}</div>}
                <div className="friends-count">{profile && <div>{profile.friends.length} friends</div>}</div>
                </div>
                { user && profile && ( profile._id !== user._id) &&
                <div className="interactions-wrapper">

                    { (user && profile && profile.requests.filter( e=> e._id === user._id).length > 0 ) ?
                    <div className="friend-button" onClick={cancelFriendRequest}>Cancel Request</div> :
                    profile.friends.filter(e => e._id === user._id).length > 0 ? 
                    <div className="friend-button" onClick={removeFriend}>Unfriend</div> :
                    user.requests.filter( e=> e._id === profile._id).length > 0 ?
                    <>
                    <div className="friend-button" onClick={confirmFriend}>Confirm</div>
                    <div className="remove-button" onClick={removeRequest}>Remove</div>
                    </>
                    :<div className="friend-button" onClick={friendRequest}>Add Friend</div>}
                    
                    { ( user && profile && user.following.filter( e=> e._id === profile._id ).length > 0) ? 
                    <div className="follow-button" onClick={unfollowUser} >Unfollow</div> :
                    <div className="follow-button" onClick={followUser} >Follow</div> }
                </div>}   
            </div>
        </div>
    )      
}

export default ProfileInfo;