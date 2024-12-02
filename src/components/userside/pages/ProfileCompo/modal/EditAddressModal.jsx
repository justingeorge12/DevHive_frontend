import { useState } from "react";
import api from "../../../../../services/api";
import toast from "react-hot-toast";

function EditAddressModal({onClose, address, fetchAddress}) {

    console.log(address, 'aaaaaaaaaaaaaaaaaaaaaaadrsssssssssssss')

    const [form, setForm] = useState({name:address.name, address:address.address, city:address.city, state:address.state, country:address.country, pincode:address.pincode, number:address.number})
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value}))
        validateField(name, value)
    }
    

    const validateField = (fieldName, value) => {
        const newError = {...errors}

        switch(fieldName) {
            case 'name':
                if (!value.trim() || value.length < 4) {
                    newError.name = 'name length must be more than 4'
                } else{
                    delete newError.name
                }
                break
            case 'address':
                if (!value.trim() || value.length < 6) {
                    newError.address = 'address length must be more than 6'
                } else{
                    delete newError.address;
                }
                break;
            case 'city':
                if (!value.trim()){
                    newError.city = 'city is required'
                }
                else{
                    delete newError.city
                }
                break
            case 'state':
                if (!value.trim()){
                    newError.state = 'state is required'
                }
                else{
                    delete newError.state
                }
                break
            case 'country':
                if (!value.trim()){
                    newError.country = 'country is required'
                }
                else{
                    delete newError.country
                }
                break
            case 'pincode':
                if (!value || isNaN(value)){
                    newError.pincode = 'pincode is required'
                }
                else{
                    delete newError.pincode
                }
                break
            case 'number':
                if (!value || isNaN(value)){
                    newError.number = 'number is required'
                }
                else{
                    delete newError.number
                }
                break
            default:
                break
        }

        setErrors(newError)
    }

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'name is required'
        if (!form.address.trim()) newErrors.address = 'address is required'
        if (!form.city.trim()) newErrors.city = 'city is required'
        if (!form.state.trim()) newErrors.state = 'state is required'
        if (!form.country.trim()) newErrors.country = 'country is required'
        if (!form.pincode) newErrors.pincode = 'pincode is required'
        if (!form.number) newErrors.number = 'phone number is required'
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return
        }

        try{
            const formData = new FormData()
            formData.append("name", form.name)
            formData.append("address", form.address)
            formData.append("city", form.city)
            formData.append("state", form.state)
            formData.append("country", form.country)
            formData.append("pincode", form.pincode)
            formData.append("number", form.number)

            const res = await api.put(`myaddress/${address.id}`, formData)
            console.log(res)
            if (res.status == 200 || res.status === 201) {
                toast.success('address is edited successfully')
                setForm({name:"", address:"", city:"", state:"", country:"", pincode:"", number:""})
                setErrors({}); 
                onClose()
                fetchAddress()
            }
        }

        catch(err) {
            console.error(err)
        }
        
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="absolute bg-slate-900 border border-slate-600 shadow-md shadow-gray-700 rounded-lg px-6 py-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="justify-center flex font-bold text-lg">
                    Add Address
                </div>
                <div className="absolute top-4 right-4 bg-slate-800 rounded-md">
                    <button onClick={() => onClose()} className="px-2 font-bold hover:text-red-600">✕</button>
                </div>
                <div className="sm:w-[400px] md:w-[600px] ">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="block mt-1 text-sm font-medium text-gray-600"> name</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} className="block w-full px-4 py-2  border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block mt-3 text-sm font-medium text-gray-600"> address</label>
                            <input type="text" name="address" value={form.address} onChange={handleChange} className="block w-full px-4 py-2  border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
                            {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                        </div>
                        <div className="grid md:grid-cols-2 gap-2">
                            <div>
                                <label className="block mt-3 text-sm font-medium text-gray-600"> city</label>
                                <input type="text" name="city" value={form.city} onChange={handleChange} className="block w-full px-4 py-2  border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
                                {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                            </div>
                            <div>
                                <label className="block mt-3 text-sm font-medium text-gray-600"> state</label>
                                <input type="text" name="state" value={form.state} onChange={handleChange} className="block w-full px-4 py-2  border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
                                {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2">
                            <div>
                                <label className="block mt-3 text-sm font-medium text-gray-600"> country</label>
                                <input type="text" name="country" value={form.country} onChange={handleChange} className="block w-full px-4 py-2  border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
                                {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                            </div>
                            <div>
                                <label className="block mt-3 text-sm font-medium text-gray-600"> pincode </label>
                                <input type="number" name="pincode" value={form.pincode} onChange={handleChange} className="block w-full px-4 py-2  border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
                                {errors.pincode && <p className="text-red-500 text-xs">{errors.pincode}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block mt-3 text-sm font-medium text-gray-600"> Phone number</label>
                            <input type="number" name="number" value={form.number} onChange={handleChange} className="block w-full px-4 py-2  border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
                            {errors.number && <p className="text-red-500 text-xs">{errors.number}</p>}
                        </div>
                        <div className="border border-slate-600 flex justify-center mt-3 rounded-md bg-gradient-to-r from-blue-950 via-slate-950 to-blue-950">
                            <button className="p-2 text-lg font-bold text-blue-100">Submit</button>
                        </div>
                    </form>
                </div>              
            </div>
        </div>
    )
}

export default EditAddressModal