import { useParams } from "react-router-dom"
import profile from '../../../../assets/images/noProfile.jpg'
import pic from '../../../../assets/images/prpic.jpeg'
import { useState, useEffect, useRef } from "react";
import api from "../../../../services/api"


function Chat() {

    const { user_id } = useParams()
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    const current_user = localStorage.getItem('user_id')
    


    useEffect(() => {
        const token = localStorage.getItem('access'); 
        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${user_id}/?token=${token}`);
        setSocket(socket);
    
        socket.onmessage = (e) => {
            console.log(e, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
            const data = JSON.parse(e.data);
            console.log(data, '----------------------------------nnnn-----------------------------------')
            setMessages((prevMessages) => [...prevMessages, {message : data.message, sender_id : data.user}]);
            console.log('oooooooooooooooooooonmssge','current L ',current_user,  {message : data.message, sender_id : data.user})

        };

        socket.onerror = (e) => {
            console.error("WebSocket error:", e);
        };


       socket.onclose = () => {
            console.log('WebSocket connection closed');
            setMessages([])
        };
        return () => socket.close();
    }, [user_id]);




    const fetchChatHistory = async () => {
        try{
            setLoading(true)
            const res = await api.get(`chathistory/${user_id}`)
            setMessages(res.data)
            console.log(res.data)
        }
        catch(err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchChatHistory()
    }, [user_id])
 

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const sendMessage = (e) => {
        e.preventDefault();
        if (message && socket) {
            console.log(current_user, '------------------------', '')
            console.log('mssssg', {message:message})
            console.log('jsooooon', JSON.stringify({  'user':1, message:message , 'lll':'weoiru' }))
            socket.send(JSON.stringify({  'user':1, message:message , 'lll':'weoiru' }));
            setMessage('');
        }

    };


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
                <div className="w-full flex flex-col justify-between h-screen">
                    <div className="border-b w-full border-slate-800">
                        <div className="m-2 flex items-center gap-4">
                            <img src={pic} alt="" className="h-10 w-10 rounded-md" />
                            <h1>
                                {user_id}
                            </h1>
                        </div>
                    </div>
                    
                    <div className="flex-grow m-4 overflow-y-auto custom-scrollbar">
                        {/* bg picture */}
                        <div className="p-1">
                            {messages.map((data, indx) => (
                                <div key={indx}>
                                    
                                    {data.sender_id == current_user ?  
                                        <div className="my-3 mr-3 flex justify-end">
                                        <span className=" bg-blue-950 px-2 py-1 rounded-md"> {data.message} </span>
                                    </div>
                                        : 
                                        
                                        <div  className="my-3">
                                        <span className="bg-slate-700 px-2 py-1 rounded-md"> {data.message} </span>
                                    </div>
                                        }
                                </div>
                            ))}
                            {/* {messages.map((msg, index) => (
                                <div key={index} className="my-3">
                                    <span className="bg-slate-700 px-2 py-1 rounded-md">{msg.message}</span>
                                </div>
                            ))} */}
                        <div ref={messagesEndRef} />
                        </div>
                        
                    </div>


                    <div className="m-2">
                        {/* <form> */}
                            <div className="flex gap-3 border border-slate-800 py-2 shadow-sm shadow-slate-800 bg-slate-950 rounded-md px-2">
                                <p>😉</p>
                                <p >🔗 </p>
                                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-slate-950 focus:outline-none " placeholder="type your message here.." />
                                <button onClick={sendMessage}>send</button>
                            </div>
                        {/* </form> */}
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default Chat