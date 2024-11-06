import { act, useState } from "react"
import api from "../../../../../services/api"

function ConfirmModal({onClose, action, question_id, answer_id,  status, fetchQuest, fetchAnsw}) {

    const closedStatus = action === 'close_answer'; 

    const heading = action === 'close_answer' ? ( status ? 'open answers' : ' close answers') 
                    : 
                    action === 'accept' ? 'Accept answer' 
                    : 
                    action === 'unaccept' ? 'Unaccept' : ''

    const caption = action === 'close_answer' ? ( status ? 'if you open the answer, you will get answers from users' : ' if you close the answer, you will not get any answers for any more')
                    :
                    action === 'accept' ? 'you are accept the answer by click, and you cannot accept another answer'
                    :
                    action === 'unaccept' ? 'this acceptance will be removed by the click' : ''


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

    const handleAccUnacceptAnswer = async () => {
        const accept = action === 'accept' ? true : false

        try{
            setLoading(true)


            const res = await api.post(`acceptanswer/${question_id}/${answer_id}`, {accept})

            console.log(res)
        
            onClose()
            console.log('childd.......................')
            fetchAnsw()
            fetchQuest()


        }
        catch (err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }


    const handleConfirm = () => {
        if (action === 'close_answer') {
            closeAnswers()
        }
        else if (action === 'accept' || action === 'unaccept') {
            handleAccUnacceptAnswer()
        }
    }

    return(

        

        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 bg-black z-50">
            <div className="border border-gray-600 shadow-lg shadow-slate-800 rounded-md p-4 bg-black">
                <div className="justify-center">
                    <h1 className="text-2xl">Are you sure you want to {heading}?</h1>
                    <p className="text-red-400 text-sm">{caption}</p>
                </div>
                <div className="flex justify-between mx-6 mt-10 mb-4">
                    <button onClick={() => onClose()} className="border border-slate-600 text-slate-300 px-6 py-1 rounded-md">No</button>
                    <button onClick={handleConfirm} className="border border-red-500 text-red-300 px-6 py-1 rounded-md">Yes</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal