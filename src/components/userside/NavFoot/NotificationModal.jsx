import { useEffect, useRef, useState } from 'react';
import api from '../../../services/api';
import BarLoading from '../../common/BarLoading';
import { BarLoader } from 'react-spinners';

function NotificationModal({ onClose }) {

    const modalRef = useRef(null);
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(); // Close the modal when clicking outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const fetchChatHistory = async () => {
        setLoading(true)
        try{
            const res = await api.get('notificationhistory')
            setNotifications(res.data)
        }
        catch (err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchChatHistory()
    }, [])


    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-end bg-opacity-50 bg-black z-50">
            <div className="mt-16 mr-36 w-80" ref={modalRef}>
                <div className="border relative border-gray-600 shadow-lg shadow-slate-800 rounded-md p-4 bg-black">
                    <button onClick={onClose} className="absolute right-2 top-2 bg-slate-800 px-2 hover:text-red-500">✕</button>
                    <div className="justify-center">
                        {loading && <div className='justify-center flex'><BarLoader color='#ffffff' size={20} /></div> }
                        <div className='max-h-80 overflow-y-auto custom-scrollbar'>
                            {notifications.length > 0 ?
                                (notifications?.map((data, ndx) => (
                                    <div key={ndx} className="border-b border-slate-700 p-2 hover:bg-slate-900">
                                    {data.message}
                                    </div>
                                )))
                            :
                            (
                                <div> No notifications</div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationModal;
