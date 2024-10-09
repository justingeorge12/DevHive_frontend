import { useNavigate  } from "react-router-dom"
import HomePage from "../pages/HomePage"
import bot from '../../../assets/images/deBot.webp'

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

                    
                    <div className="h-[300px] md:h-[400px] w-[90%] md:w-[800px] bg-black border-4 border-indigo-400 rounded-3xl"> 
                        <div className="flex flex-col justify-center items-center h-full mx-4 md:mx-6">
                            <p className="text-xl md:text-4xl text-slate-200">This is a Platform for Developers <span className="text-orange-500"> to help, </span><span className="text-teal-500"> to contribute,</span> <span className="text-rose-500"> to solve,</span> <span className="text-yellow-300"> to build</span> all together</p>
                        </div>
                    </div>

                    
                    <div className="h-[300px] md:h-[400px] w-[90%] md:w-[800px] bg-slate-50">
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
            </div>
        </div>

    )
}

export default LandingPage