import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../../../services/api";
import Nav from "../../../NavFoot/Nav";
import EditQuestion from "../modal/EditQuestion";
import ConfirmModal from "../modal/ConfirmModal";

function ProfQuesDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const [question, setQuestion] = useState([]);
  const [quesAnswers, setQuesAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const question_id = location.state?.question_id || "";
  const [qustionDeleteModal, setQustionDeleteModal] = useState(false);
  const [questionEditModal, setQuestionEditModal] = useState(false);
  const [questBody, setQuestBody] = useState(false);
  const [closeAnsModal, setCloseAnsModal] = useState(false);
  const [accUnaccModal, setAccUnaccModal] = useState({
    isOpen: false,
    action: "",
    answer_id: null,
    question_id: null,
  });

  const fetchQuest = async () => {
    try {
      setLoading(true);
      const quesRes = await api.get(`questionmanage/${question_id}`);
      setQuestion(quesRes.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnsw = async () => {
    try {
      setLoading(true);
      const res = await api.get(`userquestionanswer/${question_id}`);
      setQuesAnswers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnsw();
    fetchQuest();
  }, []);

  const deleteUserQuestionhandle = async () => {
    try {
      console.log(question_id, "id id id idid id ididi ");
      const res = await api.delete(`deleteuserquestion/${question_id}`);
      console.log(res);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Nav />
      <div className="mt-20">
        <div className="m-24 border border-slate-900">
          {questionEditModal && (
            <div>
              <EditQuestion
                question={question}
                onClose={() => setQuestionEditModal(false)}
                fetchQuest={fetchQuest}
              />
            </div>
          )}
          <div className="m-6">
            <div className="p-4 border border-slate-700 rounded-md ">
              <div className="flex justify-between">
                <p className="text-lg font-bold text-sky-200">
                  {" "}
                  {question.title}{" "}
                </p>
                <div className="whitespace-nowrap">
                  {" "}
                  <p className="bg-slate-800 px-1"> {question.created} </p>{" "}
                </div>
              </div>

              <div className="mt-10">
                <p className="text-slate-400">
                  Question Body{" "}
                  <span className="text-slate-800"> . . . . . . . .</span>{" "}
                  {questBody ? (
                    <span
                      className="cursor-pointer"
                      onClick={() => setQuestBody(false)}
                    >
                      ▽
                    </span>
                  ) : (
                    <span
                      className="cursor-pointer"
                      onClick={() => setQuestBody(true)}
                    >
                      ▷
                    </span>
                  )}{" "}
                </p>
                {questBody && (
                  <div className="border border-slate-800 mt-4">
                    <div className="p-4">
                      <div
                        className=" p-2 text-red-100"
                        dangerouslySetInnerHTML={{ __html: question.body }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <p className="text-slate-400">
                  Answers: {question.answer_count}
                </p>
              </div>

              {closeAnsModal && (
                <ConfirmModal
                  onClose={() => setCloseAnsModal(false)}
                  action={"close_answer"}
                  status={question.closed}
                  question_id={question.id}
                  fetchQuest={fetchQuest}
                />
              )}

              {accUnaccModal.isOpen && (
                <ConfirmModal
                  onClose={() =>
                    setAccUnaccModal({
                      isOpen: false,
                      action: "",
                      answer_id: null,
                      question_id: null,
                    })
                  }
                  action={accUnaccModal.action}
                  question_id={accUnaccModal.question_id}
                  answer_id={accUnaccModal.answer_id}
                  fetchAnsw={fetchAnsw}
                  fetchQuest={fetchQuest}
                />
              )}
              {qustionDeleteModal && (
                <div className="flex justify-center">
                  <div className="absolute border border-gray-600 shadow-lg shadow-slate-800 rounded-md p-4 bg-black ">
                    <div className=" justify-center">
                      <h1 className="text-2xl">
                        Are you Really wanna delete the question ??
                      </h1>
                      <p className="text-red-400 ml-4">
                        you will lose all the answer and you cannot undo this !!{" "}
                      </p>
                    </div>
                    <div className="flex justify-between mx-6 mt-10 mb-4">
                      <button
                        onClick={() => setQustionDeleteModal(false)}
                        className="border border-slate-600 text-slate-300 px-6  py-1 rounded-md"
                      >
                        No
                      </button>
                      <button
                        onClick={deleteUserQuestionhandle}
                        className="border border-red-500 text-red-300 px-6  py-1 rounded-md"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* <button className="border w-full border-slate-800 p-2 mt-4 flex justify-center font-semibold text-gray-400 bg-gradient-to-br from-black-050 from-10% via-gray-950 to-black-050 to-90%"> Close Answer </button> */}
              <button
                onClick={() => {
                  setQustionDeleteModal(false);
                  setQuestionEditModal(!questionEditModal);
                }}
                className="border w-full border-slate-800 p-2 mt-4 flex justify-center font-semibold text-gray-400 bg-gradient-to-br from-black-050 from-10% via-gray-950 to-black-050 to-90%"
              >
                {" "}
                Edit{" "}
              </button>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setQustionDeleteModal(!qustionDeleteModal);
                    setQuestionEditModal(false);
                    setCloseAnsModal(false);
                  }}
                  className="border w-full  border-slate-800 p-2 mt-4 flex justify-center font-semibold text-red-500 text-opacity-65 bg-gradient-to-br from-black-050 from-10% via-gray-950 to-black-050 to-90%"
                >
                  {" "}
                  Delete Question{" "}
                </button>
                {question.closed ? (
                  <button
                    onClick={() => {
                      setCloseAnsModal(!closeAnsModal);
                      setQuestionEditModal(false);
                      setQustionDeleteModal(false);
                    }}
                    className="border w-full  border-slate-800 p-2 mt-4 flex justify-center font-semibold text-red-100 text-opacity-65 bg-gradient-to-br from-black-050 from-10% via-gray-950 to-black-050 to-90%"
                  >
                    {" "}
                    Open Answers{" "}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCloseAnsModal(!closeAnsModal);
                      setQuestionEditModal(false);
                      setQustionDeleteModal(false);
                    }}
                    className="border w-full  border-slate-800 p-2 mt-4 flex justify-center font-semibold text-red-100 text-opacity-65 bg-gradient-to-br from-black-050 from-10% via-gray-950 to-black-050 to-90%"
                  >
                    {" "}
                    Close Answers{" "}
                  </button>
                )}
              </div>
            </div>

            <div className="mt-10">
              {quesAnswers.map((answ, indx) => (
                <div
                  key={indx}
                  className="p-4 border-2 border-slate-600 my-8 rounded-md flex justify-between"
                >
                  <div>
                    <p className="text-lg mb-4 border-l pl-3 bg-gradient-to-r from-slate-900 from-10% via-black-050 via-30%">
                      {indx + 1}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: answ.body }} />
                    {answ.pos_vote}
                  </div>

                  <div className=" px-2 border border-slate-800 ml-1 flex items-center">
                    <div>
                      {answ.is_acceptable ? (
                        answ.accepted ? (
                          <button
                            onClick={() =>
                              setAccUnaccModal({
                                isOpen: true,
                                action: "unaccept",
                                answer_id: answ.id,
                                question_id: question.id,
                              })
                            }
                            className=" whitespace-nowrap border border-slate-800 text-green-300 p-2 flex justify-center"
                          >
                            Unaccept answer
                          </button>
                        ) : (
                          !question.accepted && (
                            <button
                              onClick={() =>
                                setAccUnaccModal({
                                  isOpen: true,
                                  action: "accept",
                                  answer_id: answ.id,
                                  question_id: question.id,
                                })
                              }
                              className=" whitespace-nowrap border border-slate-800 text-green-300 p-2 flex justify-center"
                            >
                              Accept answer
                            </button>
                          )
                        )
                      ) : (
                        <p className=" whitespace-nowrap border border-slate-800 text-gray-400 p-2 flex justify-center">
                          your own answer
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfQuesDetails;
