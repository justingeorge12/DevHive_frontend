import pic from '../../../../assets/images/deBot.webp'


function Chatarea() {

    const messages =   ['hey', 'kll', 'entalla ', 'verunthund']

    return (
        // <div>
            <div className="w-full flex flex-col justify-between h-screen">
                    <div className="border-b w-full border-slate-800">
                        <div className="m-2 flex items-center gap-4">
                            <img src={pic} alt="" className="h-10 w-10 rounded-md" />
                            <h1>
                                justin
                            </h1>
                        </div>
                    </div>
                    
                    <div className="flex-grow m-4 overflow-y-auto custom-scrollbar">
                        {/* bg picture */}
                        <div className="p-1">
                            {messages.map((data, indx) => (
                                <div key={indx}>
                                    
                                    {/* {data.sender_id == current_user ?   */}
                                        <div className="my-3 mr-3 flex justify-end">
                                        <span className=" bg-blue-950 px-2 py-1 rounded-md"> {data} </span>
                                    </div>
                                        {/* :  */}
                                        
                                        <div  className="my-3">
                                        <span className="bg-slate-700 px-2 py-1 rounded-md"> {data} </span>
                                    </div>
                                        {/* } */}
                                </div>
                            ))}
                            
                        {/* <div ref={messagesEndRef} /> */}
                        </div>
                        
                    </div>


                    <div className="m-2">
                        {/* <form> */}
                            <div className="flex gap-3 border border-slate-800 py-2 shadow-sm shadow-slate-800 bg-slate-950 rounded-md px-2">
                                <p>😉</p>
                                <p >🔗 </p>
                                <input type="text"  className="w-full bg-slate-950 focus:outline-none " placeholder="type your message here.." />
                                <button onClick={console.log('')}>send</button>
                            </div>
                        {/* </form> */}
                    </div>
                </div>
        // </div>
    )
}

export default Chatarea 