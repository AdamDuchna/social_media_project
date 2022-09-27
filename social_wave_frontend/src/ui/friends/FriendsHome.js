const FriendsHome = ({user,confirmFriend,removeFriend}) =>{

    return(
    <div className="friends-data">
        <div className="title">Friend Requests</div>
        <div className="requests">
            { user && user.requests.length > 0 ? user.requests.map( (req,index) => (
                <div key={req._id} className="request" style={{ 'animationDelay': `${index * 200}ms` }}>
                    <div className="user-icon">{ req && req.image ? <img src={`${req.image}`} ></img> : <img src="/default-avatar.png"></img> }</div>
                    <div className="request-detail">
                        <div>{req.first_name} {req.last_name}</div>
                        <div className="confirm-button" onClick={()=>{confirmFriend(req._id)}}>Confirm</div>
                        <div className="remove-button" onClick={()=>{removeFriend(req._id)}}>Remove</div>
                    </div>
                </div>
            )):
            <></>}
        </div>
    </div>)
}

export default FriendsHome;