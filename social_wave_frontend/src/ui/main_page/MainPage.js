
import UserMenu from "./UserMenu";
import '../../styling/main_page/Mainpage.css';
import '../../styling/main_page/user_menu/UserMenu.css'
import '../../styling/posts/PostForm.css'
import '../../styling/main_page/navbar/Navbar.css';
import Navbar from "./Navbar";


const MainPage = ({posts,setPosts,user,setUser,Component}) => {
    return(
        <>
        <div className="nav-wrapper"><Navbar setUser={setUser} /></div>
        <div className="mainpage">
            <div className="content-wrapper">
            <UserMenu user={user}/>
            <Component user={user} posts={posts} setPosts={setPosts}/>
            </div>
        </div>
        </>
    )
}
export default MainPage;
