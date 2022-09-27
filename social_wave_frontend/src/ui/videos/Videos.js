import VideoForm from "./VideoForm";
import '../../styling/videos/Videos.css';
const Videos = ({user}) => {
    return(
    <div className="video-wrapper">
        <div className="videos">
        <VideoForm user={user}/>
        </div>
    </div>)
}
export default Videos;