import { useNavigate  } from "react-router-dom"
import bot from '../../../assets/images/deBot.webp'
import { IconCloudDemo } from "../ui/magicui/IconCloudDemo"

function LandingPage() {

    const navigte = useNavigate()

    return(

        <div>
            <div className="h-20 bg-black shadow-sm shadow-sky-600 fixed top-0 left-0 right-0 z-50">
                <div className="flex justify-between items-center h-full mx-4 md:mx-8">
                    <h1 className="font-bold text-lg md:text-2xl">DevHive</h1> 
                    <div className="flex space-x-6 ">
                        <p onClick={() => {navigte('/login')}} className="cursor-pointer text-sm md:text-base">Login</p> 
                        <p onClick={() => {navigte('/register')}} className="cursor-pointer text-sm md:text-base">Register</p>
                    </div>
                </div>
            </div>

    
            <div className="mt-20">
                <div className="flex flex-col justify-center items-center p-8 md:p-16 gap-10 md:gap-20"> 

                    
                    <div className="h-[300px] md:h-[400px] w-[90%] md:w-[800px] bg-black border-8 border-indigo-500 rounded-3xl"> 
                        <div className="flex flex-col justify-center items-center h-full mx-4 md:mx-6">
                            <p className="text-xl md:text-4xl text-slate-200">This is a Platform for Developers <span className="text-orange-500"> to help, </span><span className="text-teal-500"> to contribute,</span> <span className="text-rose-500"> to solve,</span> <span className="text-yellow-300"> to build</span> all together</p>
                        </div>
                    </div>

                    
                    <div className="h-[300px] md:h-[400px] w-[90%] md:w-[800px] border-8 border-purple-600 rounded-3xl bg-slate-50">
                        <div className="p-4 md:p-8">
                            <h2 className="text-lg md:text-2xl">This is a Platform for Developers</h2> 
                        {/* <img src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/662fa569e650b7bdf2f5d8b4_WUMPUS_LEAN_MOUTH.webp" alt="" /> */}
                        <img src={bot} alt="bot"  />
                        </div>
                    </div>

                    
                    <div className="h-[300px] md:h-[400px] w-[90%] md:w-[800px] bg-slate-50">
                        <div className="p-4 md:p-8">
                            <h2 className="text-lg md:text-2xl">This is a Platform for Developers</h2>
                        </div>
                    </div>

                </div>

                {/* <div className="border border-slate-900 my-8 p-1">
                    <div>
                        <div className="flex justify-between my-8">
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-yellow-300 opacity-60 font-semibold">Learn</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-neutral-300 opacity-60 font-semibold">Question</p>
                            <p className="bg-teal-500 px-8 py-4 rounded-full text-black opacity-60 font-semibold">Git</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-pink-600 opacity-60 font-semibold">Caps lock</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-slate-500 opacity-60 font-semibold">Network </p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-yellow-300 font-semibold">Answers</p>
                            <p className="bg-zinc-700 px-6 py-4 rounded-full text-slate-500 opacity-70 font-semibold">Team Building</p>
                        </div>
                        <div className="flex justify-around my-8">
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-purple-400 opacity-70 font-semibold">Solve</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-lime-300  font-semibold">Contribute</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-yellow-300 opacity-50 font-semibold">Software</p>
                            <p className="bg-zinc-700  px-8 py-4 rounded-full  opacity-50 font-semibold"> Tag</p>
                            <p className="bg-orange-600 px-8 py-4 rounded-full text-black opacity-50 font-semibold">Communicate</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-slate-500 opacity-50 font-semibold">Collect</p>
                        </div>
                        <div className="flex justify-between my-8 items-center">
                            <p className="bg-zinc-700 px-6 py-4 rounded-full text-yellow-300 opacity-60 font-semibold">Deep learning</p>
                            <p className="bg-zinc-700 px-6 py-4 rounded-full text-slate-500 opacity-60 font-semibold">Artificial Inteligence</p>
                            <p className="text-4xl font-bold font-mono bg-gradient-to-b "> <span className="text-orange-300"> DevHive </span> is a plate form for, </p>
                            <p className="bg-lime-200 px-6 py-4 rounded-full text-black opacity-60 font-semibold ">Coding</p>
                            <p className="bg-zinc-700 px-6 py-4 rounded-full text-slate-500 opacity-60 font-semibold">Python</p>
                            <p className="bg-zinc-700 px-6 py-4 rounded-full text-slate-500  font-semibold">Self</p>
                        </div>
                        <div className="flex justify-evenly my-8 items-center">
                            <p className="bg-zinc-700 px-6 py-4 rounded-full text-red-500 opacity-80 font-semibold">Google</p>
                            <p className=" bg-blue-600 px-6 py-4 rounded-full text-black opacity-60 font-semibold">Productivity</p>
                            <p className="bg-zinc-700 px-6 py-4 rounded-full opacity-70 font-semibold ">Chat</p>
                            <p className="text-4xl font-bold font-mono bg-gradient-to-b"> Developers </p>
                            <p className="bg-red-300 px-6 py-4 rounded-full text-black opacity-40 font-semibold ">push</p>
                            <p className="bg-zinc-700 px-6 py-4 rounded-full text-yellow-300 opacity-60 font-semibold">Server error</p>
                            <p className="bg-zinc-700 px-6 py-4 rounded-full text-rose-500 opacity-60 font-semibold">GPT</p>
                        </div>
                        <div className="flex justify-between my-8">
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-yellow-300 opacity-60 font-semibold">Linked List</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-neutral-300 opacity-60 font-semibold">Dev Tools</p>
                            <p className="bg-fuchsia-400 px-8 py-4 rounded-full text-black opacity-60 font-semibold">Profile</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-pink-600 opacity-60 font-semibold">DevHiv</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-slate-400 opacity-50 font-semibold">Software Engineering </p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-slate-500 font-semibold">Email</p>
                            <p className="bg-zinc-700 px-6 py-4 rounded-full text-yellow-300 opacity-70 font-semibold">Cherry pick</p>
                        </div>
                        <div className="flex justify-around my-8">
                            <p className="bg-green-400 px-8 py-4 rounded-full opacity-50 font-semibold">200 Ok</p>
                            <p className="bg-stone-700 px-8 py-4 rounded-full  opacity-75 font-semibold">Focus</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full   font-semibold">Develop</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-yellow-300 opacity-50 font-semibold">Time</p>
                            <p className="bg-zinc-700  px-8 py-4 rounded-full  opacity-50 font-semibold"> Logical Thinking !</p>
                            <p className="bg-zinc-700 px-8 py-4 rounded-full text-sky-300 opacity-50 font-semibold">Data base</p>
                        </div>
                    </div>
                </div> */}




                <div className="border border-slate-900 my-8 p-1">
                <div>
                    <div className="flex flex-wrap md:justify-between justify-center gap-4 my-8">
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-yellow-300 opacity-60 font-semibold">Learn</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-neutral-300 opacity-60 font-semibold">Question</p>
                    <p className="bg-teal-500 px-6 py-3 md:px-8 md:py-4 rounded-full text-black opacity-60 font-semibold">Git</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-pink-600 opacity-60 font-semibold">Caps lock</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-slate-500 opacity-60 font-semibold">Network</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-yellow-300 font-semibold">Answers</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-6 md:py-4 rounded-full text-slate-500 opacity-70 font-semibold">Team Building</p>
                    </div>

                    <div className="flex flex-wrap md:justify-around justify-center gap-4 my-8">
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-purple-400 opacity-70 font-semibold">Solve</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-lime-300 font-semibold">Contribute</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-yellow-300 opacity-50 font-semibold">Software</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full opacity-50 font-semibold">Tag</p>
                    <p className="bg-orange-600 px-6 py-3 md:px-8 md:py-4 rounded-full text-black opacity-50 font-semibold">Communicate</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-slate-500 opacity-50 font-semibold">Collect</p>
                    </div>

                    <div className="flex flex-wrap md:justify-between justify-center gap-4 my-8 items-center">
                    <p className="bg-zinc-700 px-6 py-3 md:px-6 md:py-4 rounded-full text-yellow-300 opacity-60 font-semibold">Deep learning</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-6 md:py-4 rounded-full text-slate-500 opacity-60 font-semibold">Artificial Intelligence</p>
                    <p className="text-3xl md:text-4xl font-bold font-mono bg-gradient-to-b"> <span className="text-orange-300"> DevHive </span> is a platform for, </p>
                    <p className="bg-lime-200 hidden md:block px-6 py-3 md:px-6 md:py-4 rounded-full text-black opacity-60 font-semibold">Coding</p>
                    <p className="bg-zinc-700 hidden md:block px-6 py-3 md:px-6 md:py-4 rounded-full text-slate-500 opacity-60 font-semibold">Python</p>
                    <p className="bg-zinc-700 hidden md:block px-6 py-3 md:px-6 md:py-4 rounded-full text-slate-500 font-semibold">Self</p>
                    </div>

                    <div className="flex flex-wrap md:justify-evenly justify-center gap-4 my-8 items-center">
                    <p className="bg-zinc-700 hidden md:block px-6 py-3 md:px-6 md:py-4 rounded-full text-red-500 opacity-80 font-semibold">Google</p>
                    <p className="bg-blue-600 hidden md:block px-6 py-3 md:px-6 md:py-4 rounded-full text-black opacity-60 font-semibold">Productivity</p>
                    <p className="bg-zinc-700 hidden md:block px-6 py-3 md:px-6 md:py-4 rounded-full opacity-70 font-semibold">Chat</p>
                    <p className="text-3xl md:text-4xl font-bold font-mono bg-gradient-to-b">Developers</p>
                    <p className="bg-red-300 hidden md:block px-6 py-3 md:px-6 md:py-4 rounded-full text-black opacity-40 font-semibold">Push</p>
                    <p className="bg-zinc-700 hidden md:block px-6 py-3 md:px-6 md:py-4 rounded-full text-yellow-300 opacity-60 font-semibold">Server error</p>
                    <p className="bg-zinc-700 hidden md:block px-6 py-3 md:px-6 md:py-4 rounded-full text-rose-500 opacity-60 font-semibold">GPT</p>
                    </div>

                    <div className="flex flex-wrap md:justify-between justify-center gap-4 my-8">
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-yellow-300 opacity-60 font-semibold">Linked List</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-neutral-300 opacity-60 font-semibold">Dev Tools</p>
                    <p className="bg-fuchsia-400 px-6 py-3 md:px-8 md:py-4 rounded-full text-black opacity-60 font-semibold">Profile</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-pink-600 opacity-60 font-semibold">DevHiv</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-slate-400 opacity-50 font-semibold">Software Engineering</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-slate-500 font-semibold">Email</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-6 md:py-4 rounded-full text-yellow-300 opacity-70 font-semibold">Cherry pick</p>
                    </div>

                    <div className="flex flex-wrap md:justify-around justify-center gap-4 my-8">
                    <p className="bg-green-400 px-6 py-3 md:px-8 md:py-4 rounded-full opacity-50 font-semibold">200 Ok</p>
                    <p className="bg-stone-700 px-6 py-3 md:px-8 md:py-4 rounded-full opacity-75 font-semibold">Focus</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold">Develop</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-yellow-300 opacity-50 font-semibold">Time</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full opacity-50 font-semibold">Logical Thinking!</p>
                    <p className="bg-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-sky-300 opacity-50 font-semibold">Database</p>
                    </div>
                </div>
                </div>


                <div className="h-10 bg-gray-600">
                    hey 
                </div>

                <div className="mt-10">
                    <IconCloudDemo />
                </div>



            </div>
        </div>

    )
}

export default LandingPage