import Nav from "../NavFoot/Nav"
import profile from '../../../assets/images/noProfile.jpg'
import { useEffect, useState } from "react"
import api from "../../../services/api"
import toast from "react-hot-toast"


function ListUsers() {
    
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        const fetchData = async () => {
            try{
                setLoading(true)
                const res = await api.get('listusers')

                console.log(res)
                if (res.status === 200) {
                    setUsers(res.data)
                }
                else {
                    toast.error('there is a problem while fetching users')
                }
            }
            catch(err) {
                console.log(err)
                if (err.message === "Network Error"){
                    toast.error(err.message)
                }
                else if(err.status == 500){
                    toast.error('internal server error')
                }
                else{
                    toast.error('error while loading')
                }
            }
            finally{
                setLoading(false)
            }
        }

        fetchData()


    }, [])

    return(
        <div>
            <Nav />
            <div className="mt-20">
                <div className="m-24 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {users.map((data) => (
                        <div key={data.id} onClick={() => console.log('hey cliked',data.username)} onMouseOver={() => console.log('hey manale poo tharammo', data.username)} 
                        className="border border-zinc-800 w-full  flex gap-2 p-3">
                            <div className="flex gap-4">
                                <img src={data.profile || profile} alt="profile" className="h-16 w-16 rounded" />
                                <div>

                                <h1 className="text-[16px] font-semibold font-mono text-red-200">{data.username}</h1>
                                <h1 className="text-[14px] text-gray-500">{data.location}</h1>
                                <h1 className="text-[14px] font-medium">{data.total_votes} </h1>
                                {/* <div className="flex gap-2 flex-wrap">
                                    {data.tags.map((tags,indx) => (
                                        <h1 className="text-[14px]"  key={indx}> .{tags}</h1>
                                    ))}
                                </div> */}
                                    </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default ListUsers
