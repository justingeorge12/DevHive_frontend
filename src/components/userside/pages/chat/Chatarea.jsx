import pic from '../../../../assets/images/noProfile.jpg'
import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import api from '../../../../services/api';
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';


function Chatarea() {

    const { receiver_id } = useParams()
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [receiverDetail, setReceiverDetail] = useState(null)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState(null)
    const [isAtBottom, setIsAtBottom] = useState(true);

    // const current_user = parseInt(localStorage.getItem('user_id'),10)
    const current_user = parseInt(useSelector((state) => state.auth.user_id));

    // console.log(current_user, userId, 'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')

    useEffect(() => {
        const token = localStorage.getItem('access'); 
        const socket = new WebSocket(`wss://devhive.justingeorge.site/ws/chat/${receiver_id}/?token=${token}`);
        setSocket(socket);
    
        socket.onmessage = (e) => {

            const data = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, {message : data.message, sender_id : data.sender_id}]);
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



    const fetchChatHistory = async (url = `chathistory/${receiver_id}`) => {
        try {
            setLoading(true);
            const res = await api.get(url);
            console.log(res.data, 'rrrrrrrrrrrrrrrsssssssssssssssssss')
            setMessages((prevMessages) => [...res.data.results, ...prevMessages]); 
            setNextPageUrl(res.data.links.next); 
        } 
        catch (err) {
            console.log(err);
        }
         finally {
            setLoading(false);
        }
    }


    // const fetchChatHistory = async (url = `chathistory/${receiver_id}`) => {
    //     try {
    //         setLoading(true);
    //         const res = await api.get(url);
    //         const newMessages = res.data.results;
    
    //         const previousScrollHeight = messagesEndRef.current?.scrollHeight;
    
    //         setMessages((prevMessages) => [...newMessages, ...prevMessages]);
    
    //         setTimeout(() => {
    //             if (messagesEndRef.current) {
    //                 const scrollDifference = messagesEndRef.current.scrollHeight - previousScrollHeight;
    //                 messagesEndRef.current.scrollTop = scrollDifference;
    //             }
    //         }, 100);
            
    //         setNextPageUrl(res.data.links.next);
    //     } catch (err) {
    //         console.error(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };



    const fetchUserDetail = async () => {
        const res = await api.get(`specificuser/${receiver_id}`)
        console.log(res)
        setReceiverDetail(res.data)

    }


    useEffect(() => {
        fetchChatHistory()
        fetchUserDetail()
    }, [receiver_id])


    // useEffect(() => {
    //     if (isAtBottom) {
    //         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    //     }
    // }, [messages, isAtBottom]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    
    const sendMessage = (e) => { 
        e.preventDefault();
        if (message && socket) {
            socket.send(JSON.stringify({ message:message, sender_id:current_user}));
            setMessage('');
            setShowEmojiPicker(false)
        }

    };


    const onEmojiClick = (emojiData) => {
        setMessage(message + emojiData.emoji); 
    };

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
        const top = e.target.scrollTop === 0; 

        // setIsAtBottom(bottom);

        if (top && nextPageUrl && !loading) {
            fetchChatHistory(nextPageUrl); 
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };


    return (
            <div className="w-full flex flex-col justify-between h-screen">
                    <div className="border-b w-full border-slate-800">
                        <div className="m-2 flex items-center gap-4">
                            {receiverDetail ? 
                            <img src={receiverDetail.profile || pic} alt="" className="h-10 w-10 rounded-md" />
                            : 
                            <img src={pic} alt="" className="h-10 w-10 rounded-md" />
                            }
                            <h1>
                                {receiverDetail ? receiverDetail.username : '' }
                                {console.log(receiverDetail)}
                            </h1>
                        </div>
                    </div>
                    
                    <div onScroll={handleScroll} className="flex-grow m-4 overflow-y-auto custom-scrollbar">
                        {/* bg picture */}
                        <div className="p-1">
                            {messages?.map((data, indx) => (
                                <div key={indx}>
                                    
                                    {data.sender_id == current_user ?  
                                        <div className="my-3 mr-3 flex justify-end">
                                            <div className='bg-blue-950 px-2 py-1 rounded-md'>
                                                <span className=" " style={{maxWidth:"300px", wordWrap:'break-word', whiteSpace:'normal'}}> {data.message} </span>
                                                <span className="text-xs text-gray-400 ml-2">{formatTime(data.date)}</span>
                                            </div>
                                        </div>
                                    :
                                        <div  className="my-3 flex">
                                            <div className='bg-slate-700 px-2 py-1 rounded-md'>
                                                <span style={{maxWidth:"300px", wordWrap:'break-word', whiteSpace:'normal'}}> {data.message} </span>
                                                <span className="text-xs text-gray-400 ml-2">{formatTime(data.date)}</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}
                            
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {showEmojiPicker && (
                        <div className="absolute mb-4">
                            <EmojiPicker onEmojiClick={onEmojiClick} /> 
                        </div>
                    )}

                    <div className="m-2">
                    
                        <form onSubmit={sendMessage}>
                            <div className="flex gap-3 border border-slate-800 py-2 shadow-sm shadow-slate-800 bg-slate-950 rounded-md px-2">
                                <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-xl"> 😊 </button>
                                
                                <input type="text" onClick={() => setShowEmojiPicker(false)} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-slate-950 focus:outline-none " placeholder="type your message here.." />
                                <button type='submit'>send</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
    )
}

export default Chatarea 