// import { useEffect, useState } from "react"
// import Nav from "../../../NavFoot/Nav"
// import api from "../../../../../services/api"
// import { useNavigate, useParams } from "react-router-dom"
// import toast from "react-hot-toast"
// import CommonConfirmModal from "../../reward/Modal/CommonConfirmModal"
// import EditAnswer from "../modal/EditAnswer"

// function ProfAnswerDetails() {

//     const {answer_id} = useParams()
//     const navigate = useNavigate()

//     const [loading, setLoading] = useState(false)
//     const [deleteLoading, setDeleteLoading] = useState(false)
//     const [answerData, setAnswerData] = useState(null)
//     const [answerDeleteConfirm, setAnswerDeleteConfirm] = useState(false)
//     const [editModalOpen, setEditModalOpen] = useState(false)

//     const fetchAnswer = async () => {
//         setLoading(true)
//         try{
//             const res = await api.get(`useranswersdetail/${answer_id}`)
//             if (res.status === 200 ) {
//                 setAnswerData(res.data)
//             }  
//             console.log(res, 'rrrrrrrrrrrrsss')

//         }
//         catch (err) {
//             console.log(err)
//         }
//         finally{
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchAnswer()
//     }, [])

//     const handleDelete = async () => {
//         setDeleteLoading(true)
//         try{
//             const res = await api.delete(`useranswersdetail/${answer_id}`)
//             navigate('/profile')
//         }
//         catch(err) {
//             if (err.status === 403){
//                 if (err.response.data.detail) {
//                     toast.error(err.response.data.detail)
//                 }
//                 console.log(err)
//             }
//             setAnswerDeleteConfirm(false)
//         }
//         finally{
//             setDeleteLoading(false)
//         }
//     }

//     return(
//         <div>
//             <Nav />
//             this page should be  only visible for user who is asked in backened 
//             <div className="mt-20">

//                 <div className="border mx-20 my-8 border-slate-700 mt-6 p-4">
//                     <div className="flex justify-center">
//                         <button onClick={() => navigate('/answer', {state:{question_id:answerData.question}})} className="w-full p-2 border border-blue-900 text-lg font-bold bg-slate-950 text-slate-100">See the question </button>
//                     </div>
//                     <div className="flex justify-between gap-2">
//                         <button onClick={() => setEditModalOpen(true)} className="w-full p-2 mt-2 border border-slate-700 font-semibold text-green-200 bg-slate-950">Edit Answer</button>
//                         {answerData?.accepted || answerData?.pos_vote > 0 ?
//                             (answerData?.accepted ? 
//                                 <button onClick={() => toast.error('you cannot delete accepted answer')} className="w-full p-2 mt-2 border border-slate-700 font-semibold text-zinc-400 cursor-not-allowed">Delete Answer </button>
//                             :
//                                 <button onClick={() => toast.error('You cannot delete upvoted answer')} className="w-full p-2 mt-2 border border-slate-700 font-semibold text-zinc-400">Delete Answer </button>
//                             )

//                         :
//                             <button onClick={() => setAnswerDeleteConfirm(!answerDeleteConfirm)} className="w-full p-2 mt-2 border border-slate-700 font-semibold text-red-400 bg-slate-950">Delete Answer </button>
//                         }


                        
//                     </div>
//                     <div className="mt-4 p-4 border border-slate-800" dangerouslySetInnerHTML={{ __html: answerData?.body }} />
//                     <div className="flex gap-4 mt-4">
//                         <p className="text-gray-300 border border-gray-800 rounded-sm px-2"><span className="text-slate-400 text-sm">⇧ : </span>  {answerData?.pos_vote} </p>
//                         <p className=" text-gray-300 border border-gray-800 rounded-sm px-2"><span className="text-slate-300 text-sm">⇩ : </span> {answerData?.neg_vote} </p>
//                     </div>
//                 </div>
//                 {answerDeleteConfirm && <CommonConfirmModal onClose={() =>setAnswerDeleteConfirm(false)} handleFunction={handleDelete} message={'delete answer'}/>}
//                 {editModalOpen && <EditAnswer onClose={() => setEditModalOpen(false)} answer={answerData.body} answer_id={answerData.id} fetchAnswer={fetchAnswer} />}
//             </div>
//         </div>
//     )
// }

// export default ProfAnswerDetails















import { useEffect, useState } from "react";
import Nav from "../../../NavFoot/Nav";
import api from "../../../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CommonConfirmModal from "../../reward/Modal/CommonConfirmModal";
import EditAnswer from "../modal/EditAnswer";

function ProfAnswerDetails() {
  const { answer_id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [answerData, setAnswerData] = useState(null);
  const [answerDeleteConfirm, setAnswerDeleteConfirm] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchAnswer = async () => {
    setLoading(true);
    try {
      const res = await api.get(`useranswersdetail/${answer_id}`);
      if (res.status === 200) {
        setAnswerData(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnswer();
  }, []);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`useranswersdetail/${answer_id}`);
      navigate("/profile");
    } catch (err) {
      if (err.status === 403) {
        if (err.response.data.detail) {
          toast.error(err.response.data.detail);
        }
      }
      setAnswerDeleteConfirm(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="mt-24 px-4 sm:px-6 lg:px-20">
        <div className="border my-8 border-slate-700 mt-6 p-4 rounded-md">
          <div className="flex justify-center">
            <button
              onClick={() =>
                navigate("/answer", { state: { question_id: answerData.question } })
              }
              className="w-full p-2 border border-blue-700 text-lg font-bold bg-slate-950"
            >
              See the question
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
            <button
              onClick={() => setEditModalOpen(true)}
              className="w-full sm:w-1/2 p-2 border border-slate-700 font-semibold text-green-200"
            >
              Edit Answer
            </button>
            {answerData?.accepted || answerData?.pos_vote > 0 ? (
              answerData?.accepted ? (
                <button
                  onClick={() => toast.error("You cannot delete an accepted answer")}
                  className="w-full sm:w-1/2 p-2 border border-slate-700 font-semibold text-zinc-400 cursor-not-allowed"
                >
                  Delete Answer
                </button>
              ) : (
                <button
                  onClick={() => toast.error("You cannot delete an upvoted answer")}
                  className="w-full sm:w-1/2 p-2 border border-slate-700 font-semibold text-zinc-400"
                >
                  Delete Answer
                </button>
              )
            ) : (
              <button
                onClick={() => setAnswerDeleteConfirm(!answerDeleteConfirm)}
                className="w-full sm:w-1/2 p-2 border border-slate-700 font-semibold text-red-400"
              >
                Delete Answer
              </button>
            )}
          </div>
          <div
            className="mt-4 p-4 border border-slate-800 rounded-md text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: answerData?.body }}
          />
          <div className="flex gap-4 mt-4">
            <p className="text-gray-300 border border-gray-800 rounded-sm px-2 text-sm">
              <span className="text-slate-400">⇧ :</span> {answerData?.pos_vote}
            </p>
            <p className="text-gray-300 border border-gray-800 rounded-sm px-2 text-sm">
              <span className="text-slate-300">⇩ :</span> {answerData?.neg_vote}
            </p>
          </div>
        </div>
        {answerDeleteConfirm && (
          <CommonConfirmModal
            onClose={() => setAnswerDeleteConfirm(false)}
            handleFunction={handleDelete}
            message={"delete answer"}
          />
        )}
        
        {editModalOpen && (
          <EditAnswer onClose={() => setEditModalOpen(false)} answer={answerData.body} answer_id={answerData.id} fetchAnswer={fetchAnswer} />
        )}
      </div>
    </div>
  );
}

export default ProfAnswerDetails;
