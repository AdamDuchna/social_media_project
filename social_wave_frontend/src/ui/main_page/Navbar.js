const Navbar = () => {
    return(
        <div className="navbar">
            <div className="label">
                <img className="logo" src="/logo.png" ></img>
                <img className="name" src="/name.png" ></img>
                <div className="search-box">
                    <input className="search-bar" spellcheck="false" placeholder="Search through our website"></input>
                    <img className="search" src="/search.png" ></img>

                    </div>
            </div>
            <div className="menu">
                <img className="home" src="/home.png" ></img>
                <img className="player" src="/player.png" ></img>
                <img className="group" src="/group.png" ></img>
            </div>
            <div className="right-box">
                <img className="message" src="/message.png"></img>
                <div className="user-icon"></div>
                <img className="settings" src="/settings.png"></img>
            </div>
        </div>
    )
}
export default Navbar;
