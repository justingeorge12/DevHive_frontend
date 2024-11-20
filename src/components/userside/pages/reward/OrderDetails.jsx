import { useNavigate } from 'react-router-dom'
import Nav from '../../NavFoot/Nav'
import { useState } from 'react'

function OrderDetails() {

    const navigate = useNavigate()
    // const [orders, setOrders] = useState([])

    const orders = [
        {'id':'756dsf','name':'DevHive Cap', 'date':'7-12-2024', 'address':'valery po, wayanad, 670645', 'status':'placed'},
        {'id':'756dsf','name':'DevHive Cap', 'date':'7-12-2024', 'address':'valery po, wayanad, 670645', 'status':'placed'},
        {'id':'756dsf','name':'DevHive Cap', 'date':'7-12-2024', 'address':'valery po, wayanad, 670645', 'status':'placed'}
    ]

    // const orders = []

    return(
        <div>
            <Nav />
            <div className='mt-24 border border-slate-900'>
                <div className='m-10 mx-4 sm:mx-8 lg:mx-16'>
                    <div className='flex justify-between border border-slate-700 p-3'>
                        <h1 className='text-lg font-bold'>Your Orders</h1>
                        <button onClick={() => navigate('/store')} className='text-blue-600 opacity-70'>Continue shopping from DevHive Store »</button>
                    </div>
                    <div className='border border-slate-700 mt-6 relative overflow-x-auto'>
                        <table className="w-full text-sm text-left rtl:text-right">
                            <thead className="text-sm uppercase border-b border-slate-500">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Order ID</th>
                                    <th scope="col" className="px-6 py-3">Product Name</th>
                                    <th scope="col" className="px-6 py-3">Order Date</th>
                                    <th scope="col" className="px-6 py-3">Order Address</th>
                                    <th scope="col" className="px-6 py-3">Order Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((data, index) => (
                                        <tr key={index} className="border-b border-slate-700">
                                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap" >{data.id}</th>
                                            <td className="px-6 py-4">{data.name}</td>
                                            <td className="px-6 py-4">{data.date}</td>
                                            <td className="px-6 py-4">{data.address}</td>
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

export default OrderDetails