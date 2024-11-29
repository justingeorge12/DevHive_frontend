import Nav from "../NavFoot/Nav";
import profile from "../../../assets/images/noProfile.jpg";
import { useEffect, useState, useCallback } from "react";
import api from "../../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function ListUsers() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchName, setSearchName] = useState("");

    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get("listusers", { params: { search: searchName } });

            if (res.status === 200) {
                setUsers(res.data);
            } else {
                toast.error("There is a problem while fetching users");
            }
        } 
        catch (err) {
            console.log(err);
            if (err.message === "Network Error") {
                toast.error(err.message);
            } else if (err.response?.status === 500) {
                toast.error("Internal server error");
            } else {
                toast.error("Error while loading");
            }
        }
        finally {
            setLoading(false);
        }
    }, [searchName]); 

    useEffect(() => {

        fetchData();
    }, [fetchData]);

    const handleInputChange = (e) => {
        setSearchName(e.target.value);
    };

  return (
    <div>
      <Nav />
      <div className="mt-24">
        <div className="flex justify-center">
          <form>
            <input type="text" onChange={handleInputChange} value={searchName} className="bg-slate-950 border border-slate-700 w-full rounded-md py-1 pl-2 shadow-sm shadow-slate-700" placeholder="Search user.." />
          </form>
        </div>
        <div className="m-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading && <p><BarLoader color='#ffffff' size={20} /></p>}
          {!loading && users.length === 0 && <p>No users found.</p>}
          {users.map((data) => (
            <div key={data.id} className="border border-zinc-800 w-full flex gap-2 p-3" >
              <div className="flex gap-4">
                <img src={data.profile || profile} alt="profile" className="h-16 w-16 rounded" />
                <div>
                  <h1 onClick={() => navigate(`/${data.username}`)} className="text-[16px] cursor-pointer font-semibold font-mono text-red-200"> {data.username} </h1>
                  <h1 className="text-[14px] text-gray-500">{data.location}</h1>
                  <h1 className="text-[14px] font-medium">{data.total_votes}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListUsers;





















// import Nav from "../NavFoot/Nav"
// import profile from '../../../assets/images/noProfile.jpg'
// import { useEffect, useState } from "react"
// import api from "../../../services/api"
// import toast from "react-hot-toast"
// import { useNavigate } from "react-router-dom"


// function ListUsers() {
    
//     const [loading, setLoading] = useState(false)
//     const [users, setUsers] = useState([])
//     const [searchName,setSearchName] = useState('')

//     const navigate = useNavigate()


//     useEffect(() => {

//         const fetchData = async () => {
//             try{
//                 setLoading(true)
//                 const res = await api.get('listusers')

//                 console.log(res.data)
//                 if (res.status === 200) {
//                     setUsers(res.data)
//                 }
//                 else {
//                     toast.error('there is a problem while fetching users')
//                 }
//             }
//             catch(err) {
//                 console.log(err)
//                 if (err.message === "Network Error"){
//                     toast.error(err.message)
//                 }
//                 else if(err.status == 500){
//                     toast.error('internal server error')
//                 }
//                 else{
//                     toast.error('error while loading')
//                 }
//             }
//             finally{
//                 setLoading(false)
//             }
//         }
//         fetchData()
//     }, [])


//     const handleInputChange = (e) => {
//         setSearchName(e.target.value);
//     };

//     return(
//         <div>
//             <Nav />
//             <div className="mt-24">
//                 <div className="flex justify-center">
//                 <form>
//                             <input type="text" onChange={handleInputChange} value={searchName} className="bg-slate-950 border border-slate-700 w-full rounded-md py-1 pl-2 shadow-sm shadow-slate-700" placeholder="Search user.."/>
//                         </form>
//                 </div>
//                 <div className="m-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//                     {users.map((data) => (
//                         <div key={data.id} className="border border-zinc-800 w-full  flex gap-2 p-3">
//                             <div className="flex gap-4">
//                                 <img src={data.profile || profile} alt="profile" className="h-16 w-16 rounded" />
//                                 <div>
//                                     <h1 onClick={() => navigate(`/${data.username}`)} className="text-[16px] cursor-pointer font-semibold font-mono text-red-200">{data.username}</h1>
//                                     <h1 className="text-[14px] text-gray-500">{data.location}</h1>
//                                     <h1 className="text-[14px] font-medium">{data.total_votes} </h1>
                                
//                                 </div>
//                             </div>
//                         </div>
//                     ))}

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ListUsers
