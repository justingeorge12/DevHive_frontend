import { act, useEffect, useState } from "react"
import AddTags from "../modal/AddTags"
import api from "../../../services/api"
import Confirm from "../modal/Confirm"
import toast from "react-hot-toast"
import Nav from "../layout/Nav"
import Sidebar from "../layout/Sidebar"

import {Pagination, PaginationItem, PaginationCursor} from "@nextui-org/pagination";


function Tags() {

    const [addModel, setAddModel] = useState(false)
    const [currentTag, setCurrentTag] = useState(null)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [expandDesc, setExpandDesc] = useState(null)
    const [tagDelete, setTagDelete] = useState(null)
    const [search, setSearch] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(5)

    
    const fetchData = async (searchTerm = "") => {
        
        try{
            setLoading(true)
            const res = await api.get(`tags/?search=${searchTerm}`)
            setList(res.data)
        }

        catch (error) {
            console.log(error)

        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(search)
    }, [search])

    // useEffect(() => {
    //     fetchData(search)
    // }, [search])



    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentLists = list.slice(firstPostIndex, lastPostIndex)

    const total = Math.ceil(list.length /postPerPage)

    const handleAddClick = () => {
        setCurrentTag(null)
        setAddModel(!addModel)
    }

    const handleEditClick = (tag) => {
        setCurrentTag(tag)
        setAddModel(!addModel)
    }

    const handleCloseModal = () => {
        setAddModel(false)
        setCurrentTag(null)
    }

    const handleExpand = (id) => {
        setExpandDesc(expandDesc === id ? null : id)
    }

    const handleDelete = (id, action) => {
        
        if (action) {setTagDelete(null)}
        console.log(id,'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiid')
        setTagDelete(tagDelete === id ? null : id )
       
    }

    console.log(tagDelete, 'no of dleeleteee')

    const deleteTag = async () => {
        try{
            const res = api.delete(`tags/${tagDelete}/`)
            
            if (res.status === 204) {
                toast.success('tag is deleted successfully ')
                fetchData()
            }
            console.log(res, 'reeeeeeeeeeeeeeees ')
            console.log(res.status, 'staaaaaaaatus')

            handleDelete(null, 'close')
        }
        catch (error) {
            console.log(error)
            toast.error('there is a error')
        }

    }
    


    return(
        
        <div>
            <Nav />
             <Sidebar />
            <div className="lg:ml-40 px-4 md:px-8 lg:px-16 py-4">    
               
                <div className="mt-2">
                    <div className="justify-center flex">
                        <h1 className="font-bold sm:text-xl md:text-2xl font-mono text-rose-200">TAG'S</h1>
                        
                    </div> 
                    <div className="flex justify-center mt-2">
                        <form onSubmit={(e) => e.preventDefault()}> 
                            <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="border border-zinc-600 bg-black-050 rounded-md p-1 pl-4" placeholder="Search tag"/>
                        </form>
                    </div>
                    {addModel && (
                        <AddTags onClose={handleCloseModal} tag={currentTag} fetchData={fetchData} />
                    )}

                    {tagDelete && (
                        <Confirm onClose={() => handleDelete(null, 'close')} tag={tagDelete} deleteTag={() => deleteTag()} />
                        )}
                    <div className="flex justify-end ">  
                        <button onClick={handleAddClick} className="mr-1 bg-orange-600 px-4 md:px-4 md:py-2 py-1 rounded-md shadow-2xl font-mono text-sm md:text-base sm:ml-0">ADD TAGS</button>
                    </div>
                    

                    <div className="flex justify-center">
                        <div className="w-full max-w-3xl"> 
                            <div className="flex justify-around p-3 font-semibold border border-gray-300">
                                <h1 className="w-1/6 text-center">Id</h1>
                                <h2 className="w-1/6 text-center">Name</h2>
                                <h2 className="w-1/3 text-center">Description</h2>
                                <h2 className="w-1/6">Actions</h2>
                            </div>
                        </div>
                    </div>


                    <hr className=" my-2 border-red-700"/>
                    
                    {currentLists.map((tag) => (
                        <div key={tag.id}>

                            <div className="flex justify-center">
                                <div className="w-full max-w-3xl bg-zinc-900"> 
                                    <div className="flex justify-between items-center p-3 border border-gray-400"> 
                                        <h1 className="w-1/6 text-center">{tag.id}</h1>
                                        <h2 className="w-1/6 text-center">{tag.name} </h2>
                                        <h3 onClick={() => handleExpand(tag.id)} className="w-1/3 text-center"> { expandDesc === tag.id  ? tag.description : (tag.description.length > 30 ? `${tag.description.slice(0, 30)}...` : tag.description)  }  </h3>
                                        <div className="w-1/5 gap-2 flex flex-col md:flex-row md:gap-2 text-center"> 
                                            <button onClick={() => handleEditClick(tag)} className="border border-lime-600 text-lime-300 px-3 rounded-md">Edit</button>  
                                            <button onClick={() => handleDelete(tag.id, '')} className="border border-red-500 text-red-300 px-3 py-1 rounded-md">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                    <div className="flex justify-center mt-2">
                        <Pagination color="warning" total={total} initialPage={currentPage} onChange={(page) => setCurrentPage(page) } />
                    </div>

                </div>
                
            </div>

            
        </div>
    )
}

export default Tags



