import { useNavigate } from "react-router-dom"
import Sidebar from "../../layout/Sidebar"
import { useEffect, useState } from "react"
import EditProduct from "./EditProduct"
import api from '../../../../services/api'
import Confirm from '../../modal/Confirm'
import CommonModal from "./CommonModal/CommonModal"

function AdminProduct() {

    const navigate = useNavigate()
    const [editModalOpen, setEditModalOpen] =useState(false)
    const [editData, setEditData] = useState(null)
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("");
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [listModalOpen, setListModalOpen] = useState(false)
    const [message, setMessage] = useState(false)
    const [productId, setProductId] = useState(null) // for pass to list/unlist
    const [isListed, setIsListed] = useState('')
    const onClose = () => {
        setEditModalOpen(false)
    }

    const fetchProducts = async (url = `product?search=${search}`) => {
        const res = await api.get(url)
        console.log(res, 'rrrrrrrrrrrrrrrrrrrrrrrrrrss')
        setProducts(res.data.results)
        setNext(res.data.next);
        setPrevious(res.data.previous);
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    const ListUnlist = async () => {
        const res = await api.patch(`product/${productId}/`, {is_listed:isListed})
        console.log(res)
        setListModalOpen(false)
        fetchProducts()
    }

    return(
        <div>
            <Sidebar />
            <div className="sm:ml-[200px]">
                <div className="mt-10 justify-center flex">
                    <h1 className="font-bold text-xl md:text-2xl font-mono text-rose-200">Products</h1>        
                </div> 
                {editModalOpen &&
                    <EditProduct editData={editData} onClose={onClose} fetchProducts={fetchProducts} />
                }
                <div className="justify-end flex">
                    <div className="absolute mr-4 sm:mr-8 md:mr-8 lg:mr-16">
                        <h1 onClick={() =>  navigate('/admin/addproduct')} className="border rounded-md cursor-pointer border-blue-900 text-blue-600 p-2">Add Product</h1>
                    </div>
                </div>


                <div className='my-4 mt-6 border border-slate-900'>
                    <div className='mx-4 sm:mx-8 lg:mx-16'>
                        {/* pagination  */}
                        <div className="gap-4 flex  ">
                            <div>
                                {previous && 
                                    <button onClick={() => fetchProducts(previous)} className="text-3xl">«</button>}
                            </div>
                            <div>
                                {next && 
                                    <button onClick={() => fetchProducts(next)} className="text-3xl">»</button>}
                            </div>
                        </div>
                        <div className='border border-slate-700 mt-6 rounded-lg relative overflow-x-auto custom-scrollbar'>
                            <table className="w-full text-sm text-left rtl:text-right">
                                <thead className="text-sm uppercase border-b border-slate-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Order ID</th>
                                        <th scope="col" className="px-6 py-3">Product Name</th>
                                        <th scope="col" className="px-6 py-3">Coins</th>
                                        <th scope="col" className="px-6 py-3">Quantity</th>
                                        <th scope="col" className="px-6 py-3">Product Color</th>
                                        <th scope="col" className="px-6 py-3">Image</th>
                                        <th scope="col" className="px-6 py-3">Activity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length > 0 ? (
                                        products.map((data, index) => (
                                            <tr key={index} className="border-b border-slate-700">
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap" >{data.id}</th>
                                                <td className="px-6 py-4">{data.name}</td>
                                                <td className="px-6 py-4">{data.coins}</td>
                                                <td className="px-6 py-4">{data.quantity}</td>
                                                <td className="px-6 py-4">{data.color}</td>
                                                <td> <img src={data.image} alt="" className="h-20 px-6 py-4" /> </td>
                                                <td className="px-6 py-4 gap-2 whitespace-nowrap">
                                                    <button onClick={() => {setEditModalOpen(true); setEditData(data)}} className="px-2 py-1 border border-yellow-700 rounded-sm">Edit</button>
                                                    {data.is_listed ? 
                                                        <button onClick={() => {setListModalOpen(true); setMessage('unlist'); setProductId(data.id); setIsListed(false) }} className="px-2 py-1 ml-2 border border-red-800 rounded-sm">unlist</button>
                                                    : 
                                                        <button onClick={() => {setListModalOpen(true); setMessage('list');  setProductId(data.id); setIsListed(true)} } className="px-2 py-1 ml-2 border border-red-800 rounded-sm">list</button>
                                                    }
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

                            {listModalOpen && 
                            <CommonModal onClose={() => setListModalOpen(false)} ListUnlist={ListUnlist} message={message} /> }                      
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminProduct