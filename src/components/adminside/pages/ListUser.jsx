import { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import api from "../../../services/api";
import toast from "react-hot-toast";

function ListUser() {
    const [userlist, setUserlist] = useState([]);
    const [blockModal, setBlockModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [search, setSearch] = useState("");
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);

    const fetchData = async (url = `usermanage?search=${search}`) => {
        try {
            const res = await api.get(url);
            console.log(res);
            setUserlist(res.data.results);
            setNext(res.data.next);
            setPrevious(res.data.previous);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [search]);

    const handleBlock = async (id) => {
        try {
            const res = await api.patch(`blockuser/${id}`);
            if (res.status === 200) {
                toast.success(res.data.message);
                fetchData();
            }
        } catch (err) {
            console.log(err);
            toast.error("There was an error occurred");
        } finally {
            setBlockModal(false);
            setSelectedUserId(null);
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="sm:ml-[200px]">
                <div className="flex justify-center">
                    <h2 className="text-2xl font-bold my-4">Users</h2>
                </div>
                <div className="flex justify-center mt-2">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            type="text"
                            className="border border-zinc-600 bg-black-050 rounded-md p-1 pl-4"
                            placeholder="Search users"
                        />
                    </form>
                </div>

                <div className="my-4 mt-6 border border-slate-900">
                    <div className="mx-4 sm:mx-8 lg:mx-16">
                        <div className="border border-slate-700 mt-6 rounded-lg relative overflow-x-auto custom-scrollbar">
                            <table className="w-full text-sm text-left rtl:text-right">
                                <thead className="text-sm uppercase border-b border-slate-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Id</th>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">D of Join</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userlist.length > 0 ? (
                                        userlist.map((data, index) => (
                                            <tr key={index} className="border-b border-slate-700">
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{data.id}</th>
                                                <td className="px-6 py-4">{data.username}</td>
                                                <td className="px-6 py-4">{data.email}</td>
                                                <td className="px-6 py-4">{data.date_joined.slice(0, 10)}</td>
                                                <td className="px-6 py-4 gap-2 whitespace-nowrap">
                                                    <button
                                                        onClick={() => {
                                                            setBlockModal(!blockModal);
                                                            setSelectedUserId(data.id);
                                                        }}
                                                        className="px-2 py-1 border border-red-800 rounded-sm"
                                                    >
                                                        {data.is_blocked ? "Unblock" : "Block"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">
                                                <div className="flex flex-col justify-center items-center">
                                                    <p className="text-5xl mb-2 opacity-50">📭</p>
                                                    <p className="text-xl font-mono">No Data</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center my-4">
                    <button
                        disabled={!previous}
                        onClick={() => fetchData(previous)}
                        className={`px-4 py-2 mx-2 border ${!previous ? "border-gray-500 text-gray-500" : "border-blue-500 text-blue-500"}`}
                    >
                        Previous
                    </button>
                    <button
                        disabled={!next}
                        onClick={() => fetchData(next)}
                        className={`px-4 py-2 mx-2 border ${!next ? "border-gray-500 text-gray-500" : "border-blue-500 text-blue-500"}`}
                    >
                        Next
                    </button>
                </div>

                {blockModal && (
                    <div className="fixed inset-0 sm:ml-[200px] bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
                        <div className="absolute bg-black border border-slate-600 shadow-md shadow-gray-700 rounded-lg p-6">
                            <div className="border-slate-600 rounded-md p-4 ">
                                <h1 className="text-lg">Are you sure you wanna block this user?</h1>
                                <div className="mx-6 mt-8 flex justify-between">
                                    <button
                                        onClick={() => setBlockModal(false)}
                                        className="border rounded-md border-slate-500 px-4 py-1"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={() => handleBlock(selectedUserId)}
                                        className="border border-red-500 px-4 py-1 rounded-md"
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListUser;

























// import { useEffect, useState } from "react"
// import Nav from "../layout/Nav"
// import Sidebar from "../layout/Sidebar"
// import api from "../../../services/api"
// import toast from "react-hot-toast"

// function ListUser() {

//     const [userlist, setUserlist] = useState([])
//     const [blockModal, setBlockModal] = useState(false)
//     const [selectedUserId, setSelectedUserId] = useState(null)
//     const [search, setSearch] = useState("")
//     const [next, setNext] = useState(null)
//     const [previous, setPrevious] = useState(null)


//     const fetchData = async (searchTerm = "") => {
//         try {
//             const res = await api.get(`usermanage?search=${searchTerm}`)
//             console.log(res)
//             setUserlist(res.data.results)
//             if(res.data.next) {
//                 setNext(res.data.next)
//             }
//             if(res.data.previous) {
//                 setPrevious(res.data.previous)
//             }
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }





//     useEffect(() => {
//         fetchData(search)
//     },[search])

//     const handleBlock = async (id) => {
//         try{
//             const res = await api.patch(`blockuser/${id}`)
//             if (res.status === 200) {
//                 toast.success(res.data.message)
//                 fetchData()
//             }
//         }
//         catch(err) {
//             console.log(err)
//             toast.error('there is a error occured')
//         }
//         finally{
//             setBlockModal(false)
//             setSelectedUserId(null)
//         }
//     }



//     return(
//         <div>
//             <Sidebar />
//             <div className="sm:ml-[200px]">
//                 <div className="flex justify-center">
//                     <h2 className="text-2xl font-bold my-4">Users</h2>
//                 </div>
//                 <div className="flex justify-center mt-2">
//                     <form onSubmit={(e) => e.preventDefault()}> 
//                         <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="border border-zinc-600 bg-black-050 rounded-md p-1 pl-4" placeholder="Search users"/>
//                     </form>
//                 </div>

//                 <div className="my-4 mt-6 border border-slate-900">
//                     <div className="mx-4 sm:mx-8 lg:mx-16">
//                         <div className="border border-slate-700 mt-6 rounded-lg relative overflow-x-auto">
//                             <table className="w-full text-sm text-left rtl:text-right">
//                                 <thead className="text-sm uppercase border-b border-slate-500">
//                                     <tr>
//                                         <th scope="col" className="px-6 py-3">Id</th>
//                                         <th scope="col" className="px-6 py-3">Name</th>
//                                         <th scope="col" className="px-6 py-3">Email</th>
//                                         <th scope="col" className="px-6 py-3">D of Join</th>
//                                         <th scope="col" className="px-6 py-3">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {userlist.length > 0 ? (
//                                         userlist.map((data, index) => (
//                                             <tr key={index} className="border-b border-slate-700">
//                                                 <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{data.id}</th>
//                                                 <td className="px-6 py-4">{data.username}</td>
//                                                 <td className="px-6 py-4">{data.email}</td>
//                                                 <td className="px-6 py-4">{data.date_joined.slice(0, 10)}</td>
//                                                 <td className="px-6 py-4 gap-2 whitespace-nowrap">
//                                                     <button onClick={() => {setBlockModal(!blockModal); setSelectedUserId(data.id)}} className="px-2 py-1 border border-red-800 rounded-sm">{data.is_blocked ? 'Unblock' : 'Block'}</button>
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     )
//                                         :
//                                     (
//                                         <tr>
//                                              <td colSpan="5" className="text-center py-4">
//                                                  <div className="flex flex-col justify-center items-center">
//                                                      <p className="text-5xl mb-2 opacity-50">📭</p>
//                                                      <p className="text-xl font-mono">No Data</p>
//                                                  </div>
//                                              </td>
//                                          </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>

//                     </div>
                    
//                 </div>

//                 {blockModal && 
//                 <div className="fixed inset-0 sm:ml-[200px]  bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
//                     <div className="absolute bg-black border border-slate-600 shadow-md shadow-gray-700 rounded-lg p-6">
//                         <div className="border-slate-600 rounded-md p-4 ">
//                             <h1 className="text-lg">Are you sure you wanna block this user </h1>
//                             <div className=" mx-6  mt-8 flex justify-between">
//                                 <button onClick={() => setBlockModal(false)} className="border rounded-md border-slate-500 px-4 py-1">No</button>
//                                 <button onClick={() => handleBlock(selectedUserId)} className="border border-red-500 px-4 py-1 rounded-md">yes</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 }

            
                
                   

//             </div>
            
//         </div>
//     )
// }

// export default ListUser

