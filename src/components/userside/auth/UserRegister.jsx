import xcolor from '../../../assets/images/xcolor.jpg'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ClipLoader } from 'react-spinners';
import { RingLoader } from 'react-spinners';


function UserRegister() {
    
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPass, setConfPass] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})

    const validateInputs = () => {
        const newErr = {}

        if (!username.trim()) {
            newErr.username = 'name shoule not be empty'
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)){
            newErr.email = 'email should valid'
        }

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*])/;
        if (!passwordPattern.test(password)){
            newErr.password = 'should contain 1 letter & 1 spc char'
        }
        if (passwordPattern.test(password) && password.length < 6) {
            newErr.password = 'should have more than 6 letter'
        }

        if (password !== confPass) {
            newErr.confPass = 'password do not match'
        }

        setError(newErr)
        return Object.keys(newErr).length === 0;
    }
    
    

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        console.log(email)
        console.log(password)
        console.log(username)

        if (!validateInputs()) {
            setLoading(false)
            return
        }

        try{
            const res = await api.post('/register',{first_name:username, email, password})
            navigate('/otp' , {state:{email}})
        }
        catch(error) {
            console.log(error)
            if (error.message === "Network Error") {
                toast.error('Network Error')
            }
            else{
                toast.error('there is error with your data')
            }
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <div className='fixed'>
            <div className='relative'>
                <img src={xcolor} alt="My Image" className="w-full h-auto"/>
                <div className="absolute inset-0 flex justify-center mt-6">
                    <div className='h-[550px] w-[450px] bg-black border-4 rounded-bl-3xl rounded-tr-3xl border-x-green-200 border-y-red-200'>
                        <div className='flex justify-center mt-8'>
                            <h1 className='text-2xl font-extrabold font-mono text-lime-100'> Register </h1>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className='mx-16 mt-12 flex justify-center flex-col gap-6 '>
                                <div className='relative '>
                                    {error.username && <p className='absolute right-1 rounded text-red-400 text-xs'>{error.username} </p> }
                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='w-full h-10 bg-black border rounded-md pl-3' placeholder='name'/>
                                </div>
                                <div className='relative '>
                                    {error.email && <p className='absolute right-1 rounded text-red-400 text-xs'>{error.email} </p> }
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full h-10 bg-black border rounded-md pl-3' placeholder='email'/>
                                </div>
                                <div className='relative '>
                                    {error.password && <p className='absolute right-1 rounded text-red-400 text-xs'>{error.password} </p> }
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full h-10 bg-black border rounded-md pl-3' placeholder='password'/>
                                </div>
                                <div className='relative '>
                                    {error.confPass && <p className='absolute right-1 rounded text-red-400 text-xs'>{error.confPass} </p> }
                                    <input type="password" value={confPass} onChange={(e) => setConfPass(e.target.value)} className='w-full h-10 bg-black border rounded-md pl-3' placeholder='conform password'/>
                                </div>

                                <button type='submit' className='bg-red-500 h-10 rounded-md'> Register </button>
                            </div>
                        </form>

                        {/* {loading && (
                            <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black'>
                                <ClipLoader color='#ffffff' loading={loading} size={50} />
                            </div>
                        )} */}

                        {loading && (
                            <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black'>
                                <RingLoader color='#ffffff' loading={loading} size={50} /> 
                            </div>
                        )}

                        <div className='mx-16'>
                            <div className='justify-center flex mt-6'>
                                <p>I already have account ! <span onClick={() => {navigate('/login')}} className='hover:text-red-500 cursor-pointer'>Login</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRegister



