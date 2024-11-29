
import { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import NotificationModal from "./NotificationModal";
import { useDispatch } from 'react-redux';
import { logout } from "../../../redux/reducers/authSlice";

function Nav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [notificationModalOpen,setNotificationModalOpen ] = useState(false)

  const handleLogout = async () => {
    try{
      const token = localStorage.getItem('refresh')
      console.log(token)
      const res = await api.post('logout', {token})
      localStorage.clear()
      dispatch(logout)
      delete api.defaults.headers.common["Authorization"];
      navigate('/login')

    }
    catch (err) {
      console.log(err)
      localStorage.clear()
      dispatch(logout)
      delete api.defaults.headers.common["Authorization"];
      navigate('/login')
    }
  }

  return (
    <div className="h-20 shadow-sm shadow-sky-600 fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="flex justify-between items-center h-full mx-8">
        <h1 onClick={() => navigate('/')} className="font-bold text-2xl cursor-default">DevHive</h1>

        {/* Hamburger Menu Icon (visible on small screens) */}
        <div className="md:hidden flex items-center" onClick={() => setIsOpen(!isOpen)}>
          <div className="space-y-1 cursor-pointer">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </div>

        {/* Menu Items */}
        <div className={`md:flex space-x-8 mr-8 font-bold hidden ${isOpen ? "block" : "hidden"} md:space-x-8`}>
          <p onClick={() => navigate('/store')} className="cursor-pointer">Store</p>
          <p onClick={() => navigate('/chatpage')} className="text-white cursor-pointer">Chat</p>
          <p onClick={() => navigate('/users')} className="text-white cursor-pointer">Users</p>
          <p onClick={() => navigate('/tags')} className="text-white cursor-pointer">Tags</p>
          <p onClick={() => navigate('/questions')} className="text-white cursor-pointer">Q&A</p>
          <p onClick={() => setNotificationModalOpen(!notificationModalOpen)} className="cursor-pointer">🔔</p>
          <div onClick={() => navigate('/profile')} className="avatar text-white cursor-pointer">profile</div>
          <p className="cursor-pointer" onClick={handleLogout}>Logout</p>
        </div>
      </div>

      {/* Mobile Menu (dropdown) */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-4 text-center bg-black">
          <p onClick={() => navigate('/users')} className="text-white cursor-pointer">Users</p>
          <p onClick={() => navigate('/tags')} className="text-white cursor-pointer">Tags</p>
          <p onClick={() => navigate('/store')} className="cursor-pointer">Store</p>
          <p onClick={() => navigate('/chatpage')} className="text-white cursor-pointer">Chat</p>
          <p onClick={() => navigate('/questions')} className="text-white cursor-pointer">Q&A</p>
          <p onClick={() => {setNotificationModalOpen(!notificationModalOpen); setIsOpen(false)}} className="cursor-pointer">🔔</p>
          <div onClick={() => navigate('/profile')} className="avatar text-white cursor-pointer">profile</div>
          <div className="cursor-pointer" onClick={handleLogout}>Logout</div>
        </div>
      )}

      {notificationModalOpen &&
        <NotificationModal onClose={() => setNotificationModalOpen(false)} />}
    </div>
  );
}

export default Nav;








// function Nav() {

//     return(
//         <>
//             <div className="h-20 shadow-sm shadow-sky-600 fixed top-0 left-0 right-0 z-50 bg-black">
//                 <div className="flex justify-between items-center h-full mx-8">
//                     <h1 className="font-bold text-2xl">DevHive</h1>
//                     <div className="flex space-x-8 mr-8 font-bold">
//                         <p>users</p>
//                         <p>Tags</p>
//                         <p>Q&A</p>
//                         <div className="avatar">O</div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Nav



