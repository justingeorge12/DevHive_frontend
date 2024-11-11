

import React from 'react';
import { useNavigate } from 'react-router-dom';

function FollowModal({ isOpen, onClose, title, followData }) {
  if (!isOpen) return null;

  const navigate = useNavigate()

//   const handleNavigate = (username) => {
//     onClose()

    
//   }

console.log(followData, 'aaaaaaaaaaaaaaaaaaaataaaaaaaaaaaaa')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg w-80 relative">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
          ✕
        </button>
        <div className="max-h-60 overflow-y-auto">
            <ul className="space-y-2">
            {followData.length > 0 ? (
                followData.map((user, index) => (
                    <li onClick={() => {onClose(); navigate(`/${user.username}`)}} key={index} className=" py-2 text-white"> {user.username}</li>
                ))
            ) : (
                <p className="text-center text-gray-600">No {title.toLowerCase()} yet.</p>
            )}
            </ul>
        </div>
      </div>
    </div>

  );
}

export default FollowModal;
