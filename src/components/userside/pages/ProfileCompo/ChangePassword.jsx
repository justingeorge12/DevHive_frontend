import { useState } from "react"
import toast from "react-hot-toast"
import api from "../../../../services/api"
import { useNavigate } from "react-router-dom"

function ChangePassword({onClose}) {

    const [current, setCurrent] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const validateInputs = () => {
        const newErr = {}

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*])/;

        if (!passwordPattern.test(current)) {
            newErr.current = 'should contain 1 letter & 1 spc char'
        }

        if (passwordPattern.test(current) && current.length < 6) {
            newErr.current = 'should have more than 6 letter'
        }

        if (!passwordPattern.test(newPass)){
            newErr.newPass = 'should contain 1 letter & 1 spc char'
        }
        if (passwordPattern.test(newPass) && newPass.trim().length < 6) {
            newErr.newPass = 'should have more than 6 letter'
        }

        if (newPass !== confirm) {
            newErr.confirm = 'password do not match'
        }

        setError(newErr)
        return Object.keys(newErr).length === 0;
    }

    const handleLogout = async () => {
        try{
          const token = localStorage.getItem('refresh')
    
          const res = await api.post('logout', {token})
          localStorage.clear()
          delete api.defaults.headers.common["Authorization"];
          navigate('/login')
    
        }
        catch (err) {
          console.log(err)
          localStorage.clear()
          delete api.defaults.headers.common["Authorization"];
          navigate('/login')
        }
      }
    



    const passwordSubmit = async (e) => {
        e.preventDefault()

        console.log(current)
        console.log(newPass)
        console.log(confirm)

        if (!validateInputs()) {
            return
        }

        try{
            setLoading(true)
            const res = await api.post('changepassword',{current_password: current, new_password:newPass})
            
            toast.success('your password is success fully changed, please login with new password')

            handleLogout()
        }
        catch(err) {
            console.log(err)
            if (err.response && err.response.data && err.response.data.current_password) {
                toast.error(err.response.data.current_password)
            }
            setCurrent('')
            
        }
        finally{
            setLoading(false)
        }
        
    }

    return(
        <div className="flex justify-center">
            <div className='absolute  bg-slate-950 w-[420px] h-[400px] p-4 rounded-xl border border-slate-500 shadow-md shadow-slate-600'>
            <div className='absolute right-6 mt-0 '>
                    <p onClick={onClose}  className='bg-slate-800 px-2 rounded-md cursor-pointer hover:text-red-500'>✕</p>
                </div>
                <div className='flex justify-center'>
                    <h1 className='text-lg font-bold mt-4'> Change Password</h1>
                </div>
                <form onSubmit={passwordSubmit}>
                    <div className="mt-8 mx-1 ">
                        {error.current && <p className="absolute right-4 text-sm text-red-400"> {error.current} </p> }
                        <p className="text-slate-400">Current Password</p>
                        <input onChange={(e) => setCurrent(e.target.value)} value={current} type="password" className="w-full p-2 bg-black-050 border border-slate-700 rounded-md" />
                        {error.newPass && <p className="absolute right-4 text-sm mt-2 text-red-400"> {error.newPass} </p> }
                        <p className="mt-2 text-slate-400">New Password</p>
                        <input onChange={(e) => setNewPass(e.target.value)} type="password" className="w-full p-2 bg-black-050 border border-slate-700 rounded-md"/>
                        {error.confirm && <p className="absolute right-4 text-sm mt-2 text-red-400"> {error.confirm} </p> }
                        <p className="mt-2 text-slate-400">Confirm Password</p>
                        <input onChange={(e) => setConfirm(e.target.value)} type="password" className="w-full p-2 bg-black-050 border border-slate-700 rounded-md"/>
                        <button type="submit" className="w-full mt-6 border p-2 rounded-md bg-gradient-to-br font-semibold">Submit</button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default ChangePassword