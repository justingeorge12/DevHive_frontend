
import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

function Sidebar() {

    // const navigate = useNavigate()

    const showHome = () => {
        // navigate('/admin')
        console.log('hey')
    }

    return (
        <div className="w-[200px] fixed  mt-0.5 h-screen bg-zinc-900 border-r-lime-500 border-r rounded-br-2xl">
            <ul className="pt-6 font-semibold">
                <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List users</li>
                <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List Tags</li>
                <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">List Question</li>
                <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Down Voted Questions</li>
                <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Down Voted Answers</li>
                <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Products</li>
                <li className="text-white p-2 pl-4 border border-transparent hover:border-orange-400 hover:bg-zinc-800">Order requests</li>
            </ul>
        </div>
    );
}

export default Sidebar;
