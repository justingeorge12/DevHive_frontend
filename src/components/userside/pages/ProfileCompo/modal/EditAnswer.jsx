import { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import api from "../../../../../services/api";

function EditAnswer({onClose, answer, answer_id, fetchAnswer}) {

    const [value, setValue] = useState(answer)


    const modules = {
        toolbar: [
          [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'align': [] }],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image'],
          ['clean']  // remove formatting button
        ],
      };
    
    
      const formats = [
        'header', 'font',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'align', 'color', 'background',
        'link', 'image'
      ];

    const handleSubmit = async (e) => {
        e.preventDefault()


        if (value.trim().split(/\s+/).length < 8 ){
            toast.error( 'there should be atleast 8 words in the answer' )
            return

        }

        try{
            const res = await api.patch(`useranswersdetail/${answer_id}`, {body:value})
            console.log(res)
            setValue('')
            onClose()
            if (res.status === 200 ) {
                toast.success('answer is edited successfully')
                fetchAnswer()

            }
        }
        catch (err) {
            console.log(err)
            setValue('')
            toast.error('there is a isssue with submition')
        }

        
    }

    return(
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="absolute bg-slate-900 border border-slate-600 shadow-md shadow-gray-700 rounded-lg px-6 py-4">
                    <div className="justify-center flex font-bold text-lg">
                        Edit Answer
                    </div>
                    <div className="absolute top-4 right-4 bg-slate-800 rounded-md">
                        <button onClick={() => onClose()} className="px-2 font-bold hover:text-red-600">✕</button>
                    </div>
                    <div className="w-[200px] sm:w-[400px] md:w-[600px] max-h-96 overflow-x-auto custom-scrollbar ">
                        <div className="m-2">
                            <form onSubmit={handleSubmit}>
                                <div className="mt-4">
                                    <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
                                </div>
                                <button className=" mt-6 bg-gradient-to-r from-slate-800 via-slate-950 to-slate-800 w-full py-2 rounded-md shadow-sm shadow-slate-800 font-bold  text-red-100 hover:text-orange-300 ">Post answer</button>
                            </form>
                        </div>
                    </div>              
                </div>
            </div>


        </div>
    )
}

export default EditAnswer