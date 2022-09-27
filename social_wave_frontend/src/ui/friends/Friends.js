import Navbar from "../main_page/Navbar";
import FriendsHome from "./FriendsHome";
import '../../styling/friends/Friends.css';
import axios from "axios";
import { useState } from "react";
import Wrapper from "./wrapper";
import Friend from "./Friend";

const Components = {
    "Home": FriendsHome,
    "All Friends": Friend,
    "Friend Requests": Friend,
}
const Friends =({setUser, user}) => {
    let [page,setPage] = useState("Home")
    const [person,setPerson] = useState()

    const confirmFriend = (profile_id) => {
        axios.post(`http://localhost:5000/friends/add`,{user_id: user._id, profile_id: profile_id})
        .then(res=>{setUser(res.data)})
        .catch(err=>console.log(err))
    }
    const removeFriend = (profile_id) => {
        axios.post(`http://localhost:5000/friends/remove`,{user_id: user._id, profile_id: profile_id})
        .then(res=>{setUser(res.data)})
        .catch(err=>console.log(err))
    }
    return (
        <div className="friends"> 
            <div className="nav-wrapper"><Navbar setUser={setUser} /></div>
            <div className="friends-wrapper">
                <div className="friends-buttons">
                    { page === "Home" ?
                    <>
                        <div className="title">Friends</div>
                        <div onClick={()=>{setPage("Home"); setPerson()}} className="current">Home</div>
                        <div onClick={()=>{setPage("All Friends"); setPerson()}}>All Friends </div>
                        <div onClick={()=>{setPage("Friend Requests"); setPerson()}}>Friend Requests</div>
                    </>:
                    <>
                        <div className="friends-menu">
                            <img onClick={()=>setPage("Home")} src="/arrow.png" className="arrow"></img>
                            <div>
                                <div className="main">Friends</div>
                                <div className="title">{page}</div>
                            </div>
                        </div>
                        { page === "All Friends" ? 
                        user.friends.map( friend => 
                            (<div key={friend._id} className="friend" onClick={()=>{setPerson(friend.username)}}>
                                <div className="user-icon">{ friend.image ? <img src={`${friend.image}`} ></img> : <img src="/default-avatar.png"></img> } </div>
                                <div>{friend.first_name} {friend.last_name}</div>
                            </div>)):
                        user.requests.map( friend => 
                        (<div key={friend._id} className="friend" onClick={()=>{setPerson(friend.username)}}>
                            <div className="user-icon">{ friend.image ? <img src={`${friend.image}`} ></img> : <img src="/default-avatar.png"></img> } </div>
                            <div>{friend.first_name} {friend.last_name}</div>
                        </div>) )}
                    </> }
                    </div>
                <Wrapper Component={Components[page]} page={page} user={user} setUser={setUser} confirmFriend={confirmFriend} removeFriend={removeFriend} person={person}/>
            </div>
        </div>
    )
}

export default Friends;