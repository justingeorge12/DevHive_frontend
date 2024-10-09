import { useState } from 'react'
import xcolor from '../../../assets/images/blckgreen.jpg'
import { useNavigate,useLocation } from 'react-router-dom'

function ForgetPass() {

    const navigate = useNavigate()
    const location = useLocation()

    const email = location.state?.email || '' ;

    const handleSubmit = async (e) => {
        e.preventDefault()

        navigate('/resetpass', {state:{email}})
    }


    return(
            <div className='fixed'>
                <div className='relative'>
                    <img src={xcolor} alt="My Image" className="w-full h-auto"/>
                    <div className="absolute inset-0 flex justify-center mt-6">
                        <div className='h-[550px] w-[450px] bg-black border-4 rounded-bl-3xl rounded-tr-3xl border-x-green-200 border-y-red-200'>
                            <div className='flex justify-center mt-8'>
                                <h1 className='text-2xl font-extrabold font-mono text-lime-100'> Forget Password </h1>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                                <div className='mx-16 mt-12 flex justify-center flex-col gap-6 '>
                                    <input type="text" onChange={(e) => e.target.value} value={email} className='w-full h-10 bg-black border rounded-md pl-6' placeholder='enter your email'/>
                                    <button type='submit' className='bg-red-500 h-10 rounded-md'> Reset password </button>
                                </div>
                            </form>
                                
                            
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

export default ForgetPass