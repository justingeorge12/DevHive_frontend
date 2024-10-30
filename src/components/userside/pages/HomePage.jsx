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
                        <div className="relative mt-4">
                            <button onClick={() => navigate('/users')} className="right-4 absolute text-gray-400 font-bold px-4 py-2 shadow-sm shadow-yellow-50 rounded-lg"> Users</button>
                        </div>
                        <div className="m-10">
                            <div className="text-3xl border border-green-100 p-4 rounded-md mr-16">
                                find your buddies from here 
                            </div>
                            <div className="text-2xl mt-6 ml-10 border border-green-100 p-4 rounded-md mr-16">
                                Follow them 
                            </div>
                            <div className="text-xl mt-6 ml-20 border border-green-100 p-4 rounded-md mr-16">
                                Interact with them 
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-20 h-[300px] md:h-[400px] w-[90%] md:w-[800px] md:ml-auto border-4 bg-black rounded-3xl border-green-400 ">
                        <div className="relative mt-4">
                            <button onClick={() => navigate('/questions')} className="absolute text-gray-400 right-4 font-bold px-4 py-2 shadow-sm shadow-green-200 rounded-lg">Questions</button>
                        </div>
                        <div className="m-10">
                            <div className="text-3xl border border-green-100 p-4 rounded-md mr-24">
                                find your Answer for Bugs
                            </div>
                            <div className="text-2xl mt-6 ml-10 border border-green-100 p-4 rounded-md mr-24">
                                Or Ask Question
                            </div>
                            <div className="text-xl mt-6 ml-20 border border-green-100 p-4 rounded-md mr-24">
                                Get Answer from Public
                            </div>
                        </div>
                    </div>  

                    <div className="mt-20 h-[300px] md:h-[400px] w-[90%] md:w-[800px] border-sky-400 border-4 rounded-3xl ">
                        <div className="relative mt-4">
                            <button onClick={() => navigate('/tags')} className="absolute text-gray-400 right-4 font-bold px-4 py-2 shadow-sm shadow-sky-200 rounded-lg"> Find Tags </button>
                        </div>
                        <div className="m-10">
                            <div className="text-3xl border border-green-100 p-4 rounded-md mr-24">
                                find Tags for add in your question
                            </div>
                            <div className="text-2xl mt-6 ml-10 border border-green-100 p-4 rounded-md mr-24">
                                Add it in your question
                            </div>
                            <div className="text-xl mt-6 ml-20 border border-green-100 p-4 rounded-md mr-24">
                                so Others can find your question easily
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-20 h-[300px] md:h-[400px] w-[90%] md:w-[800px] border-rose-700 shadow-md shadow-rose-600 border-4 md:ml-auto rounded-3xl bg-gradient-to-t  from-stone-800 from-1% to-black-050 to-95%">
                        <div className="relative mt-4">
                            <button onClick={() => navigate('/users')} className="absolute text-gray-400 right-4 font-bold px-4 py-2 shadow-sm shadow-rose-300 rounded-lg"> connect devi's </button>
                        </div>
                        <div className="relative hidden sm:block">
                            <p className="absolute mt-20 left-48 px-1 text-red-500 text-opacity-45">◇</p>
                            <button className="absolute mt-28 left-56 px-4 py-1 rounded-xl bg-red-500 bg-opacity-45 text-black font-semibold">danii</button>
                            <p className="absolute mt-40 left-56 px-1 text-red-500 text-opacity-45">◇</p>
                            <button className="absolute mt-48 left-40 px-4 py-1 rounded-xl bg-red-500 bg-opacity-35 text-black font-semibold">sahal</button>
                        </div>
                        <div className="flex justify-around p-2 mt-12 ">
                            <div className=" w-72  rounded-xl border border-zinc-800 bg-gradient-to-t from-stone-800">
                                <div className="p-6 text-slate-500">
                                    <p>hey</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>

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