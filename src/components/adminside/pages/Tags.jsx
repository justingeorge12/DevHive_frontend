
import { useEffect, useState } from "react"
import AddTags from "../modal/AddTags"
import api from "../../../services/api"
import Confirm from "../modal/Confirm"
import toast from "react-hot-toast"
import Sidebar from "../layout/Sidebar"




function Tags() {
    const [addModel, setAddModel] = useState(false);
    const [currentTag, setCurrentTag] = useState(null);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandDesc, setExpandDesc] = useState(null);
    const [tagDelete, setTagDelete] = useState(null);
    const [search, setSearch] = useState("");
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    const fetchData = async (url = `tags/?search=${search}`) => {
        try {
            setLoading(true);
            const res = await api.get(url);
            console.log(res, '-----------------')
            setList(res.data.results || []);
            setNextPage(res.data.next);
            setPreviousPage(res.data.previous);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(`tags/?search=${search}`);
    }, [search]);

    const handleAddClick = () => {
        setCurrentTag(null);
        setAddModel(!addModel);
    };

    const handleEditClick = (tag) => {
        setCurrentTag(tag);
        setAddModel(!addModel);
    };

    const handleCloseModal = () => {
        setAddModel(false);
        setCurrentTag(null);
    };

    const handleExpand = (id) => {
        setExpandDesc(expandDesc === id ? null : id);
    };

    const handleDelete = (id, action) => {
        if (action) setTagDelete(null);
        setTagDelete(tagDelete === id ? null : id);
    };

    const deleteTag = async () => {
        try {
            const res = await api.delete(`tags/${tagDelete}/`);
            if (res.status === 204) {
                toast.success("Tag deleted successfully");
                fetchData();
            }
            handleDelete(null, "close");
        } catch (error) {
            console.error(error);
            toast.error("There was an error deleting the tag");
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="sm:ml-[200px] px-4 md:px-8 lg:px-16 py-4">
                <div className="mt-2">
                    <div className="justify-center flex">
                        <h1 className="font-bold sm:text-xl md:text-2xl font-mono text-rose-200">TAG'S</h1>
                    </div>
                    <div className="flex justify-center mt-2">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                type="text"
                                className="border border-zinc-600 bg-black-050 rounded-md p-1 pl-4"
                                placeholder="Search tag"
                            />
                        </form>
                    </div>
                    {addModel && <AddTags onClose={handleCloseModal} tag={currentTag} fetchData={fetchData} />}
                    {tagDelete && (
                        <Confirm onClose={() => handleDelete(null, "close")} tag={tagDelete} deleteTag={() => deleteTag()} />
                    )}
                    <div className="flex justify-end ">
                        <button
                            onClick={handleAddClick}
                            className="mr-1 bg-orange-600 px-4 md:px-4 md:py-2 py-1 rounded-md shadow-2xl font-mono text-sm md:text-base sm:ml-0"
                        >
                            ADD TAGS
                        </button>
                    </div>
                    {/* <div className="border border-slate-700 mt-6 rounded-lg relative overflow-x-auto custom-scrollbar"> */}

                    <table className="w-full bg-zinc-900  border text-sm text-left rtl:text-right">
                        <thead className="text-sm uppercase border-b border-slate-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Id</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.length > 0 ? (
                                list.map((tag) => (
                                    <tr key={tag.id} className="border-b border-slate-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{tag.id}</th>
                                        <td className="px-6 py-4">{tag.name}</td>
                                        <td onClick={() => handleExpand(tag.id)} className="px-6 py-4">
                                            {expandDesc === tag.id
                                                ? tag.description
                                                : tag.description.length > 30
                                                ? `${tag.description.slice(0, 30)}...`
                                                : tag.description}
                                        </td>
                                        <td className="px-6 py-4 gap-2 whitespace-nowrap">
                                            <button
                                                onClick={() => handleEditClick(tag)}
                                                className="px-2 py-1 mr-2 border border-lime-600 text-lime-300 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tag.id, "")}
                                                className="px-2 border border-red-500 text-red-300 py-1 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        No tags found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* </div> */}

                    {/* Pagination Buttons */}
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => fetchData(previousPage)}
                            disabled={!previousPage}
                            className={`px-4 py-2 mr-2 rounded-md ${!previousPage ? "border border-gray-400"  : "border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white"}`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => fetchData(nextPage)}
                            disabled={!nextPage}
                            className={`px-4 py-2 ml-2 rounded-md ${!nextPage ? "border border-gray-400" : "border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white"}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tags;

















// import { act, useEffect, useState } from "react"
// import AddTags from "../modal/AddTags"
// import api from "../../../services/api"
// import Confirm from "../modal/Confirm"
// import toast from "react-hot-toast"
// import Nav from "../layout/Nav"
// import Sidebar from "../layout/Sidebar"


// function Tags() {

//     const [addModel, setAddModel] = useState(false)
//     const [currentTag, setCurrentTag] = useState(null)
//     const [list, setList] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [expandDesc, setExpandDesc] = useState(null)
//     const [tagDelete, setTagDelete] = useState(null)
//     const [search, setSearch] = useState("")

    
//     const fetchData = async (searchTerm = "") => { 
        
//         try{
//             setLoading(true)
//             const res = await api.get(`tags/?search=${searchTerm}`)
//             console.log(res.data)
//             setList(res.data.results || [])
//         }

//         catch (error) {
//             console.log(error)

//         }
//         finally{
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchData(search)
//     }, [search])


//     const handleAddClick = () => {
//         setCurrentTag(null)
//         setAddModel(!addModel)
//     }

//     const handleEditClick = (tag) => {
//         setCurrentTag(tag)
//         setAddModel(!addModel)
//     }

//     const handleCloseModal = () => {
//         setAddModel(false)
//         setCurrentTag(null)
//     }

//     const handleExpand = (id) => {
//         setExpandDesc(expandDesc === id ? null : id)
//     }

//     const handleDelete = (id, action) => {
        
//         if (action) {setTagDelete(null)}
//         setTagDelete(tagDelete === id ? null : id )
       
//     }


//     const deleteTag = async () => {
//         try{
//             const res = api.delete(`tags/${tagDelete}/`)
            
//             if (res.status === 204) {
//                 toast.success('tag is deleted successfully ')
//                 fetchData()
//             }
//             console.log(res, 'reeeeeeeeeeeeeeees ')
//             console.log(res.status, 'staaaaaaaatus')

//             handleDelete(null, 'close')
//         }
//         catch (error) {
//             console.log(error)
//             toast.error('there is a error')
//         }

//     }
    


//     return(
        
//         <div>
//              <Sidebar />
//             <div className="sm:ml-[200px] px-4 md:px-8 lg:px-16 py-4">    
               
//                 <div className="mt-2">
//                     <div className="justify-center flex">
//                         <h1 className="font-bold sm:text-xl md:text-2xl font-mono text-rose-200">TAG'S</h1>
                        
//                     </div> 
//                     <div className="flex justify-center mt-2">
//                         <form onSubmit={(e) => e.preventDefault()}> 
//                             <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="border border-zinc-600 bg-black-050 rounded-md p-1 pl-4" placeholder="Search tag"/>
//                         </form>
//                     </div>
//                     {addModel && (
//                         <AddTags onClose={handleCloseModal} tag={currentTag} fetchData={fetchData} />
//                     )}

//                     {tagDelete && (
//                         <Confirm onClose={() => handleDelete(null, 'close')} tag={tagDelete} deleteTag={() => deleteTag()} />
//                         )}
//                     <div className="flex justify-end ">  
//                         <button onClick={handleAddClick} className="mr-1 bg-orange-600 px-4 md:px-4 md:py-2 py-1 rounded-md shadow-2xl font-mono text-sm md:text-base sm:ml-0">ADD TAGS</button>
//                     </div>
                    

//                     <table className="w-full bg-zinc-900 m-4 border text-sm text-left rtl:text-right ">
//                         <thead className="text-sm uppercase border-b border-slate-700">
//                             <tr>
//                                 <th scope="col" className="px-6 py-3">Id</th>
//                                 <th scope="col" className="px-6 py-3">Name</th>
//                                 <th scope="col" className="px-6 py-3">Description</th>
//                                 <th scope="col" className="px-6 py-3">Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {list && list.length > 0 ? (
//                                 list.map((tag) => (
//                                     <tr key={tag.id} className="border-b border-slate-700">
//                                         <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{tag.id}</th>
//                                         <td className="px-6 py-4">{tag.name}</td>
//                                         <td onClick={() => handleExpand(tag.id)} className="px-6 py-4">
//                                             {expandDesc === tag.id
//                                                 ? tag.description
//                                                 : tag.description.length > 30
//                                                 ? `${tag.description.slice(0, 30)}...`
//                                                 : tag.description}
//                                         </td>
//                                         <td className="px-6 py-4 gap-2 whitespace-nowrap">
//                                             <button onClick={() => handleEditClick(tag)} className="px-2 py-1 mr-2 border border-lime-600 text-lime-300 rounded-md">Edit</button>
//                                             <button onClick={() => handleDelete(tag.id, '')} className="px-2 border border-red-500 text-red-300 py-1 rounded-md">Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="4" className="text-center py-4">No tags found</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>

//                 </div>
                
//             </div>

            
//         </div>
//     )
// }

// export default Tags



