import { useEffect, useState } from "react"
import api from "../../../../services/api"
import { useNavigate } from "react-router-dom"

function SavedCompo () {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState([])
    

    const fetchSaved = async () => {

        try{
            setLoading(true)
            const res = await api.get('usersaved')
            setSaved(res.data)
            console.log(res.data)
            console.log(res.data[0].question.title);
        }
        catch(err) {
            console.log(err) 
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSaved()
    }, [])


    return(
        <div>
            <div >
                {saved.map((question, indx) => (
                    <div key={indx} className="border  border-slate-700 mt-6 p-4 rounded">
                        <div className="flex justify-between">
                            
                            <h1 onClick={() => navigate('/answer',{state:{question_id:question.question.id}})} className="text-sky-200 font-bold text-lg cursor-pointer">{question.question.title}</h1>
                            
                            <div className="ml-4 whitespace-nowrap text-slate-400"><p className="bg-gray-900 px-1"> {question.question.created} </p> </div>
                        </div>
                        <div className="flex justify-between mt-1">
                            <div className="flex gap-4 text-sm">
                                {question.question.tags.map((tag, ndx) => (
                                    <div key={ndx} className="text-gray-400">
                                        <p># {tag}</p>
                                    </div>
                                ))}
                            </div>
                            <p className=" text-slate-300">Answers : {question.question.answer_count} </p>  
                        </div>
                        <div className="flex gap-4 mt-4">
                                <p className="text-gray-300 border border-gray-800 rounded-sm px-2"><span className="text-slate-400 text-sm">⇧ : </span>  {question.question.pos_vote} </p>
                                <p className=" text-gray-300 border border-gray-800 rounded-sm px-2"><span className="text-slate-300 text-sm">⇩ : </span> {question.question.neg_vote} </p>
                        </div>
                    </div>
                ))}
                    
            </div>
        </div>
        
    )
}


export default SavedCompo