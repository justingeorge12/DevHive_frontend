
// function Delete({onClose, }) {

//     return(
//         <div>

//         </div>
//     )
// }

// export default Delete


// DeleteModal.js
import React from 'react';

function DeleteModal({ isOpen, onClose, onConfirm, itemType }) {
    if (!isOpen) return null;

    return (
        <div className="relative flex justify-center">
            <div className="absolute bg-black border border-slate-500 rounded-md">
                <div className="p-4">
                    <h2 className="text-lg mt-4 text-slate-400">
                        Are you sure you want to delete this {itemType}?
                    </h2>
                    <div className="flex justify-between mx-4 mt-10">
                        <button onClick={onClose} className="border border-slate-400 rounded-md px-2 py-1 text-slate-400">
                            Cancel
                        </button>
                        <button onClick={onConfirm} className="border border-red-400 rounded-md px-4 py-1 text-red-400">
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
