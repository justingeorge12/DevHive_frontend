import { useEffect, useState } from "react"
import api from "../../../../services/api"
import { useNavigate } from "react-router-dom"


function QuestCompo(){

    const [userQues, setUserQues] = useState([])
    const [quesLen, setQuesLen] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {

        const fetchUserQuestion = async () => {
            
            const res = await api.get('userquestion')

            setUserQues(res.data)
            setQuesLen(res.data.length)

            console.log(res, '000000000000000000000000000000000000000000000000000000000000000000000000')

            console.log(res.data.length, 'lllllllllllllllngthttttttttttttttt')

        }

        fetchUserQuestion()

    }, [])


    return(
        <div>
            <div >
                <h1 className="text-xl text-blue-100">Question [ {quesLen} ]</h1>
                {userQues.map((quest , index) => (
                    <div key={index} className="border border-slate-700 mt-6 p-4 rounded">
                        <div className="flex justify-between">
                            <h1 onClick={() => navigate('/userquestion', {state:{question_id:quest.id}})} className="text-sky-200 font-bold text-lg cursor-pointer">{quest.title}</h1>
                            <div className="ml-4 whitespace-nowrap text-slate-400"><p className="bg-gray-900 px-1"> {quest.created} </p> </div>
                        </div>
                        <div className="flex justify-between mt-1">
                            <div className="flex gap-4 text-sm">
                                {quest.tags.map((tag, ndx) => (
                                    <div key={ndx} className="text-gray-400">
                                        <p># {tag}</p>
                                    </div>
                                ))}
                            </div>
                            <p className=" text-slate-300">Answers : {quest.answer_count} </p>  
                        </div>
                        <div className="flex gap-4 mt-4">
                            <p className="text-gray-300 border border-gray-800 rounded-sm px-2"><span className="text-slate-400 text-sm">⇧ : </span>  {quest.pos_vote} </p>
                            <p className=" text-gray-300 border border-gray-800 rounded-sm px-2"><span className="text-slate-300 text-sm">⇩ : </span> {quest.neg_vote} </p>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}


export default QuestCompo