import { useState } from "react"
import api from "../../../../../services/api"

function ConfirmModal({onClose, action, question_id, status, fetchQuest}) {

    // const heading = action==='close_answer' ? 'close the answers' : ''

    // const caption = action === 'close_answer' ? 'if you close the answer, you will not get any answer for any more !!' : ''

    const closedStatus = action === 'close_answer'; 

    const heading = action === 'close_answer' && status ? 'open answers' : ' close answers'

    const caption = action === 'close_answer' && status ? 'if you open the answer, you will get answers from users' : ' if you close the answer, you will not get any answers for any more'

    console.log(closedStatus, '==============staaaaaaaaatus============')

    const [loading, setLoading] = useState(false)

    const closeAnswers = async () => {
        try{
            setLoading(true)
            const res = await api.patch(`updatequestion/${question_id}`,{closed:!status})
            console.log(res)
            fetchQuest()
            onClose()
        }
        catch(err) {
            console.log(err)    
        }
        setLoading(false)
    }

    return(

        <div className="flex justify-center">
            <div className="absolute border  border-gray-600 shadow-lg shadow-slate-800 rounded-md p-4 bg-black ">
                <div className=" justify-center">
                    <h1 className="text-2xl">Are you realy wanna {heading} ??</h1>
                    <p className="justify-center flex text-red-400 text-sm"> {caption}</p>
                </div>
                <div className="flex justify-between mx-6 mt-10 mb-4">
                    <button onClick={() => onClose()} className="border border-slate-600 text-slate-300 px-6  py-1 rounded-md">No</button>
                    <button onClick={closeAnswers} className="border border-red-500 text-red-300 px-6  py-1 rounded-md">Yes</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal