import { useState } from 'react'
import xcolor from '../../../assets/images/blckgreen.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../../services/api'

function ResetPass() {

    const navigate = useNavigate()
    const location = useLocation()

    const [password, setPassword] = useState('')
    const [confPass, setConfPass] = useState('')
    const [loading, setLoading]  = useState('')
    const [error, setError] = useState('')

    const email = location.state?.email || ''

    const validateInputs = () => {
        const newErr = {}

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
        e.preventDefault()
        setLoading(true)
        
        if (!validateInputs()) {
            setLoading(false)
            return
        }

        try{
            const res = await api.post('/forgetpass', {email, password})
            console.log(res)

            
            navigate('/otp', {state:{email:email}})
        }
        catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }

    }

    return (
        <div className='fixed'>
                <div className='relative'>
                    <img src={xcolor} alt="My Image" className="w-full h-auto"/>
                    <div className="absolute inset-0 flex justify-center mt-6">
                        <div className='h-[550px] w-[450px] bg-black border-4 rounded-bl-3xl rounded-tr-3xl border-x-green-200 border-y-red-200'>
                            <div className='flex justify-center mt-8'>
                                <h1 className='text-2xl font-extrabold font-mono text-lime-100'> Reset Password </h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className=' mx-16 flex flex-col justify-center mt-20 gap-6'>
                                    <div className='relative '>
                                        {error.password && <p className='absolute right-1 rounded text-red-400 text-xs'>{error.password} </p> }
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full h-10 bg-black border rounded-md pl-6' placeholder='enter your new password'/>
                                    </div>
                                    <div className='relative '>
                                        {error.confPass && <p className='absolute right-1 rounded text-red-400 text-xs'>{error.confPass} </p> }
                                        <input type="password" value={confPass} onChange={(e) => setConfPass(e.target.value)} className='w-full h-10 bg-black border rounded-md pl-6' placeholder='conform your password'/>
                                    </div>
                                    <button type='submit' className='bg-red-500 h-10 rounded-md'>Reset</button>
                                </div>              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ResetPass