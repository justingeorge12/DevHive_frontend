
// import {motion} from 'framer-motion'
import { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from "framer-motion";
import profilImg from '../../../../assets/images/noProfile.jpg'
import api from '../../../../services/api';
import toast from "react-hot-toast"




function EditProfile({onClose, user, fetchProfile}) {

    const scrollRef = useRef(null);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({name:user.first_name, skill:user.skill, bio:user.bio, profile:user.profile, phone:user.phone, location:user.location, instagram:user.instagram, telegram:user.telegram, github:user.github})
    const [ image, setImage] = useState(null)
    const [changeImg, setChangeImg] = useState(false)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }


    const handleUploadClick = () => {
        fileInputRef.current.click();
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData()

        data.append('first_name', formData.name);
        data.append('skill', formData.skill);
        data.append('bio', formData.bio);
        data.append('phone', formData.phone);
        data.append('location', formData.location);
        data.append('instagram', formData.instagram);
        data.append('telegram', formData.telegram);
        data.append('github', formData.github);

        if (image) {
            data.append('profile', image);
        }else if (formData.remove_image) {
            data.append('remove_image', true); 
        }

        try{
            const res = await api.patch('updateuserprofile', data)
            
            if (res.status === 200) {
                toast.success('your profile is updated')
                fetchProfile()
            }

            onClose()
            
        }
        catch(err) {
            console.log(err)
            toast.error('there is some error')
            // onclose()
        }
    }

    const { scrollYProgress } = useScroll({ container: scrollRef });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });


    return(
        <div className=' flex justify-center'>
            <div className='absolute  bg-slate-950 w-[620px] h-[460px] p-4 rounded-xl border border-slate-500 shadow-md shadow-slate-600'>
                <div className='absolute right-6 mt-0 '>
                    <p onClick={onClose} className='bg-slate-800 px-2 rounded-md cursor-pointer hover:text-red-500'>✕</p>
                </div>
                <div className='flex justify-center'>
                    <h1 className='text-lg font-bold '> Edit Profile</h1>
                </div>
                <motion.div className="top-0 left-0 right-0 h-1 bg-lime-400 origin-left" style={{ scaleX }} />

                {changeImg && 
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-slate-950 border border-slate-600 rounded-lg p-6 w-80">
                        <h2 className="text-center font-semibold text-lg">Change Profile Photo</h2>
                        <div className="mt-4 space-y-4">
                            <button onClick={handleUploadClick} className="w-full py-2 text-slate-300 font-semibold hover:bg-gray-900 rounded"> Upload Photo </button>
                            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }}  onChange={handleImageChange} />
                            <button onClick={() => {setImage(null); setFormData(prevData => ({...prevData, remove_image: true})); setChangeImg(false) }} className="w-full py-2 text-red-600 font-semibold hover:bg-gray-900 rounded"> Remove Current Photo </button>
                            <button onClick={() => setChangeImg(false)} className="w-full py-2 text-gray-600 font-semibold hover:bg-gray-900 rounded"> Cancel </button>
                        </div>
                    </div>
                </div>
                }



                
                <div ref={scrollRef} className='overflow-y-auto h-[350px] mt-4 custom-scrollbar'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-center mt-4'>
                            <div className=' p-2  rounded-3xl'>
                                <img onClick={() => setChangeImg(true)} src={image ? URL.createObjectURL(image) : formData.profile || profilImg} alt=""  className='w-20 h-20 border rounded-lg' />
                            </div>
                        </div>

                        <div className='mx-2  mt-6'>
                            <p className='font-semibold'>Name:</p>
                            <input name='name' value={formData.name} onChange={handleChange} className='w-full p-2 bg-black-050 my-2 border border-slate-700 rounded-md' />
                            <p className='font-semibold'>Skill:</p>
                            <input name='skill' value={formData.skill} onChange={handleChange} className='w-full p-2 bg-black-050 my-2 border border-slate-700 rounded-md' />
                            <p className='font-semibold'>Bio:</p>
                            <input name="bio" value={formData.bio} onChange={handleChange} className='w-full p-2 bg-black-050 my-2 border border-slate-700 rounded-md' />
                            <p className='font-semibold'>Phone:</p>
                            <input  type='number' name='phone' value={formData.phone} onChange={handleChange} className='w-full p-2 bg-black-050 my-2 border border-slate-700 rounded-md' />
                            <p className='font-semibold'>Location:</p>
                            <input name="location" value={formData.location} onChange={handleChange} className='w-full p-2 bg-black-050 my-2 border border-slate-700 rounded-md' />
                            <div>
                                <p className='font-semibold'> Websites:</p>
                                <div className='flex gap-1'>
                                    <div>
                                        <p className='text-slate-400'>Instagram </p>
                                        <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className='py-2 bg-black-050 border mt-2 border-slate-700 rounded-md' />
                                    </div>
                                    <div>
                                        <p className='text-slate-400'>Telegram</p>
                                        <input name="telegram" value={formData.telegram} onChange={handleChange} type="text" className='py-2 bg-black-050 border mt-2 border-slate-700 rounded-md' />
                                    </div>
                                    <div>
                                        <p className='text-slate-400'>GitHub</p>
                                        <input type="text" name="github" value={formData.github} onChange={handleChange} className='py-2 bg-black-050 border mt-2 border-slate-700 rounded-md' />
                                    </div>
                                </div>
                            </div>
                            <button className='w-full border border-gray-800 font-bold bg-slate-900 shadow-sm shadow-slate-800 rounded-md p-2 my-4'> Submit </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default EditProfile
