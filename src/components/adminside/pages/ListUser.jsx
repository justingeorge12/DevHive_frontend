import { useEffect, useState } from "react"
import Nav from "../layout/Nav"
import Sidebar from "../layout/Sidebar"
import api from "../../../services/api"
import toast from "react-hot-toast"

function ListUser() {

    const [userlist, setUserlist] = useState([])
    const [blockModal, setBlockModal] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [search, setSearch] = useState("")

    // const users = [{id:1, name:'sahad', email:'sahad@gmail.com',DofJoin:'4-7-2012', action:'block'},{id:3, name:'danish', email:'danish@gmail.com',DofJoin:'16-7-2023', action:'block'},{id:9, name:'jasir', email:'jasir@gmail.com',DofJoin:'4-2-2022', action:'block'}]

    const fetchData = async (searchTerm = "") => {
        try {
            const res = await api.get(`usermanage?search=${searchTerm}`)
            setUserlist(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }





    useEffect(() => {
        fetchData(search)
    },[search])

    const handleBlock = async (id) => {
        try{
            const res = await api.patch(`blockuser/${id}`)
            if (res.status === 200) {
                toast.success(res.data.message)
                fetchData()
            }
        }
        catch(err) {
            console.log(err)
            toast.error('there is a error occured')
        }
        finally{
            setBlockModal(false)
            setSelectedUserId(null)
        }
    }



    return(
        <div>
            <Nav />
            <Sidebar />
            <div className="lg:ml-[200px]">
                <div className="flex justify-center">
                    <h2 className="text-2xl font-bold my-4">Users</h2>
                </div>
                <div className="flex justify-center mt-2">
                        <form onSubmit={(e) => e.preventDefault()}> 
                            <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="border border-zinc-600 bg-black-050 rounded-md p-1 pl-4" placeholder="Search users"/>
                        </form>
                    </div>
                <div className="flex justify-center mt-6">
                    <div className="w-full max-w-3xl"> 
                        <div className="flex justify-around p-3 font-semibold border border-gray-300">
                            <h1 className="w-1/6 text-center">Id</h1>
                            <h2 className="w-1/6 text-center">Name</h2>
                            <h2 className="w-1/3 text-center">email</h2>
                            <h2 className="w-1/3 text-center">DofJoin</h2>
                            <h2 className="w-1/6">Actions</h2>
                        </div>
                    </div>
                </div>

                {blockModal && 
                
                <div className="flex justify-center inset-0 z-50 bg-black bg-opacity-50">
                    <div className="absolute bg-black border border-slate-600 shadow-md shadow-gray-700 rounded-lg p-6">
                        <div className="border-slate-600 rounded-md p-4 ">
                            <h1 className="text-lg">Are you sure you wanna block this user </h1>
                            <div className=" mx-6  mt-8 flex justify-between">
                                <button onClick={() => setBlockModal(false)} className="border rounded-md border-slate-500 px-4 py-1">No</button>
                                <button onClick={() => handleBlock(selectedUserId)} className="border border-red-500 px-4 py-1 rounded-md">yes</button>
                            </div>
                        </div>
                    </div>
                </div>
                }
                
                <hr className="my-2"/>
                
                    {userlist.map((data) => (
                        <div key={data.id}>
                        <div className="flex justify-center">
                         <div className="w-full max-w-3xl"> 
                         <div className="flex justify-around p-3 font-semibold border border-gray-300">
                             <h1 className="w-1/6 text-center">{data.id}</h1>
                             <h2 className="w-1/6 text-center">{data.username}</h2>
                             <h2 className="w-1/3 text-center">{data.email}</h2>
                             <h2 className="w-1/3 text-center">{data.date_joined.slice(0, 10)}</h2>
                             <h2 onClick={() => {setBlockModal(!blockModal); setSelectedUserId(data.id)}} className="w-1/6 text-center border border-red-500 cursor-pointer">{data.is_blocked ? 'Unblock' : 'Block'}</h2>

                         </div>
                     </div>
                </div>
                </div>

                    ))}
                   

            </div>
            
        </div>
    )
}

export default ListUser



