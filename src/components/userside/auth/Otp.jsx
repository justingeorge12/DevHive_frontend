

import { useRef, useState, useEffect } from 'react';
import xcolor from '../../../assets/images/xcolor.jpg'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../../../services/api';
import toast from 'react-hot-toast';

function Otp() {

    const navigate = useNavigate()
    const location = useLocation()

    const [otp, setOtp] = useState(Array(5).fill(''));
    const [timer, setTimer] = useState(10)
    const [resendOtp, setresendOtp] = useState(false)

    const email = location.state?.email || '';
    const is_forget = location.state?.is_forget || '';
    
    console.log('otp' , otp);

    useEffect(() => {
        if (timer > 0) {
          const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
          }, 1000);
          console.log(timer)
          return () => clearInterval(intervalId); 
        } else {
          
          setresendOtp(true)
        }
      }, [timer]);
    

    const inputRefs = useRef([]);

    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData('text').split('');
        const newOtp = [...otp];

    for (let i = 0; i < 5; i++) {
      if (pastedData[i]) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
  };


  const handleChange = (e, index) => {
      
      const value = e.target.value;
      console.log(value);

    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      
      if (!value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`OTP Entered: ${otp.join('')}`);

    const otpString = otp.join('')
    
    try{
        const res = await api.post('/otp', {email, otp:otpString})

        if (res.status === 200) {
          navigate('/login')
        }

        else {
            console.log(res)
            toast.error('there is a error')
        }

    }
    catch(error) {
        console.log(error)
    }

  };

  const handleResendOtp = async () => {
    
    try{
        const res = api.post('/resendotp', {email})
        setTimer(10)
        setresendOtp(false)
    }
     catch(error) {
        console.log(error)
     }
  }


    return(
            <div className='fixed'>
                <div className='relative'>
                    <img src={xcolor} alt="My Image" className="w-full h-auto"/>
                    <div className="absolute inset-0 flex justify-center mt-6">
                        <div className='h-[550px] w-[450px] bg-black border-4 rounded-bl-3xl rounded-tr-3xl border-x-green-200 border-y-red-200'>
                            <div className='flex justify-center mt-8'>
                                <h1 className='text-2xl font-extrabold font-mono text-lime-100'> OTP </h1>
                            </div>
                            <div className=' mx-16 flex flex-col justify-center mt-20 gap-6'>
                                <p className='text-sm text-slate-400'>check the code we have sent to your mail !</p>
                                

                            <form onSubmit={handleSubmit} className="flex justify-between">
                                    {otp.map((digit, index) => (
                                        <input key={index} type="text" value={digit} onChange={(e) => handleChange(e, index)} onPaste={handlePaste} ref={(el) => (inputRefs.current[index] = el)}
                                        className="w-14 h-14 border text-black bg-red-100 border-gray-300 rounded text-center text-2xl focus:outline-none focus:border-blue-500  duration-200" maxLength={1} />
                                    ))}
                                    </form>
                                    <button type='submit' onClick={handleSubmit} className='bg-red-500 h-10 rounded-md'>Verify</button> 


                                    <div className='justify-center flex'>
                                        <p> resend otp in {timer} s</p>
                                    </div>

                                    

                                    {resendOtp ?
                                    <div className='flex justify-center border h-10 border-e-green-300 border-l-amber-400 bg-black border-b-fuchsia-800 border-t-orange-500'>
                                        <button onClick={handleResendOtp} className='font-medium text-orange-100'>Resend OTP</button>
                                    </div> 
                                        :
                                    <div className='flex justify-center border h-10 border-zinc-600'>
                                        <button  className='font-medium text-zinc-600'>Resend OTP</button>
                                    </div>
                                    }

                            </div>          

                               
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Otp

