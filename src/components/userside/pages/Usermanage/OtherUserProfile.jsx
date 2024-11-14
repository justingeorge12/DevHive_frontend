import { useLocation, useNavigate, useParams } from "react-router-dom"
import api from "../../../../services/api"
import { useEffect } from "react"
import Nav from "../../NavFoot/Nav"
import { MdLocationOn } from "react-icons/md";
import profileImg from '../../../../assets/images/prpic.jpeg'
import { useState } from "react";
import NotFound from "../../../common/NotFound";
import toast from 'react-hot-toast'
import FollowModal from "./FollowModal";


function OtherUserProfile() {

    const location  = useLocation()
    const navigate = useNavigate()

    const user_id = location.state?.user_id || ''
    const { username } = useParams()

    const [loading, setLoading] = useState(false)
    const [questionCompo, setQuestionComp] = useState(false)
    const [answerCompo, setAnswerCompo] = useState(false)
    const [otherUserDetails, setOtherUserDetails] = useState([])
    const [followCount,setFollowCount] = useState([])
    const [isFollowing, setIsFollowing] = useState({is_following:false})
    const [showUnFollow, setShowUnFollow] = useState(false);
    const [error, setError] = useState(false);
    const [followModalOpen, setFollowModalOpen] = useState(false);
    const [followType, setFollowType] = useState('');                                          // 'Followers' or 'Following'
    const [followData, setFollowData] = useState([]);

    const fetchUser = async () => {
        try{
            setLoading(true)
            const res = await api.get(`otheruserprofile/${username}`)
            if (res.status === 200) {
                if (res.data.detail && res.data.detail === "Same user profile") {
                    navigate('/profile')
                }
                
                setOtherUserDetails(res.data)
                console.log(res, '-------------------')
                await fetchFollow();
                await fetchIsFollow();
            }
            else{
                setError(true)
            }
        }
        catch(err) {
            console.log(err)
            setError(true)
        }
        finally{
            setLoading(false)
        }
        
    }

    const fetchFollow = async () => {
        try{
            setLoading(true)
            const res = await api.get(`userfollowcount/${username}`)
            setFollowCount(res.data)
        }
        catch (err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    const fetchIsFollow = async () => {
        try{
            setLoading(true)
            const res = await api.get(`isfollowing/${username}`)
            setIsFollowing(res.data)
        }
        catch(err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
        // fetchFollow()
        // fetchIsFollow()
    }, [username])

    const handleFollow = async (user_id) => {
        try{
            const res = await api.post(`follow/${user_id}`)
            console.log(res)
            fetchUser()
        }
        catch (err) {
            console.log(err)
            toast.error('there is a error with follow')
        }   
    }

    const handleUnFollow = async (user_id) => {
        try{
            const res = await api.post(`unfollow/${user_id}`)
            console.log(res)
            setShowUnFollow(false)
            fetchUser()
        }
        catch(err) {
            console.log(err)
            toast.error('there is a error with unfollow')
        }
    }

    const openFollowModal = async (type, user_id) => {
        setFollowType(type);
        setFollowModalOpen(true);

        console.log(type, user_id, 'ooooooooooooooooooooooooooooooiii')

        try{

            const res = await api.get(`${type.toLowerCase()}/${user_id}`)
            setFollowData(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    const handleSection = () => {

    }

    // if (loading) return <div>Loading...</div>;

    if (error) {
        return <div> <NotFound /> </div>;
    }


    return(
        <div>
            <Nav />
            <div className="m-24">
                <div className='border relative border-gray-900 bg-gradient-to-br from-black-050  via-gray-900 to-black-050 rounded-xl'>
                    <div onClick={() => navigate(`/chatpage/${otherUserDetails.id}`)} className='absolute right-4 top-4 font-semibold text-slate-300 cursor-pointer'>
                        message
                    </div>

                    <div className='flex items-center gap-10 p-4'>
                        <div className='p-4'>
                            <img src={otherUserDetails.profile || profileImg} alt="profile" className=' h-40 w-40 border border-slate-500 rounded-3xl' />
                        </div>
                        <div>
                            <div className="flex gap-6 items-center">
                                <h1 className='text-3xl'> {otherUserDetails.username} </h1>
                                <div>
                                    {isFollowing.is_following ?                           
                                        (
                                            <div className="flex flex-col items-end gap-1">
                                                <button onClick={() =>setShowUnFollow(!showUnFollow)} className="border px-2 py-1 rounded-md  border-slate-500 hover:bg-black">following ⏑</button>
                                                {showUnFollow
                                                &&
                                                <div className=" px-2 py-2 rounded-md  bg-black absolute mt-10 gap-1 flex flex-col border border-slate-700 ">
                                                    <button onClick={() => handleUnFollow(otherUserDetails.id)} className="border border-slate-800 px-2 rounded-md text-red-400">Unfollow</button> 
                                                    <button onClick={() => setShowUnFollow(false)} className="border border-slate-800 px-2 rounded-md text-slate-400">cancel</button>
                                                </div>
                                                }
                                            </div>
                                        )
                                        
                                    :
                                        <button onClick={() => handleFollow(otherUserDetails.id) } className="border border-sky-700 px-2 rounded-md text-lg bg-slate-800 text-transparent bg-gradient-to-br from-purple-800 via-cyan-700 to-purple-800 bg-clip-text">Follow</button>

                                    }
                                </div>
                            </div>
                            
                            <div className='mt-4 flex gap-4'>
                                <p onClick={() => openFollowModal('Followers', otherUserDetails.id)} className='text-red-100'> {followCount.follower_count} Followers</p>
                                <p onClick={() => openFollowModal('Following', otherUserDetails.id)} className='text-red-100'> {followCount.following_count} Following</p>
                                
                            </div>
                            {
                                followModalOpen && 
                                <FollowModal isOpen={followModalOpen} onClose={() => setFollowModalOpen(false)} title={followType} followData={followData}/>
                            }
                            
                            <div className='text-slate-300'>
                                {otherUserDetails.first_name && <p className='mt-1'><span className='text-slate-600'>name:</span> {otherUserDetails.first_name ? `${otherUserDetails.first_name} `: ''} </p>}
                                {otherUserDetails.skill && <p className='mt-1'><span className='text-slate-600'>skill:</span> {otherUserDetails.skill ? `${otherUserDetails.skill} `: ''} </p>}
                                {otherUserDetails.bio && <p className='mt-1'><span className='text-slate-600'>bio:</span> {otherUserDetails.bio ? ` ${otherUserDetails.bio}` : ''}</p>}
                                {otherUserDetails.location && otherUserDetails.location !=='null' && <p className='flex items-center'><span className='text-slate-600 flex items-center '><MdLocationOn />:<span className='mr-1' /> </span>{otherUserDetails.location} </p>}
                            </div>
                            

                            
                        </div>
                    </div>

                </div>

                <div className='mt-10 p-4 border border-slate-800'>
                    <ul className='flex justify-around'>
                        <li className='cursor-pointer' onClick={() => handleSection('quest')}>QUESTIONS {questionCompo ? '⇨' : ''} </li>
                        <li className='cursor-pointer' onClick={() => handleSection('ans')}>ANSWERS {answerCompo ? '⇨' : ''} </li>
                    </ul>
                </div>
            </div>       
        </div>
    )
}

export default OtherUserProfile