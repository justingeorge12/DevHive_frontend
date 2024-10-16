// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Nav from "./Nav";

// function Sidebar() {

//     const navigate = useNavigate()


//     const showHome = () => {
//         // navigate('/admin')
//         console.log('hey')
//     }

//     return (
//         <div className="w-[200px] fixed  mt-0.5 h-screen bg-zinc-900 border-r-lime-500 border-r rounded-br-2xl">
//             <ul className="pt-6 font-semibold">
//                 <li onClick={() => navigate('/admin/users')} className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List users</li>
//                 <li onClick={() => navigate('/admin/tags')} className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List Tags</li>
//                 <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List Question</li>
//                 <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Down Voted Questions</li>
//                 <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Down Voted Answers</li>
//                 <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Products</li>
//                 <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Order requests</li>
//             </ul>
//         </div>
//     );
// }

// export default Sidebar;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Nav from "./Nav";

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>

            <div className="lg:hidden p-4">
                <FaBars onClick={toggleSidebar} className="text-white text-2xl cursor-pointer" />
            </div>

            <div className={`fixed w-[200px] h-screen bg-zinc-900 border-r-lime-500 border-r rounded-br-2xl transition-transform duration-300 ${
                isSidebarOpen ? 'transform-none' : '-translate-x-full lg:translate-x-0'
            }`}>
                <ul className="pt-6 font-semibold">
                    <li onClick={() => { navigate('/admin/users'); setIsSidebarOpen(false); }} className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List users</li>
                    <li onClick={() => { navigate('/admin/tags'); setIsSidebarOpen(false); }} className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List Tags</li>
                    <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List Question</li>
                    <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Down Voted Questions</li>
                    <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Down Voted Answers</li>
                    <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Products</li>
                    <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Order requests</li>
                </ul>
            </div>

            {isSidebarOpen && (
                <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 lg:hidden"></div>
            )}
        </div>
    );
}

export default Sidebar;
