


import { useState } from "react";
import { useNavigate } from "react-router-dom";


function TailSidebar() {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    console.log(isOpen)
    return(
        <div>
          <button onClick={() => setIsOpen(!isOpen)} aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"> <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-[200px]  h-screen transition-transform ${ isOpen ? "translate-x-0" : "-translate-x-full" } sm:translate-x-0 bg-zinc-900 border-r border-lime-400`} aria-label="Sidebar" >
            {/* <div>

            </div> */}
            <div className="h-full px-3 py-4 overflow-y-auto relative">
              <button onClick={() => setIsOpen(false)} className="absolute px-2 bg-zinc-800 top-3 right-3 rounded-md sm:hidden text-gray-600 hover:text-red-600  dark:text-gray-400 dark:hover:text-white font-bold"> ✕ </button>
              <div className="">
                <button onClick={() => navigate('/admin')} className="text-2xl my-4 font-bold text-lime-100">DevHive</button>
              </div>
              <div>
                <ul className="space-y-2 font-medium">
                  <li onClick={() => { navigate('/admin/users') }} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 "> 👥 <span className="ms-2">Users</span> </li>
                  <li onClick={() => { navigate('/admin/tags'); setIsSidebarOpen(false); }} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 "> 🔖 <span className="ms-2">Tags</span></li>
                  <li onClick={() => { navigate('/admin/allquestions'); setIsSidebarOpen(false); }} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 "> ❓<span className="ms-1">Questions</span></li>
                  <li className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 "> ⇉ <span className="ms-2">Products</span></li>
                  <li className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 "> 🛒<span className="ms-2">Orders</span></li>
                </ul>
              </div>
            </div>
        </aside>
      </div>
    )
}

export default TailSidebar



























// import React, { useState } from "react";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       {/* Hamburger Button */}
//       <button
//         onClick={toggleSidebar}
//         aria-controls="default-sidebar"
//         type="button"
//         className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//       >
//         <span className="sr-only">Open sidebar</span>
//         <svg
//           className="w-6 h-6"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             clipRule="evenodd"
//             fillRule="evenodd"
//             d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//           ></path>
//         </svg>
//       </button>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         id="default-sidebar"
//         className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } sm:translate-x-0 bg-gray-50 dark:bg-gray-800`}
//         aria-label="Sidebar"
//       >
//         <div className="h-full px-3 py-4 overflow-y-auto relative">
//           {/* Close Button */}
//           <button
//             onClick={toggleSidebar}
//             className="absolute top-3 right-3 sm:hidden text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               ></path>
//             </svg>
//           </button>

//           <ul className="space-y-2 font-medium">
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 21"
//                 >
//                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                 </svg>
//                 <span className="ms-3">Dashboard</span>
//               </a>
//             </li>
//             {/* Add more menu items */}
//           </ul>
//         </div>
//       </aside>
//     </>
//   );
// };

// // export default Sidebar;
