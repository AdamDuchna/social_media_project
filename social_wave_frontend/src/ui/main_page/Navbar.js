import { Link } from "react-router-dom";
const Navbar = ({setUser}) => {
    return(
        <div className="navbar">
            <div className="label">
                <Link to="/"><img className="logo" src="/logo.png" ></img></Link>
                <Link to="/"><img className="name" src="/name.png" ></img></Link>
                <div className="search-box">
                    <input className="search-bar" spellCheck="false" placeholder="Search through our website"></input>
                    <img className="search" src="/search.png" ></img>
                </div>
            </div>
            <div className="menu">
                <Link to="/"><img className="home" src="/home.png" ></img></Link>
                <Link to="/videos"><img className="player" src="/player.png" ></img></Link>
                <Link to="/groups"><img className="group" src="/group.png" ></img></Link>
            </div>
            <div className="right-box">
                <img className="message" src="/message.png"></img>
                <Link to="/login" onClick={()=>setUser()}><img className="logout" src="/logout.png"></img></Link>
            </div>
        </div>
    )
}
export default Navbar;
