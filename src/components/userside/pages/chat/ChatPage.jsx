import pic from '../../../../assets/images/deBot.webp'
import profile from '../../../../assets/images/oreo.png'
import Chatarea from './Chatarea'
// import profileImg from '../../../assets/images/prpic.jpeg'


function ChatPage() {

    return(
        <div>
            <div className="flex">
                <div className="w-96 border  border-slate-800 flex h-screen bg-gradient-to-br from-black-050 from-20% via-slate-900 via-30% to-black-050 to-75%">
                    <div className="flex gap-2 w-full">
                        <div className="border border-slate-700 px-2">
                            <div>
                                <span>DH</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="px-2 py-4 ">
                                <div>
                                    <h1 className=" text-lg font-bold">Chats</h1>
                                    <div className="mt-2">
                                        <form>
                                            <input type="text" className="bg-slate-950 border border-slate-700 w-full rounded-md py-1 pl-2 shadow-sm shadow-slate-700" placeholder="search a chat"/>
                                        </form>
                                    </div>
                                </div>
                                <div className="mt-6 h-[calc(100vh-8rem)] overflow-y-auto scroll-smooth custom-scrollbar">
                                    <div className="flex items-center gap-4 py-2 rounded-md hover:bg-slate-900">
                                        <img src={profile} alt="" className="h-10 w-10 rounded-md ml-1" />
                                        <h1>muthappn</h1>
                                    </div>
                                    <div className="flex items-center py-2 gap-4 rounded-md hover:bg-gray-950">
                                        <img src={pic} alt="" className="h-10 w-10 ml-1 rounded-md" />
                                        <h1>uniytten</h1>
                                    </div>
                                    <div className="flex items-center py-2 gap-4 rounded-md hover:bg-gray-950">
                                        <img src={pic} alt="" className="h-10 w-10 ml-1 rounded-md" />
                                        <h1>muthappn</h1>
                                    </div>
                                    <div className="flex items-center gap-4 py-2 rounded-md hover:bg-slate-900">
                                        <img src={profile} alt="" className="h-10 w-10 rounded-md ml-1" />
                                        <h1>muthappn</h1>
                                    </div>
                                    <div className="flex items-center py-2 gap-4 rounded-md hover:bg-gray-950">
                                        <img src={pic} alt="" className="h-10 w-10 ml-1 rounded-md" />
                                        <h1>uniytten</h1>
                                    </div>
                                    <div className="flex items-center py-2 gap-4 rounded-md hover:bg-gray-950">
                                        <img src={pic} alt="" className="h-10 w-10 ml-1 rounded-md" />
                                        <h1>muthappn</h1>
                                    </div>
                                    <div className="flex items-center gap-4 py-2 rounded-md hover:bg-slate-900">
                                        <img src={profile} alt="" className="h-10 w-10 rounded-md ml-1" />
                                        <h1>muthappn</h1>
                                    </div>
                                    <div className="flex items-center py-2 gap-4 rounded-md hover:bg-gray-950">
                                        <img src={pic} alt="" className="h-10 w-10 ml-1 rounded-md" />
                                        <h1>uniytten</h1>
                                    </div>
                                    <div className="flex items-center py-2 gap-4 rounded-md hover:bg-gray-950">
                                        <img src={pic} alt="" className="h-10 w-10 ml-1 rounded-md" />
                                        <h1>muthappn</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
                
                {/* <div className='flex flex-col gap-3 w-full justify-center items-center'>
                    <div>
                        <h1 className='text-4xl text-slate-600 font-bold'>DevHive</h1>
                    </div>
                    <div className='w-80 text-center text-slate-600'>
                        keep engage with your dev buddies, keep chat without any break, have a good communication and get new knowledge from our community
                    </div>
                </div> */}

                <Chatarea />


            </div>
        </div>
    )
}

export default ChatPage 