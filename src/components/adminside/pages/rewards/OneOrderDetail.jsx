import { useParams } from "react-router-dom"
import Sidebar from "../../layout/Sidebar"
import api from "../../../../services/api";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast'

function OneOrderDetail() {

    const { order_id } = useParams();

    const [loading, setLoading] = useState(false);
    const [orderDetail, setOrderDetail] = useState(null)
    const [status, setStatus] = useState('');
    const [statusCheck, setStatusCheck] = useState('')
    const statusOptions = ['Pending', 'Shipped', 'Delivered', 'Canceled'];


    
    const fetchOrderDetails = async () => {
        try{
            const res = await api.get(`oneorderdetails/${order_id}`)
            setOrderDetail(res.data)
            setStatus(res.data.status)
            setStatusCheck(res.data.status)

        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchOrderDetails()
    },[])


    const handleChangeStatus = async () => {
        setLoading(true)
        try{
            const res = await api.patch(`changeorderstatus/${order_id}`, {status:status})
            if (res.status === 200) {
                toast.success('Order status updated succesfully')
            }else{
                toast.error('Error while updating')
            }
        }
        catch(err) {
            toast.error('Error while updating')
        }
        finally{
            setLoading(false)
        }
    }


    return(
        <div>
            <Sidebar />
            <div className="sm:ml-[200px]">
                <div className="mt-20 mx-8 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    <div className="border border-slate-700 rounded-md p-4">
                        <div>
                            <img src={orderDetail?.product?.image} alt="" className="h-52 rounded-md"/>
                        </div>
                        <div className="mt-6">
                            <h1 className="text-xl font-bold">{orderDetail?.product?.name}</h1>
                            <p><span className="text-slate-500">coins : </span>{orderDetail?.product?.coins}</p>
                            <p className="text-slate-400">{orderDetail?.product?.description}</p>
                        </div>
                    </div>
                    <div className="border border-slate-700 rounded-md">
                        <div className="">
                            <h1 className="flex justify-center mt-2 text-lg font-bold">Address</h1>
                            <div className="p-4 text-slate-300">
                                <h1>{orderDetail?.address?.name} </h1>
                                <p>{orderDetail?.address?.address} </p>
                                <p>{orderDetail?.address?.city} </p>
                                <p>{orderDetail?.address?.state} </p>
                                <p>{orderDetail?.address?.country} </p>
                                <p>{orderDetail?.address?.pincode} </p>
                                <p>{orderDetail?.address?.number} </p>
                            </div>
                        </div>
                    </div>
                    <div className="border border-slate-700 rounded-md relative">
                        <div>
                            <h1 className="flex justify-center mt-2 text-lg font-bold">Change Status</h1>
                            <div className="p-4 ">
                                <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-4 py-2 border bg-black w-full rounded">
                                    {statusOptions.map((statusOption) => (
                                        <option key={statusOption} value={statusOption} >
                                            {statusOption}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-4  lg:absolute bottom-2 w-full">
                                {statusCheck != status ? 
                                    <button onClick={handleChangeStatus} disabled={loading} className=" px-4 py-2 w-full font-bold border border-slate-700 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 rounded">
                                        {loading ? 'Updating...' : 'Update Status'}
                                    </button>
                                : 
                                    <button disabled={loading} className=" cursor-not-allowed px-4 py-2 w-full font-bold border border-slate-700 bg-gradient-to-r from-black-050 via-neutral-700 to-black-050 rounded">
                                        {loading ? 'Updating...' : 'Update Status'}
                                    </button> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneOrderDetail