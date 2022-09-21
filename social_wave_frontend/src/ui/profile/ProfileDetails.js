import { useEffect, useState } from "react"

const ProfileDetails = ({profile,profilePosts}) => {
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
            Photos
            <div className="photos-list">{ profilePosts.slice(0,10).map( post => ( post.image && <div key={post._id} className="photo"><img key={post.image} src={post.image}></img> </div>))}</div>
        </div>
        <div className="friends-list">
            Friends
        </div>
        </>) }

    </div>
    )
}

export default ProfileDetails;