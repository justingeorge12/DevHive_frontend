import { useEffect, useState } from 'react'
import profileImg from '../../../assets/images/prpic.jpeg'
import api from '../../../services/api'
import AnswerComo from './ProfileCompo/AnswerComo'
import QuestCompo from './ProfileCompo/QuestCompo'
import Nav from '../NavFoot/Nav'
import EditProfile from './ProfileCompo/EditProfile'
import toast from "react-hot-toast"
import { MdLocationOn } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import ChangePassword from './ProfileCompo/ChangePassword'
import SavedCompo from './ProfileCompo/SavedCompo'
import FollowModal from './Usermanage/FollowModal'
import { useLocation, useNavigate } from 'react-router-dom'
import AddressModal from './ProfileCompo/modal/AddressModal'


function Profile() {

    const location = useLocation()

    const [user, setUser] = useState({})

    const [coinCompo, setCoinCompo] = useState(false)
    const [questionCompo, setQuestionComp] = useState(false)
    const [answerCompo, setAnswerCompo] = useState(false)
    const [saveCompo, setSaveCompo] = useState(false)
    const [editProf, setEditProf] = useState(false)
    const [openSetting, setOpenSetting] = useState(false)
    const [changePass, setChangePass] = useState(false)
    const [followCount, setFollowCount] = useState([])

    const [followModalOpen, setFollowModalOpen] = useState(false);
    const [followType, setFollowType] = useState('');                                          // 'Followers' or 'Following'
    const [followData, setFollowData] = useState([]);
    
    const [address, setAdderss] = useState([])
    const [manageAddressMOodal, setManageAddressMOodal] = useState(false)

    const openQuestion = location.state?.question || ''
    const openAnswer = location.state?.answer || ''

    const navigate = useNavigate()
    
    
    const fetchProfile = async () => {
        
        try{
            const res = await api.get('userprofile/')
            setUser(res.data[0])
        }
        catch(err) {
            console.log(err)
        }
    }   

    const fetchFollow = async () => {

        try{
            const res = await api.get(`userfollowcount`)
            setFollowCount(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const fetchAddress = async () => {
        try{
            const res = await api.get(`useraddress`)
            setAdderss(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    
    useEffect(() => {
        openQuestion ? handleSection('quest') : ''
        openAnswer ? handleSection('ans') : ''
        fetchFollow()
        fetchProfile() 
        fetchAddress()
    },[])


    const handleSection = (value) => {
        setCoinCompo(false)
        setQuestionComp(false)
        setAnswerCompo(false)
        setSaveCompo(false)
        setOpenSetting(false)

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


    const openFollowModal = async (type, user_id) => {
        setFollowType(type);
        setFollowModalOpen(true);

        try{
            const res = await api.get(`${type.toLowerCase()}/${user_id}`)
            setFollowData(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }


    return(
        <div>
            <Nav />
            {/* <div className="m-24">
                <div className='border relative border-gray-900 bg-gradient-to-br from-black-050  via-gray-900 to-black-050 rounded-xl'>
                    <div className='absolute right-4 top-4 font-semibold text-slate-300'>
                        <div className='flex'>
                            <button onClick={() => {setChangePass(false); setOpenSetting(false); setEditProf(!editProf)}} className='border p-2 border-slate-500 rounded-md hover:bg-black-050 hover:shadow-lg hover:shadow-slate-800' >⨭ Edit Profile</button>
                            <button onClick={() => {setOpenSetting(!openSetting); setEditProf(false); setChangePass(false)} } className=' p-2 ml-2 rounded-md hover:bg-black-050 hover:shadow-lg hover:shadow-slate-800 '><IoSettingsOutline size={26} /></button>
                        </div>
                        {openSetting && 
                            <div>
                                <div className='border text-sm font-normal pl-3 border-gray-700 rounded-md p-2 bg-black-050 mt-1' >
                                    <button onClick={() => setChangePass(!changePass)}> change password </button>
                                </div>
                                {address.length > 0 &&
                                    <div className='border text-sm font-normal pl-3 border-gray-700 rounded-md p-2 bg-black-050 mt-1' >
                                        <button onClick={() => setManageAddressMOodal(!manageAddressMOodal)}>Manage Address</button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    {changePass && 
                        <div className=''>
                            <ChangePassword onClose={() => setChangePass(false)} />
                        </div>
                    }

                    {manageAddressMOodal && 
                    <AddressModal onClose={() => setManageAddressMOodal(false)} address={address} fetchAddress={fetchAddress}/>}


                    {editProf && 
                    <div> <EditProfile user={user} fetchProfile={fetchProfile} onClose={() => setEditProf(false)} /> </div> }
                    <div className='flex items-center gap-10 p-4'>
                        <div className='p-4'>
                            <img src={user.profile || profileImg} alt="profile" className=' h-40 w-40 border border-slate-500 rounded-3xl' />
                        </div>
                        <div>
                            <h1 className='text-3xl'>{user.username}</h1>
                            
                            <div className='mt-4 flex gap-4'>
                                <p onClick={() => openFollowModal('Followers', user.id)} className='text-red-100 cursor-pointer'> {followCount.follower_count} Followers</p>
                                <p onClick={() => openFollowModal('Following', user.id)} className='text-red-100 cursor-pointer'>{followCount.following_count} Following</p>
                                
                            </div>

                            {
                                followModalOpen && 
                                <FollowModal isOpen={followModalOpen} onClose={() => setFollowModalOpen(false)} title={followType} followData={followData}/>
                            }
                            
                            <div className='text-slate-300'>
                                {user.first_name && <p className='mt-1'><span className='text-slate-600'>name:</span> {user.first_name ? `${user.first_name} `: ''} </p>}
                                {user.skill && <p className='mt-1'><span className='text-slate-600'>skill:</span> {user.skill ? `${user.skill} `: ''} </p>}
                                {user.bio && <p className='mt-1'><span className='text-slate-600'>bio:</span> {user.bio ? ` ${user.bio}` : ''}</p>}
                                {user.location && user.location !=='null' && <p className='flex items-center'><span className='text-slate-600 flex items-center '><MdLocationOn />:<span className='mr-1' /> </span>       {user.location} </p>}
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
                        <h1> You have {user.coins ? user.coins : '0'} coin </h1>
                    </div> }

                    <div>
                        {questionCompo && 
                        <QuestCompo />}
                    </div>

                    <div>
                        {answerCompo && 
                        <AnswerComo />}
                    </div>
                    <div>
                        {saveCompo && 
                        <SavedCompo />
                        }
                    </div>

                    
                </div>
            </div> */}



<div className="mt-24 sm:mt-24 md:mt-24 m-4 sm:m-8 md:m-12 lg:m-24">
  <div className="border relative border-gray-900 bg-gradient-to-br from-black-050 via-gray-900 to-black-050 rounded-xl">
    <div className="absolute right-2 top-2 sm:right-4 sm:top-4 font-semibold text-slate-300">
      {/* <div className="flex flex-wrap gap-2 sm:gap-4">
        <button onClick={() => {setChangePass(false); setOpenSetting(false); setEditProf(!editProf);}} className="border p-1 sm:p-2 border-slate-500 rounded-md hover:bg-black-050 hover:shadow-lg hover:shadow-slate-800">
          ⨭ Edit Profile
        </button>
        <button onClick={() => {setOpenSetting(!openSetting); setEditProf(false); setChangePass(false);}} className="p-1 sm:p-2 rounded-md hover:bg-black-050 hover:shadow-lg hover:shadow-slate-800">
          <IoSettingsOutline size={22} className="sm:size-26" />
        </button>
      </div> */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <button onClick={() => {setChangePass(false); setOpenSetting(false); setEditProf(!editProf);}} className="border p-1 sm:p-2 border-slate-500 rounded-md hover:bg-black-050 hover:shadow-lg hover:shadow-slate-800">
                ⨭ Edit Profile
            </button>
            <button onClick={() => {setOpenSetting(!openSetting); setEditProf(false); setChangePass(false); }} className="p-1 flex justify-end sm:p-2 rounded-md sm:hover:bg-black-050 sm:hover:shadow-lg sm:hover:shadow-slate-800">
                <IoSettingsOutline size={22} className="sm:size-26" />
            </button>
        </div>

      {openSetting && (
        <div>
          <div className="border text-xs sm:text-sm font-normal pl-2 sm:pl-3 border-gray-700 rounded-md p-1 sm:p-2 bg-black-050 mt-1">
            <button onClick={() => setChangePass(!changePass)}> Change Password </button>
          </div>
          {address.length > 0 && (
            <div className="border text-xs sm:text-sm font-normal pl-2 sm:pl-3 border-gray-700 rounded-md p-1 sm:p-2 bg-black-050 mt-1">
              <button onClick={() => setManageAddressMOodal(!manageAddressMOodal)} > Manage Address </button>
            </div>
          )}
        </div>
      )}
    </div>
    {changePass && (
      <div>
        <ChangePassword onClose={() => setChangePass(false)} />
      </div>
    )}

    {manageAddressMOodal && (
      <AddressModal
        onClose={() => setManageAddressMOodal(false)}
        address={address}
        fetchAddress={fetchAddress}
      />
    )}

    {editProf && (
      <div>
        <EditProfile
          user={user}
          fetchProfile={fetchProfile}
          onClose={() => setEditProf(false)}
        />
      </div>
    )}
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 p-4">
      <div className="p-2 md:p-4">
        <img
          src={user.profile || profileImg}
          alt="profile"
          className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 border border-slate-500 rounded-3xl"
        />
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl">{user.username}</h1>

        <div className="mt-4 flex gap-2 sm:gap-4">
          <p
            onClick={() => openFollowModal("Followers", user.id)}
            className="text-red-100 cursor-pointer"
          >
            {followCount.follower_count} Followers
          </p>
          <p
            onClick={() => openFollowModal("Following", user.id)}
            className="text-red-100 cursor-pointer"
          >
            {followCount.following_count} Following
          </p>
        </div>

        {followModalOpen && (
          <FollowModal
            isOpen={followModalOpen}
            onClose={() => setFollowModalOpen(false)}
            title={followType}
            followData={followData}
          />
        )}

        <div className="text-slate-300">
          {user.first_name && (
            <p className="mt-1">
              <span className="text-slate-600">Name:</span>{" "}
              {user.first_name ? `${user.first_name} ` : ""}
            </p>
          )}
          {user.skill && (
            <p className="mt-1">
              <span className="text-slate-600">Skill:</span>{" "}
              {user.skill ? `${user.skill} ` : ""}
            </p>
          )}
          {user.bio && (
            <p className="mt-1">
              <span className="text-slate-600">Bio:</span>{" "}
              {user.bio ? ` ${user.bio}` : ""}
            </p>
          )}
          {user.location && user.location !== "null" && (
            <p className="flex items-center">
              <span className="text-slate-600 flex items-center ">
                <MdLocationOn />:<span className="mr-1" />
              </span>{" "}
              {user.location}
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
  <div className="mt-6 md:mt-10 p-2 md:p-4 border border-slate-800">
    <ul className="flex justify-around flex-wrap gap-2 text-sm sm:text-base">
      <li
        className="cursor-pointer"
        onClick={() => handleSection("coin")}
      >
        COIN {coinCompo ? "⇨" : ""}
      </li>
      <li
        className="cursor-pointer"
        onClick={() => handleSection("quest")}
      >
        QUESTIONS {questionCompo ? "⇨" : ""}
      </li>
      <li
        className="cursor-pointer"
        onClick={() => handleSection("ans")}
      >
        ANSWERS {answerCompo ? "⇨" : ""}
      </li>
      <li
        className="cursor-pointer"
        onClick={() => handleSection("saved")}
      >
        SAVED {saveCompo ? "⇨" : ""}
      </li>
    </ul>
  </div>

  <div className="mt-4 p-2 md:p-4 border border-slate-900">
    {coinCompo && (
      <div>
        <h1>
          {" "}
          You have <span className='text-amber-700'>  {user.coins ? user.coins : "0"} </span> coin{" "}
        </h1>
        <h1 onClick={() => navigate('/store')} className='cursor-pointer text-green-400'>see rewards ▷</h1>

      </div>
    )}

    {questionCompo && <QuestCompo />}

    {answerCompo && <AnswerComo />}

    {saveCompo && <SavedCompo />}
  </div>
</div>


        </div>
    )
}

export default Profile






// bg-gradient-to-tr from-pink-500 to-yellow-500