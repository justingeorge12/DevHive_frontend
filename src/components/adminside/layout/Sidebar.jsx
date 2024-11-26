
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonModal from "../pages/rewards/CommonModal/CommonModal";
import api from "../../../services/api";


function Sidebar() {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)

    const handleLogout = async () =>{
      try{
          const refresh = localStorage.getItem('refresh')

          const res = await api.post('logout', {refresh})
          localStorage.clear();
          delete api.defaults.headers.common["Authorization"];
          navigate('/admin/login')
      }
      catch (err) {
          console.log(err)
          localStorage.clear()
          delete api.defaults.headers.common["Authorization"];
          navigate('/admin/login')
      }
      
  }

    return(
        <div>
          <button onClick={() => setIsOpen(!isOpen)} aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"> <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-[200px]  h-screen transition-transform ${ isOpen ? "translate-x-0" : "-translate-x-full" } sm:translate-x-0 bg-zinc-900 border-r border-lime-400`} aria-label="Sidebar" >
            <div className="h-full px-3 py-4 overflow-y-auto relative">
              <button onClick={() => setIsOpen(false)} className="absolute px-2 bg-zinc-800 top-3 right-3 rounded-md sm:hidden text-gray-600 hover:text-red-600  dark:text-gray-400 dark:hover:text-white font-bold"> ✕ </button>
              <div className="">
                <button onClick={() => navigate('/admin')} className="text-2xl my-4 font-bold text-lime-100">DevHive</button>
              </div>
              <div>
                <ul className="space-y-2 font-medium">
                  <li onClick={() => { navigate('/admin/users') }} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 cursor-pointer"> 👥 <span className="ms-2">Users</span> </li>
                  <li onClick={() => { navigate('/admin/tags') }} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 cursor-pointer "> 🔖 <span className="ms-2">Tags</span></li>
                  <li onClick={() => { navigate('/admin/allquestions')}} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 cursor-pointer"> ❓<span className="ms-1">Questions</span></li>
                  <li onClick={() => {navigate('/admin/products')}} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 cursor-pointer "> 🛍️ <span className="ms-2">Products</span></li>
                  <li onClick={() => {navigate('/admin/productorders')}} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 cursor-pointer"> 🛒<span className="ms-2">Orders</span></li>
                  <li onClick={() => setLogoutModal(true)} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 cursor-pointer"> 🔒<span className="ms-2">Logout</span></li>

                </ul>
              </div>
            </div>
        </aside>
        {logoutModal &&
        <CommonModal onClose={() => setLogoutModal(false)} message={'Logout'} handleLogout={handleLogout}/>}
      </div>
    )
}

export default Sidebar






























// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import Nav from "./Nav";

// // function Sidebar() {

// //     const navigate = useNavigate()


// //     const showHome = () => {
// //         // navigate('/admin')
// //         console.log('hey')
// //     }

// //     return (
// //         <div className="w-[200px] fixed  mt-0.5 h-screen bg-zinc-900 border-r-lime-500 border-r rounded-br-2xl">
// //             <ul className="pt-6 font-semibold">
// //                 <li onClick={() => navigate('/admin/users')} className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List users</li>
// //                 <li onClick={() => navigate('/admin/tags')} className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List Tags</li>
// //                 <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List Question</li>
// //                 <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Down Voted Questions</li>
// //                 <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Down Voted Answers</li>
// //                 <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Products</li>
// //                 <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Order requests</li>
// //             </ul>
// //         </div>
// //     );
// // }

// // export default Sidebar;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
// import Nav from "./Nav";

// function Sidebar() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const navigate = useNavigate();

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div>

//             <div className="lg:hidden p-4">
//                 <FaBars onClick={toggleSidebar} className="text-white text-2xl cursor-pointer" />
//             </div>

//             <div className={`fixed w-[200px] h-screen bg-zinc-900 border-r-lime-500 border-r rounded-br-2xl transition-transform duration-300 ${
//                 isSidebarOpen ? 'transform-none' : '-translate-x-full lg:translate-x-0'
//             }`}>
//                 <ul className="pt-6 font-semibold">
//                     <li onClick={() => { navigate('/admin/users'); setIsSidebarOpen(false); }} className="cursor-pointer text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List users</li>
//                     <li onClick={() => { navigate('/admin/tags'); setIsSidebarOpen(false); }} className="cursor-pointer text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List Tags</li>
//                     <li onClick={() => { navigate('/admin/allquestions'); setIsSidebarOpen(false)}} className="cursor-pointer text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List Question</li>
//                     {/* <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Down Voted Questions</li>
//                     <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Down Voted Answers</li> */}
//                     <li  className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Products</li>
//                     <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Order requests</li>
//                 </ul>
//             </div>

//             {isSidebarOpen && (
//                 <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 lg:hidden"></div>
//             )}
//         </div>
//     );
// }

// export default Sidebar;
