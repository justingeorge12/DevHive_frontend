import { useLocation, useNavigate } from "react-router-dom"

function OrderSuccess() {

    const location = useLocation()
    const navigate = useNavigate()

    const address = location.state?.address || ''
    const prodcut = location.state?.product || ''
    const orderdetail = location.state?.orderdetail || ''

    console.log(prodcut)


    return(
        <div className="fixed inset-0 bg-slate-950 bg-opacity-50 flex items-center justify-center z-50 p-10">
            <div className="absolute bg-black border border-slate-600 shadow-md shadow-gray-700 rounded-lg p-6">
                <div className="border-slate-600 rounded-md p-4 ">
                    <h1 className="text-3xl text-lime-200 text-center">Your Order is Successfully placed </h1>
                    <div className="mt-4">
                        <p className="text-slate-400">Your product:</p>
                        <p className="ml-4 font-semibold">{prodcut.name}, <span className="text-slate-400"> {prodcut.description} </span> </p>
                    </div>
                    <div className="mt-4">
                        <p className="text-slate-400">order delivered to : </p>
                        <p className="ml-4 font-semibold"> {address.name}, {address.address}, {address.city}, {address.pincode}, {address.number}</p>
                    </div>
                    <div className="mt-4">
                        <p className="text-slate-400">Expected date :</p>
                        <p className="ml-4 font-semibold"> {orderdetail.expected_date} </p>
                    </div>
                    <div className="mx-6 mt-8 flex justify-around">
                        <button onClick={() => navigate('/')} className="border rounded-md border-slate-500 px-4 py-1">
                            Go Home
                        </button>
                        <button onClick={() => navigate('/orderdetails')} className="border border-slate-600 px-4 py-1 rounded-md" >
                            See Order 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess