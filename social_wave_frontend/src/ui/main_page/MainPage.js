import Navbar from "./Navbar";
import UserMenu from "./UserMenu";
import '../../styling/main_page/navbar/Navbar.css';
import '../../styling/main_page/Mainpage.css';
import '../../styling/main_page/user_menu/UserMenu.css'
import '../../styling/posts/PostForm.css'


const MainPage = ({user,Component}) => {
    return(
        <div className="mainpage">
            <div className="nav-wrapper"><Navbar/></div>
            <div className="content-wrapper">
            <UserMenu user={user}/>
            <Component user={user}/>
            </div>
        </div>
    )
}
export default MainPage;
