import { useEffect, useState } from "react"
import api from "../../../services/api"
import toast from "react-hot-toast"

function AddTags({onClose, tag , fetchData}) {

    const [name, setName] = useState('')
    const [descrip, setDescrip] = useState('')
    const [error, setError] = useState({})

    useEffect(() => {
        if(tag) {
            setName(tag.name)
            setDescrip(tag.description)
        }
    }, [tag])


    const inputValid = () => {

        const newErr = {}

        if(!name.trim()) {
            newErr.name = 'name should not be empty'
        }

        if (descrip.trim().length < 10) {
            newErr.descrip = 'desc length should be inbetween 10 to 50'
        }

        if (!descrip.trim()) {
            newErr.descrip = 'Description should not be empty'
        }
        setError(newErr)
        return Object.keys(newErr).length === 0;
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(name)   
        console.log(descrip)

        if (!inputValid()) {
            return
        }

        try{
            let res
            if(tag) {
                res = await api.put(`tags/${tag.id}/`, {name, description:descrip})
            }
            else {
                res = await api.post('tags/', {name, description:descrip}) 
            }
            
            console.log(res, 'reeeeeeeeeees')
            
            if (res.status === 201  || res.status === 200) {
                toast.success(`tag ${tag ? 'updated' : 'added'} successfully`)
                onClose()
                fetchData()
            }
            else{
                toast.error('your inputs are not valid')
            }
        } 
        catch(error) {
            console.log(error)
            if (error.response) {
                console.log('server responded with an error:', error.resopnse)
            }
            else if (error.request) {
                console.log('Request made butno response received:', error.request)
            }
            else{
                console.log('Error in setting up the request', error.message)
            }
            toast.error(error.response.data.name[0])
        }
    }

    return (
        <>
            
            <div className="relative">
                <div className="absolute inset-0 flex justify-center ">
                    <div className="w-[500px] h-[400px] bg-zinc-800 rounded-xl border-zinc-500 border-2 shadow-zinc-600 shadow-md">
                        <div className="flex justify-end">
                            <button onClick={onClose} className="m-6 absolute z-50" >close</button>
                        </div>
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="w-40 h-24 bg-zinc-700 rounded-3xl shadow-lg shadow-zinc-500 flex justify-center items-center">
                                <h2 className="text-center text-gray-300 font-bold mb-2">{ tag ? "EDIT TAG" : "ADD TAGS"}</h2>
                            </div>
                        </div>
            
                        <div className="relative w-full h-full flex flex-col justify-center  items-center">
                            <form onSubmit={handleSubmit} className="w-3/4">
                                <div className="relative">
                                    {error.name &&  <p className='absolute right-1 rounded text-red-400 text-xs'>{error.name} </p> }
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-slate-300 h-10 w-full text-black rounded-lg px-3" placeholder="Enter tags" />
                                </div>
                                <div className="relative">
                                    {error.descrip  &&  <p className='absolute right-1 top-6 rounded text-red-400 text-xs'>{error.descrip } </p> }
                                    <textarea type="text" value={descrip} onChange={(e) => setDescrip(e.target.value)} className="mt-6 pt-3 bg-slate-300 h-20 w-full text-black rounded-lg px-3" placeholder="enter description" />
                                </div>
                                <button type="submit" className="bg-slate-700 rounded-lg w-full mt-4 h-10 font-bold">submit</button>
                            </form>


                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddTags