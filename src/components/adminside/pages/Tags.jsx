import { useState } from "react"

function Tags() {

    const arr = [{id:1,name:'python'}, {id:2, name:'javascript'}, {id:3, name:'dart'}, {id:4, name:'angular'}]

    const [addModel, setAddModel] = useState(false)

    return(
        
        <div>
            <div className="h-20 shadow-md shadow-fuchsia-400 ">
                <div className="flex justify-between items-center h-full mx-10">
                    <h1 className="text-3xl font-bold"> DevHive </h1>
                    <h1>Login</h1>
                </div>
            </div>
            <div className="px-4 md:px-8 lg:px-16 py-4">
                <div className="mt-6">
                    <div className="justify-center flex">
                        <h1 className="font-bold sm:text-xl md:text-2xl font-mono text-rose-200">TAG'S</h1>
                    </div> 
                    <div className="flex justify-end ">  
                        <button onClick={() => setAddModel(!addModel)} className="mr-20 bg-orange-600 px-4 md:px-4 md:py-2 py-1 rounded-md shadow-2xl font-mono text-sm md:text-base sm:ml-0">ADD TAGS</button>
                    </div>
                    {addModel && <div className="absolute"> <h2> hhhhhhhhhhhhhhhhhhhhhhhhhhhheyyyyyyyyyyyyyyyy model Oppened</h2></div>}
                    

                    <div className="flex justify-center">
                        <div className="w-[600px]">
                            <div className="flex justify-around p-2 border">
                                <h1>Id</h1>
                                <h2>Name</h2>
                                <h2>Description</h2>
                            </div>
                        </div>
                    </div>


                    <hr className=" my-2 border-red-700"/>
                    
                    {arr.map((data, index) => (
                        <div key={index}>

                        <div className="flex justify-center">
                        <div className="w-full max-w-[600px]"> 
                        <div className="flex justify-around p-2 border"> 
                            <h1>{index}</h1>
                            <h2>{data.name} </h2>
                            <h3>{'lsllslsl'} </h3>
                        </div>
                        </div>
                        </div>

                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default Tags


