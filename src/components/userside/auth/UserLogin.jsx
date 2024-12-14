import xcolor from '../../../assets/images/xcolor.jpg'
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../../services/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../services/constants'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import DotLoading from '../../common/DotLoading'
import { loginSuccess } from '../../../redux/reducers/authSlice'

function UserLogin() {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const [forgtTme, setForgtTime] = useState(0)

    useEffect(() => {
        let timer
        if (forgtTme > 0){
            timer = setInterval(() => {
                setForgtTime(prvTime => prvTime - 1)
            }, 1000);
        }
        console.log(forgtTme)
        return () => clearInterval(timer);
    }, [forgtTme])


    const handleSignInWithGoogle = async (response) => {
        const payload = response.credential
        setLoading(true)
        try{
            const server_res = await api.post('google', {"access_token":payload})
            console.log(server_res,'ssssssssrvr res')
            console.log(server_res.data)
            if (server_res.status === 200) {

                const { access_token, refresh_token, id } = server_res.data;
                dispatch(loginSuccess({ access_token, refresh_token, user_id: id, role:'user' }));

                console.log(server_res)
                navigate('/')
            }
        }
        catch(err) {
            if (err.status === 401) {
                if(err.response && err.response.data && err.response.data.detail && err.response.data.detail === "please continue your login with email") {
                    toast.error('please login manually with your email')
                }
            }
        }
        finally{
            setLoading(false)
        }
    }

 
    // for google auth
    
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_CLIENT_ID,
            callback:handleSignInWithGoogle
        })
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
            theme: "outline",
            size: "large",
            // text: "signin_with",
            // shape:"circle",
            width: "300",
            background_color : 'black'
          });

    }, [])


    const validateInputs = () => {
        const newErr = {}

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)){
            newErr.email = 'email should valid'
        }
        setError(newErr)
        return Object.keys(newErr).length === 0;
    }
    
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault() 
        console.log(email)
        console.log(password)

        if (!validateInputs()) {
            setLoading(false)
            return
        }

        const checkRole = localStorage.getItem('role')
        if (checkRole === 'admin') {
            toast.error('admin is logged please logout and try')
        } 
        else {

        
        setLoading(true)

        try{
            const res = await api.post('/token', {email, password})
            if (res.data.role === 'user' && res.data.is_verified) {
                // localStorage.setItem(ACCESS_TOKEN, res.data.access)
                // localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                // localStorage.setItem('role', res.data.role)
                // localStorage.setItem('user_id', res.data.user_id)

                const { access, refresh, role, user_id } = res.data;
                dispatch(loginSuccess({ access_token: access, refresh_token: refresh, user_id, role }));

                console.log(res)
            
                navigate('/')
            }
            else {
                toast.error('You are not verified !');
            }
            
        } 
        catch (error){
            console.log(error)
            if (error.message === "Network Error"){
                toast.error('server error')
            }
            else if(error.status === 401) {
                toast.error('No active account with this credentials')
            }
            else if (error.response.data.status[0] === "blocked_account") {
                toast.error('You are blocked by admin ')
            }
            else{
                toast.error('Your email and password are not matching')
            }
        }
        finally {
            setLoading(false)
        }

    }

    }


    const handleForget = async () => {
        setLoading(true)
        setForgtTime(6)

        try{
            const res = await api.get('/getemail', {params:{email:email}})

            console.log(res)

            if (res.status === 200) {
                navigate('/forgetpass', {state : {email}})
            }
            else{
                toast.dismiss('there is no user with this email')
            }
        }
        catch(error) {
            console.log(error)
            toast.error('there is no user with this email ')
        }
        finally {
            setLoading(false)
        }
        
    }

    // if (loading){
    //     return (
    //         <Loading loading={loading} />
    //     )
    // }


    return(
        <div className='fixed'>
            <div className='relative'>
                <img src={xcolor} alt="My Image" className="w-full h-auto"/>
                <div className="absolute inset-0 flex justify-center mt-6">
                    <div className='h-[550px] w-[450px] bg-black border-4 rounded-bl-3xl rounded-tr-3xl border-x-green-200 border-y-red-200'>
                        <div className='flex justify-center mt-8'>
                            <h1 className='text-2xl font-extrabold font-mono text-lime-100'> Login </h1>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className='mx-16 mt-20 flex justify-center flex-col gap-10'>
                                <div className='relative '>
                                    {error.email && <p className='absolute right-1 rounded text-red-400 text-xs'>{error.email} </p> }
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full h-10 bg-black border rounded-md pl-3 ' placeholder='email'/>
                                </div>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full h-10 bg-black border rounded-md pl-3' placeholder='password'/>
                                <button type='submit' className='bg-red-500 h-10 rounded-md'> Login </button>
                                
                            </div>
                        </form>
                        <div className='mx-16'>
                            <div className='flex justify-center mt-6'>
                                {forgtTme === 0 ? 
                                    <p onClick={() => {if(email) { handleForget()} else{toast.error('enter your email')}}} className='hover:cursor-pointer'>forgot your password ? </p>
                                    :
                                    <p className='text-slate-400'>forgot your password ?   </p>
                                } 
                                

                              
                            </div>
                            <hr className='mt-4  border-dashed border-pink-600'/>
                            
                            <div className='flex justify-around mt-6 '>
                                
                                <div id='signInDiv'>

                                </div>
                            </div>
                            <div className='justify-center flex mt-6'>
                                <p>I don't have account ! <span onClick={() => {navigate('/register')}} className='hover:text-red-500 cursor-pointer'>Signup</span></p>
                            </div>
                        </div>
                    </div>
                    {loading &&
                    <DotLoading loading={loading}/>}
                </div>
            </div>
        </div>
    )
}


export default UserLogin