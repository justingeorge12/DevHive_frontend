import { useLocation, useNavigate } from "react-router-dom"

function OrderCancel() {

    const location = useLocation()
    const navigate = useNavigate()

    const detail = location.state?.detail || ''

    return(
        <div className="fixed inset-0 bg-slate-950 bg-opacity-50 flex items-center justify-center z-50 p-10">
            <div className="absolute bg-black border border-slate-600 shadow-md shadow-gray-700 rounded-lg p-6">
                <div className="border-slate-600 rounded-md p-4 ">
                    <h1 className="text-3xl text-slate-50 text-center"> Unfortunatily Your Order is cancelled</h1>
                    <div className="mt-4 justify-center flex">
                        <p className="text-red-400 text-xl">{detail}</p>
                    </div>
                    <div className="mx-6 mt-8 flex justify-around">
                        <button onClick={() => navigate('/')} className="border rounded-md border-slate-500 px-4 py-1">
                            Go Home
                        </button>
                        <button onClick={() => navigate('/store')} className="border border-slate-600 px-4 py-1 rounded-md" >
                            Go to store 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCancel