
function Confirm({tag, onClose, deleteTag}) {


    console.log(tag, 'dddddddddddddddlt')

    return(
        <div className="relative">
            <div className="absolute inset-0 flex justify-center">
                <div className=" border w-[350px] h-[250px] rounded-xl bg-zinc-900 border-x-orange-400 border-yellow-200 shadow-lg shadow-zinc-700">
                    <div className="relative w-full h-full flex flex-col justify-center  items-center px-4">
                        <p className="font-mono"> Do you realy wanna delete id:{tag} <span className="text-2xl text-rose-800"> ? </span></p> 
                        <div className="flex mt-14 gap-20">
                            <button onClick={onClose} className="border border-teal-600 px-6 py-1.5 rounded-md"> No </button>
                            <button onClick={deleteTag}  className="bg-red-500 px-6 py-1.5 rounded-md"> Yes </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  Confirm

