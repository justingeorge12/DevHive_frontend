import { useEffect, useState } from "react"
import api from "../../../../services/api"
import Nav from "../../layout/Nav"
import Sidebar from "../../layout/Sidebar"
import { useNavigate } from "react-router-dom"

function AdminQuestion() {

    const [question, setQuestion] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        const fetchAllQuestion = async () => {
            const res = await api.get('listquestion')
            console.log(res, 'rrrrrrrrrrrrrrrssssssssss')
            setQuestion(res.data)
        }

        fetchAllQuestion()

    }, [])

    return(
        <div>

            <Nav />
            <Sidebar />
            <div className="lg:ml-[200px]">
                <h1 className="text-2xl font-bold mt-6 flex justify-center">Questions</h1>

                <div className="m-10 border">

                    {question.map((quest , index) => (
                        <div key={index} className="border border-slate-700 m-6 p-4">
                            <div>
                                <div className="flex justify-between">
                                    <h1 onClick={() => navigate('/admin/questiondetail', {state:{question_id:quest.id}})} className="font-semibold cursor-pointer text-sky-200">{quest.title}</h1>
                                    <div className="whitespace-nowrap ml-4">
                                        <p className="bg-slate-800 px-1"> {quest.created}</p>
                                    </div>
                                </div>
                                    <div className="mt-6 flex justify-between">
                                        <div className="flex">
                                            <p className="border border-gray-700 px-1 text-slate-400">⇧ : {quest.pos_vote}</p>
                                            <p className="border border-gray-700 text-slate-400 px-1 ml-4">⇩ : {quest.neg_vote} </p>
                                        </div>
                                        <div>
                                            <p className="text-slate-200"><span className="text-slate-500"> Answers: </span>  {quest.answer_count} </p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminQuestion