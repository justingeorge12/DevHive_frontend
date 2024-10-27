import { useEffect, useState } from 'react'
import profileImg from '../../../assets/images/prpic.jpeg'
import api from '../../../services/api'
import AnswerComo from './ProfileCompo/AnswerComo'
import QuestCompo from './ProfileCompo/QuestCompo'
import Nav from '../NavFoot/Nav'
import EditProfile from './ProfileCompo/EditProfile'
import toast from "react-hot-toast"
import { MdLocationOn } from "react-icons/md";


function Profile() {

    const [user, setUser] = useState({})

    const [coinCompo, setCoinCompo] = useState(false)
    const [questionCompo, setQuestionComp] = useState(false)
    const [answerCompo, setAnswerCompo] = useState(false)
    const [saveCompo, setSaveCompo] = useState(false)
    const [editProf, setEditProf] = useState(false)


    useEffect(() => {

        const fetchProfile = async () => {

            try{
                const res = await api.get('userprofile/')
                console.log(res)
                setUser(res.data[0])
            }
            catch(err) {
                console.log(err)
            }
        }   

        fetchProfile() 
    },[])

    console.log(user)


    const handleSection = (value) => {
        setCoinCompo(false)
        setQuestionComp(false)
        setAnswerCompo(false)
        setSaveCompo(false)

        if (value === 'coin'){
            setCoinCompo(true)
        }
        else if(value === 'quest') {
            setQuestionComp(true)
        }
        else if (value === 'ans'){
            setAnswerCompo(true)
        }
        else if(value === 'saved'){
            setSaveCompo(true)
        }
    }



    return(
        <div>
            <Nav />
            <div className="m-24">
                <div className='border relative border-gray-900 bg-gradient-to-br from-black-050  via-gray-900 to-black-050 rounded-xl'>
                    <div className='absolute right-4 top-4 border bg-slate-900 border-slate-400 p-2 rounded-md font-semibold text-slate-300 hover:bg-black hover:shadow-lg hover:shadow-slate-800'>
                        <button onClick={() => setEditProf(!editProf)}>⨭ Edit Profile</button>
                    </div>
                    {editProf && 
                    <div> <EditProfile user={user} onClose={() => setEditProf(false)} /> </div> }
                    <div className='flex items-center gap-10 p-4'>
                        <div className='p-4'>
                            <img src={user.profile || profileImg} alt="profile" className=' h-40 w-40 border border-slate-500 rounded-3xl' />
                        </div>
                        <div>
                            <h1 className='text-3xl'>{user.username}</h1>
                            
                            <div className='mt-4 flex gap-4'>
                                <p className='text-red-100'>324 Followers</p>
                                <p className='text-red-100'>216 Following</p>
                                
                            </div>
                            <div className='text-slate-300'>
                                <p>Software Engineering</p>
                                {user.skill && <p className='mt-1'><span className='text-slate-600'>skill:</span> {user.skill ? `${user.skill} `: ''} </p>}
                                {user.bio && <p className='mt-1'><span className='text-slate-600'>bio:</span> {user.bio ? ` ${user.bio}` : ''}</p>}
                                {user.location && <p className='flex items-center'><span className='text-slate-600 flex items-center '><MdLocationOn />:<span className='mr-1' /> </span>       {user.location} </p>}
                            </div>
                            <div className='flex gap-4'>
                                <p>insta</p>
                                <p>github</p>
                            </div>

                            
                        </div>
                    </div>
                </div>
                <div className='mt-10 p-4 border border-slate-800'>
                    <ul className='flex justify-around'>
                        <li className='cursor-pointer' onClick={() => handleSection('coin')}>COIN {coinCompo ? '⇨' : ''} </li>
                        <li className='cursor-pointer' onClick={() => handleSection('quest')}>QUESTIONS {questionCompo ? '⇨' : ''} </li>
                        <li className='cursor-pointer' onClick={() => handleSection('ans')}>ANSWERS {answerCompo ? '⇨' : ''} </li>
                        <li className='cursor-pointer' onClick={() => handleSection('saved')}>SAVED {saveCompo ? '⇨' : ''} </li>
                    </ul>
                </div>

                <div className='mt-4 p-4 border border-slate-900'>
                    

                    {coinCompo && 
                    <div>
                        <h1> You have {user.coins} coin </h1>
                    </div> }

                    <div>
                        {questionCompo && 
                        <QuestCompo />}
                    </div>

                    <div>
                        {answerCompo && 
                        <AnswerComo />}
                    </div>

                    
                </div>
            </div>

        </div>
    )
}

export default Profile






// bg-gradient-to-tr from-pink-500 to-yellow-500