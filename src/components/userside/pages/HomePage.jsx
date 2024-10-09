import Nav from "../NavFoot/Nav"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


function HomePage() {

    const navigate = useNavigate()

    const counter = useSelector(state => state.counter)
    const auth = useSelector(state => state.auth)
    console.log(auth)

    return(
        <div>
            <Nav />
            <div className="">

                <div className="mx-6 mt-32">

                    <div className="mt-20 h-[300px] md:h-[400px] w-[90%] md:w-[800px] border-yellow-200 border-4 shadow-md  shadow-yellow-300 rounded-3xl">
                        <div className="mt-6 ml-6">
                            w{counter}jey
                            {/* <p>{auth}</p> */}
                        </div>
                    </div>
                    
                    <div className="mt-20 h-[300px] md:h-[400px] w-[90%] md:w-[800px] md:ml-auto border-4 bg-black rounded-3xl border-green-400 ">
                        <div>
                            <button onClick={() => navigate('/find')} className="border border-y-lime-400 px-2 py-2 rounded-lg"> Ask Question </button>
                        </div>
                    </div>  

                    <div className="mt-20 h-[300px] md:h-[400px] w-[90%] md:w-[800px] border-sky-400 border-4 rounded-3xl ">
                        <div>
                            <button className="border px-2 py-2 rounded-lg"> Find Answers </button>
                        </div>
                    </div>
                    
                    <div className="mt-20 h-[300px] md:h-[400px] w-[90%] md:w-[800px] border-rose-700 border-4 md:ml-auto rounded-3xl">
                    <div>
                            <button className="border px-2 py-2 rounded-lg"> connect devi's </button>
                        </div>
                    </div><br />
                </div>  
                
            </div>


            {/* <Nav />
            <div className="mt-20">
                <div className="flex flex-col justify-center items-center p-8 md:p-16 gap-10 md:gap-20"> 
                    
                    <div className="h-[300px] md:h-[400px] w-[90%] md:w-[800px] bg-black border-4 border-indigo-400 rounded-3xl"> 
                        <div className="flex flex-col justify-center items-center h-full mx-4 md:mx-6">
                            <p className="text-xl md:text-4xl text-slate-200">This is a Platform for Developers <span className="text-orange-500"> to help, </span><span className="text-teal-500"> to contribute,</span> <span className="text-rose-500"> to solve,</span> <span className="text-yellow-300"> to build</span> all together</p>
                        </div>
                    </div>

                    <div className="h-[300px] md:h-[400px] w-[90%] md:w-[800px] bg-black border-4 border-indigo-400 rounded-3xl"> 
                        <div className="flex flex-col justify-center items-center h-full mx-4 md:mx-6">
                            <p className="text-xl md:text-4xl text-slate-200">This is a Platform for Developers <span className="text-orange-500"> to help, </span><span className="text-teal-500"> to contribute,</span> <span className="text-rose-500"> to solve,</span> <span className="text-yellow-300"> to build</span> all together</p>
                        </div>
                    </div>

                </div>
            </div> */}
        </div>
    )
}

export default HomePage