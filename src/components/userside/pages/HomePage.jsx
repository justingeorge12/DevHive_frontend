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
                        <div className="relative">
                            <button onClick={() => navigate('/questions')} className="right-4 top-4 absolute text-gray-400 font-bold px-4 py-2 shadow-sm shadow-yellow-50 rounded-lg">  Questions</button>
                        </div>
                        <div className="h-full flex flex-col justify-center items-center">
                            <div className="m-4 mx-8">
                                <h1 className="sm:text-3xl font-semibold font-mono text-neutral-500 text-center">From questions to breakthroughs, every coder’s journey is welcome here</h1>
                            </div>
                            <div className="mx-8">
                                <h1 className="sm:text-3xl font-semibold text-slate-500 justify-center flex">" Have a&nbsp; <span className="sm:text-3xl font-bold bg-slate-800 text-transparent bg-gradient-to-br from-purple-800 via-cyan-700 to-purple-800 bg-clip-text "> Question <span className="text-violet-700"> ? </span> </span>  </h1>
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-500 mt-1 text-center"> Our Community Has the <span className="font-bold bg-slate-800 text-transparent bg-gradient-to-b from-slate-400 from-50% to-blue-700 bg-clip-text"> Answer</span> "</h1>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-20 h-[300px] md:h-[400px] w-[90%] md:w-[800px] md:ml-auto border-4 bg-black rounded-3xl border-green-400 shadow-md shadow-green-400  ">
                        <div className="relative mt-4">
                            <button onClick={() => navigate('/users')} className="absolute text-gray-400 right-4 font-bold px-4 py-2 shadow-sm shadow-green-200 rounded-lg"> Users</button>
                        </div>
                        <div className="h-full flex flex-col justify-center items-center">
                            <div className="m-4 mx-8">
                                <h1 className="sm:text-3xl font-semibold font-mono text-neutral-500 text-center">"The Place Where Developers Never Work Alone"</h1>
                            </div>
                            <div className="mx-8">
                                <h1 className="sm:text-3xl font-semibold text-slate-500 justify-center flex"> build a&nbsp; <span className="sm:text-3xl font-bold bg-slate-800 text-transparent bg-gradient-to-br from-orange-400 from-30% via-lime-200  to-orange-400 to-70% bg-clip-text "> Network&nbsp;  </span> support  </h1>
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-500 mt-1 text-center">  <span className="font-bold bg-slate-800 text-transparent bg-gradient-to-b from-slate-400 from-50% to-blue-700 bg-clip-text"> </span> </h1>
                            </div>
                        </div>
                    </div>  

                    <div className="mt-20 h-[300px] md:h-[400px] w-[90%] md:w-[800px] border-sky-400 border-4 rounded-3xl shadow-md shadow-sky-400">
                        <div className="relative mt-4">
                            <button onClick={() => navigate('/chatpage')} className="absolute text-gray-400 right-4 font-bold px-4 py-2 shadow-sm shadow-sky-200 rounded-lg"> Chat </button>
                        </div>
                        <div className="h-full flex flex-col justify-center items-center">
                            <div className="m-4 mx-8">
                                <h1 className="sm:text-3xl font-semibold font-mono text-neutral-500 text-center">"Code with confidence, knowing there’s a community backing you up"</h1>
                            </div>
                            <div className="mx-8">
                                <h1 className="sm:text-3xl font-semibold text-slate-500 justify-center flex"> chat with your inspiring &nbsp; <span className="sm:text-3xl font-bold bg-slate-800 text-transparent bg-gradient-to-br from-blue-700 from-30% via-sky-400  to-blue-600 to-70% bg-clip-text "> Dev&nbsp;  </span> buddies  </h1>
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-500 mt-1 text-center">  <span className="font-bold bg-slate-800 text-transparent bg-gradient-to-b from-slate-400 from-50% to-blue-700 bg-clip-text"> </span> </h1>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-20 h-[300px] md:h-[400px] w-[90%] md:w-[800px] border-rose-700 shadow-md shadow-rose-600 border-4 md:ml-auto rounded-3xl bg-gradient-to-t  from-stone-800 from-1% to-black-050 to-95%">
                        <div className="relative mt-4">
                            <button onClick={() => navigate('/store')} className="absolute text-gray-400 right-4 font-bold px-4 py-2 shadow-sm shadow-rose-300 rounded-lg"> rewards </button>
                        </div>
                        <div className="relative hidden sm:block">
                            <p className="absolute mt-20 left-48 px-1 text-red-500 text-opacity-45">◇</p>
                            <button className="absolute mt-28 left-56 px-4 py-1 rounded-xl bg-red-500 bg-opacity-45 text-black font-semibold">hoodie</button>
                            <p className="absolute mt-40 left-56 px-1 text-red-500 text-opacity-45">◇</p>
                            <button className="absolute mt-48 left-40 px-4 py-1 rounded-xl bg-red-500 bg-opacity-35 text-black font-semibold">keyboard</button>
                        </div>
                        <div className="flex justify-around p-2 mt-12 ">
                            <div className=" w-72  rounded-xl border border-zinc-800 bg-gradient-to-t from-stone-800">
                                <div className="p-6 text-slate-500">
                                    <p className="text-red-300 font-mono">ask more</p>
                                    <p className="text-teal-100 font-mono">give the best from you</p>
                                    <p className="text-yellow-200 ml-8 font-mono">if you give better you will get coin by upvote your question or answer</p>
                                    <p className="text-blue-300 font-mono">using your coin you will get reward from us</p>
                                </div> 
                            </div>
                            {/* <div className="w-52 border">

                            </div> */}
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