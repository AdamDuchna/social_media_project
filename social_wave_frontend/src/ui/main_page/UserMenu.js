import { useNavigate } from "react-router-dom";
const UserMenu = ({user}) => {
    const navigate = useNavigate()
    return(
        <div className="user-menu">
            <div>
                { user && user.image ? <img className="user-icon"></img> : <img className="user-icon" src="/default-avatar.png"></img> }
                { user ? <div>{user.first_name} {user.last_name}</div> : <>User Missing</>}
            </div>
            <div onClick={()=>navigate("/friends")}>
                <img className="friends-icon" src="/friends.png"></img>
                <div>Friends</div>
            </div>
            <div onClick={()=>navigate("/groups")}>
                <img className="group-icon"src="/group-blue.png"></img>
                <div>Groups</div>
            </div>
            <div onClick={()=>navigate("/videos")}>
                <img className="shorts-icon" src="/player-blue.png"></img>
                <div>Shorts</div>
            </div>
        </div>
    )
}
export default UserMenu;
