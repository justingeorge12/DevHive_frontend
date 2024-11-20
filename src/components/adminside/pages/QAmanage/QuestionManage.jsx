import { useLocation, useNavigate } from "react-router-dom"
import Nav from "../../layout/Nav"
import Sidebar from "../../layout/Sidebar"
import { useEffect, useState } from "react"
import api from "../../../../services/api"
import toast from 'react-hot-toast'
import DeleteModal from "../../modal/DeleteModal"

function QuestionManage() {

    const location = useLocation()
    const navigate = useNavigate()

    const question_id = location.state?.question_id || ''

    const [questBody, setQuestBody] = useState(false)
    const [questionDetail, setQuestionDetail]  = useState([])
    const [answer, setAnswers] = useState([])
    const [deleteQuestModal, setDeleteQuestModal] = useState(false)
    const [loading, setLoading] = useState(false);
    const [deleteType, setDeleteType] = useState(null); // Track what is being deleted
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);

    useEffect(() => {

        const fetchQuest = async() => {
            const quesRes = await api.get(`onequestiondetail/${question_id}`)
            console.log(quesRes, 'rrrrrrrrrrrrrsssssssssssss')

            if (quesRes.status === 200) {
                console.log('eeeeeeeeeeentttttttred 200')
                setQuestionDetail(quesRes.data)
            }
        }

        const fetchAnsw = async () => {
            const ansRes = await api.get(`questionsanswer/${question_id}`)
            console.log('Ansswerrrrrrrrrrrrr', ansRes)

            if (ansRes.status === 200) {
                setAnswers(ansRes.data)
            }
        }

        fetchQuest()
        fetchAnsw()

    }, [])

    const handleQuestionDelete = async () => {
        try{
            setLoading(true)
            const res = await api.delete(`questindelete/${question_id}`)
            console.log(res)
            toast.success('this question has deleted')
            navigate('/admin/allquestions')

        }
        catch(err) {
            console.log(err)
            toast.error('there is a error with deleting')
        }
        finally{
            setLoading(false)
        }
    }


    const handleAnswerDelete = async (answerId) => {
        try{
            setLoading(true)
            const res = await api.delete(`deleteanswer/${answerId}`)
            toast.success('the answer has deleted')
            setDeleteQuestModal(false)
        }
        catch (err) {
            console.log(err)
            toast.error('there is a error with deleting')
        }
    }


    const openDeleteModal = (type, answerId = null) => {
        setDeleteType(type);
        setSelectedAnswerId(answerId);
        setDeleteQuestModal(true);
    }


    return(
        <div>

            {/* <Nav /> */}
            <Sidebar />
            <div className="sm:ml-[200px]">
                <h1 className="text-2xl font-bold mt-6 flex justify-center">Questions/Answer Manage {question_id} </h1>

                <div className="m-10 border border-slate-800 ">
                    <div className="flex justify-between">
                        <div className="m-6 border border-slate-500 rounded-md w-full">
                            <div className="p-4">
                                <h2 className="text-gray-200" >{questionDetail.title}  </h2>
                            </div>
                        </div>
                        <div onClick={() => openDeleteModal('question')} className="m-6 cursor-pointer border border-slate-700 bg-black rounded-md flex items-center">
                            <div className="p-4">
                                <div className="whitespace-nowrap">
                                    Delete 
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {deleteQuestModal && 
                        <div className="relative flex justify-center ">
                            <div className="absolute bg-black border border-slate-500 rounded-md">
                                <div className="p-4">
                                    <h2 className="text-lg mt-4 text-slate-400">Are you sure You wanna delete ? </h2>
                                    <div className="flex justify-between mx-4 mt-10">
                                        <button onClick={() =>setDeleteQuestModal(false)} className="border border-slate-400 rounded-md px-2 py-1 text-slate-400">Cancel</button>
                                        <button onClick={handleQuestionDelete} className="border border-red-400 rounded-md px-4 py-1 text-red-400">Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    } */}



                <DeleteModal
                    isOpen={deleteQuestModal}
                    onClose={() => setDeleteQuestModal(false)}
                    onConfirm={deleteType === 'question' ? handleQuestionDelete : () => handleAnswerDelete(selectedAnswerId)}
                    itemType={deleteType}
                />





                    <div className="mx-6 mb-4">
                        <p className="text-slate-400">Question Body <span className="text-slate-800"> . . . . . . . .</span> {questBody ? <span className="cursor-pointer" onClick={() => setQuestBody(false)}>▽</span> : <span className="cursor-pointer" onClick={() => setQuestBody(true)}>▷</span>}  </p>
                        {questBody &&
                            <div className=" mt-4">
                                <div className="p-4">
                                    <h1>
                                        <div className=" p-2 text-red-100" dangerouslySetInnerHTML={{ __html: questionDetail.body }} />
                                    </h1>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                

                <div className="m-10 border border-slate-800 ">
                {questionDetail.answer_count === 0 
                    ?
                    <div className="mt-6 p-4 border border-red-200 ">
                        <p> there are no answer for this question <span className="text-red-500"> !!!! </span></p> 
                    </div>
                    : 
                
                    <div className="m-6">
                        <div className="flex">
                            <h1 className="text-2xl border-b border-slate-700 ">Answers</h1>
                        </div>
                        <div className="mt-6">    
                            {answer.map((ans, indx) => (
                                    
                                <div key={indx} className=" p-4 border border-slate-700 my-4 flex justify-between">
                                    
                                    <div className="w-full">
                                        <div className="">
                                            <p>{ans.id}</p>
                                            <div className=" p-2 text-red-100" dangerouslySetInnerHTML={{ __html: ans.body }} />
                                            {/* <div>
                                                <p className="border px-2">{ans.created}</p>
                                            </div> */}

                                        </div>
                                        <div className="flex mt-6">
                                            <p className="border border-gray-700 px-1 text-slate-400">⇧ : {ans.pos_vote}</p>
                                            <p className="border border-gray-700 text-slate-400 px-1 ml-4">⇩ : {ans.neg_vote} </p>
                                        </div>
                                    </div>
                                    <div className="ml-4 border-l border-slate-800">
                                        <p onClick={() => openDeleteModal('answer', ans.id)}  className="border border-slate-700 cursor-pointer bg-black rounded-md p-2 ml-4">Delete</p>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default QuestionManage