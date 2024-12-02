import toast from "react-hot-toast"
import api from "../../../../../services/api"
import { useState } from "react"
import EditAddressModal from "./EditAddressModal"


function AddressModal({onClose, address, fetchAddress}) {

    
    const [editAddress, setEditAddress] = useState(false)
    const [editAddressModal, setEditAddressModal] = useState(false)


    const handleDelete = async (id) => {
        try{
            const res = await api.patch(`myaddress/${id}`, {is_available:false})
            if (res.status === 200) {
                toast.success('address is deleted succssfully')
                onClose()
                fetchAddress()
            }
        }
        catch(err){
            console.log(res)
        }

    }

    return(
        <div className='fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50 p-10'>
            <div className="relative bg-black m-10 mx-14 border border-slate-600 rounded-md p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <h1 className="text-2xl font-bold text-center mb-6 text-slate-400">Address</h1>
                <div className="absolute top-4 right-4 bg-slate-800 rounded-md px-2 hover:text-red-600" >
                    <button onClick={() => onClose()} > ✕ </button>
                </div>
                <div className="p-4  border-slate-600 rounded-md">
                    {address.map((data, ndx) => (
                        <div key={ndx} className="p-2  flex justify-between gap-4 text-gray-500">
                            <div className="border border-slate-600 rounded-sm w-full p-2">
                                <h1>{data.name}, {data.address}, {data.city} </h1>
                                <h1>{data.state}, {data.country}, {data.pincode}, {data.number} </h1>
                            </div>
                            <div className="justify-between grid gap-2">
                                <button onClick={() => {setEditAddressModal(true); setEditAddress(data)}} className="border border-blue-900 px-2 rounded-sm text-blue-800">Edit</button>
                                <button onClick={() => handleDelete(data.id)} className="border border-red-900 px-2 rounded-sm text-red-800">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                {editAddressModal &&
                    <EditAddressModal onClose={() => setEditAddressModal(false)} address={editAddress} fetchAddress={fetchAddress}/>} 
            </div>
        </div>
    )
}

export default AddressModal