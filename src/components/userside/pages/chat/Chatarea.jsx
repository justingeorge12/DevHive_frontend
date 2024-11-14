import pic from '../../../../assets/images/deBot.webp'
import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import api from '../../../../services/api';



function Chatarea() {

    const { receiver_id } = useParams()
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [receiverDetail, setReceiverDetail] = useState(null)

    const current_user = localStorage.getItem('user_id')

    useEffect(() => {
        const token = localStorage.getItem('access'); 
        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${receiver_id}/?token=${token}`);
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
    }, [receiver_id]);


    const fetchChatHistory = async () => {
        try{
            setLoading(true)
            const res = await api.get(`chathistory/${receiver_id}`)
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

    const fetchUserDetail = async () => {
        const res = await api.get(`specificuser/${receiver_id}`)
        console.log(res)
        setReceiverDetail(res.data)

    }


    useEffect(() => {
        fetchChatHistory()
        fetchUserDetail()
    }, [receiver_id])


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





    return (
            <div className="w-full flex flex-col justify-between h-screen">
                    <div className="border-b w-full border-slate-800">
                        <div className="m-2 flex items-center gap-4">
                            {receiverDetail ? 
                            <img src={receiverDetail.profile} alt="" className="h-10 w-10 rounded-md" />
                            : 
                            <img src={pic} alt="" className="h-10 w-10 rounded-md" />
                            }
                            <h1>
                                {receiverDetail ? receiverDetail.username : '' }
                                {console.log(receiverDetail)}
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
    )
}

export default Chatarea 