import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ProfileDetails = ({profile,profilePosts}) => {
    const navigate = useNavigate()
    const [profileDate,setProfileDate] = useState()
    useEffect(()=>{if(profile){setProfileDate( new Date(profile.registrationDate) )}},[profile])
    return (
    <div className="user-data">
        { profile && profileDate &&(
        <>
        <div className="info-box">
            Info
            <div className="membership-status">Member since {profileDate.toDateString()}</div>
        </div>
        <div className="photos-container">
            <div className="info">
                <div className="title">Photos</div>
                <div>See all photos</div>
            </div>
            { profilePosts.length > 0 ? 
            <div className="photos-list">
                { profilePosts.slice(0,10).map( post => ( post.image && <div key={post._id} className="photo"><img key={post.image} src={post.image}></img> </div>))}
            </div> :
            <div className="photo-placeholder">Nothing here yet...</div> }
        </div>
        <div className="friends-list">
            <div className="info">
                <div className="title">Friends</div>
                <div>See all friends</div>
            </div>
            <div className="friends-flexbox">
                {
                profile.friends.length > 0 ? profile.friends.map(friend => (
                    <div key={friend._id} className="friend" onClick={()=>{navigate(`/${friend.username}`)}}> 
                        <div className="user-icon">{ friend.image ? <img src={`${friend.image}`} ></img> : <img src="/default-avatar.png"></img> } </div>
                        <div>{friend.first_name} {friend.last_name}</div>
                    </div>)) : 
                <div>Nothing here yet... </div>}
            </div>
        </div>
        </>) }

    </div>
    )
}

export default ProfileDetails;