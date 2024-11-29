import { useState, useCallback, useEffect } from "react";
import api from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import pic from '../../../../assets/images/noProfile.jpg'
import { BarLoader } from "react-spinners";

function SearchModal({ onClose }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [searchName, setSearchName] = useState("");

    const fetchUsers = useCallback(async () => {
        if (!searchName.trim()) {
            setUserList([]);
            return;
        }
        setLoading(true);
        try {
            const res = await api.get("searchuser", { params: { search: searchName } });
            setUserList(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [searchName]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsers();
        }, 500);

        return () => clearTimeout(delayDebounceFn); 
    }, [searchName, fetchUsers]);

    const handleInputChange = (e) => {
        setSearchName(e.target.value);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 bg-black z-50">
            <div className="border relative border-gray-600 shadow-lg shadow-slate-800 rounded-md p-4 bg-black">
                <button onClick={onClose} className="absolute right-2 top-2 bg-slate-800 px-2 hover:text-red-500">✕</button>
                <div className="w-60 sm:w-72 md:w-80">
                    <h1 className="flex justify-center font-bold">Message</h1>
                    <div className="mt-2">
                        <form>
                            <input type="text" onChange={handleInputChange} value={searchName} className="bg-slate-950 border border-slate-700 w-full rounded-md py-1 pl-2 shadow-sm shadow-slate-700" placeholder="Search a chat"/>
                        </form>
                    </div>
                    <div className="h-64 mt-2 overflow-y-auto custom-scrollbar">
                        {loading && <div className="flex justify-center"> <BarLoader color='#ffffff' size={20} /> </div>}
                        {!loading && userList.length === 0 && <p>No users found</p>}
                        {userList.map((user, index) => (
                            <div key={index} onClick={() => { navigate(`/chatpage/${user.id}`); onClose();}} className="p-2 border-b flex gap-4 items-center border-slate-700 hover:bg-slate-900">
                                <img src={user.profile || pic} alt="" className="h-10 rounded-md" />
                                {user.username}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchModal;