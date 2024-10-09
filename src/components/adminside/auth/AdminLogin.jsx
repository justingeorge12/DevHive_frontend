import { useState } from "react"
import api from "../../../services/api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../services/constants"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function AdminLogin() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const checkRole = localStorage.getItem('role')

        if (checkRole == 'user') {
            toast.error('user is logged in please logout and try')
        }
        else{

            
            try{

                const res = await api.post('/token',{ email, password})

                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                localStorage.setItem('role', res.data.role)
                console.log(res.data.role, 'roooooooooole')
                if (res.data.role === 'admin') {
                    navigate('/admin')
                }

            } 
            catch (error) {
                toast.error('your credentails are incorrrect')
            }
            finally{
                setLoading(false)
            }

        }

    }
    

    return(
        <div>
            <div className="flex justify-center mt-8">
                <div className="h-[500px] w-[450px] border-2 border-yellow-100">
                    <div className="flex justify-center mt-14">
                        <h1 className="font-mono font-extrabold text-2xl text-amber-100"> Admin Login</h1>
                    </div>
                    <div className="mt-24">

                        <form onSubmit = {handleSubmit} >
                            <div className="mx-10 gap-10 flex flex-col">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-10 border-amber-100 border-2 rounded bg-black pl-6" placeholder="enter your email" />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="w-full h-10 border-amber-100 border-2 rounded bg-black pl-6" placeholder="enter your password"/>
                                <button type="submit" className="bg-red-500 h-10 rounded">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default AdminLogin