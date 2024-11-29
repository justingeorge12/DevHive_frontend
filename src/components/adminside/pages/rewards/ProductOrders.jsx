import { useEffect, useState } from "react"
import api from "../../../../services/api"
import Sidebar from "../../layout/Sidebar"
import { useNavigate } from "react-router-dom"

function ProductOrders() {

    const  navigate = useNavigate()

    const [orderList, setOrderList] = useState([])

    const fetchOrders = async () => {
        
        try{
            const res = await api.get('orderlist')
            setOrderList(res.data)
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])


    return(
        <div>
            <Sidebar />
            <div className='sm:ml-[200px] border border-slate-900'>
                <div className='m-10 mx-4 sm:mx-8 lg:mx-16'>
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-bold">Orders</h1>
                    </div>
                    <div className='border border-slate-700 mt-6 relative overflow-x-auto custom-scrollbar'>
                        <table className="w-full text-sm text-left rtl:text-right">
                            <thead className="text-sm uppercase border-b border-slate-500">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Order ID</th>
                                    <th scope="col" className="px-6 py-3">Orderd User</th>
                                    <th scope="col" className="px-6 py-3">Product Name</th>
                                    <th scope="col" className="px-6 py-3">Product Image</th>
                                    <th scope="col" className="px-6 py-3">Order Date</th>
                                    <th scope="col" className="px-6 py-3">Order Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.length > 0 ? (
                                    orderList.map((data, index) => (
                                        <tr onClick={()=> navigate(`/admin/oneorderdetail/${data.id}`)} key={index} className="border-b border-slate-700">
                                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap" >{data.id}</th>
                                            <td className="px-6 py-4">{data.user.username}</td>
                                            <td className="px-6 py-4">{data.product.name}</td>
                                            <td className="px-6 py-4"> <img src={data.product.image} alt="" className="h-14" /></td>
                                            <td className="px-6 py-4">{data.order_date}</td>
                                            <td className="px-6 py-4">{data.status}</td>
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
        </div>
    )
}

export default ProductOrders 