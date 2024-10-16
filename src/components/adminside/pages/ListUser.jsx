import { useEffect, useState } from "react"
import Nav from "../layout/Nav"
import Sidebar from "../layout/Sidebar"
import api from "../../../services/api"

function ListUser() {

    const [userlist, setUserlist] = useState([])

    // const users = [{id:1, name:'sahad', email:'sahad@gmail.com',DofJoin:'4-7-2012', action:'block'},{id:3, name:'danish', email:'danish@gmail.com',DofJoin:'16-7-2023', action:'block'},{id:9, name:'jasir', email:'jasir@gmail.com',DofJoin:'4-2-2022', action:'block'}]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('usermanage')
                setUserlist(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchData()

       


    },[])

    return(
        <div>
            <Nav />
            <Sidebar />
            <div className="lg:ml-[200px]">
                <div className="flex justify-center">
                    <h2 className="text-2xl font-bold my-4">Users</h2>
                </div>
                <div className="flex justify-center">
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
                             <h2 className="w-1/6 text-center">{data.is_blocked ? 'Unblock' : 'Block'}</h2>

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



