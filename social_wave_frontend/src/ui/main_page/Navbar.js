const Navbar = () => {
    return(
        <div className="navbar">
            <div className="label">
                <img className="logo" src="/logo.png" ></img>
                <img className="name" src="/name.png" ></img>
                <input className="search-bar" placeholder="Search through our website"></input>
            </div>
            <div className="menu">
                <img className="home" src="/home-white.png" ></img>
                <img className="player" src="/player-white.png" ></img>
                <img className="group" src="/group-white.png" ></img>
            </div>
            <div className="right-box">
                <img className="message" src="/message-white.png"></img>
                <div className="user-icon"></div>
                <img className="settings" src="/settings-white.png"></img>
            </div>
        </div>
    )
}
export default Navbar;
