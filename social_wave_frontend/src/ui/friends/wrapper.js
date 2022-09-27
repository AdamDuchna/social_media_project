const Wrapper = ({Component, user,setUser ,confirmFriend ,removeFriend, person }) =>{
    
    return (
        <>< Component user={user} setUser={setUser} confirmFriend={confirmFriend} removeFriend={removeFriend} person={person}/></>
    )
}
export default Wrapper;