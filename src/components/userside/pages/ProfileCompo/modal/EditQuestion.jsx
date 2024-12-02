import { useCallback, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import ReactQuill from 'react-quill';
import debouce from 'lodash.debounce'
import api from "../../../../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const modules = {
    toolbar: [
      [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean'] 
    ],
  };


  const formats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'align', 'color', 'background',
    'link', 'image'
  ];

function EditQuestion({onClose, question, fetchQuest}) {

    const scrollRef = useRef(null);
    const [title, setTitle] = useState(question.title)
    const [value, setValue] = useState(question.body);  
    const [alreadyTag, setAlreadyTag] = useState(question.tags)
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState(''); 
    const [TagDatabase, setTagDatabase] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()



    const { scrollYProgress } = useScroll({ container: scrollRef });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });


    const handleTitle = (e) => {
        const newErr = {}
        if (e.target.value.trim() === '') {
            console.log('the title should not be empty')
            newErr.space = 'the title should not be empty'
        }

        else if (e.target.value.trim().split(/\s+/).length < 4) {
            console.log('lenth of question is not engough')
            newErr.wordlen = 'there should be atleast 4 words'
        }
        setError(newErr)
        setTitle(e.target.value)
    }


    const handleKeyDown = (e) => {
        const trimmedInput = input.trim();
    
        if ((e.key === ' ' || e.key === ',') && trimmedInput.length && !tags.includes(trimmedInput)) {
          e.preventDefault();
          setTags([...tags, trimmedInput]);
          setInput('');
        }
    
        // Handle backspace for tag deletion
        if (e.key === 'Backspace' && !input.length && tags.length) {
          const newTags = [...tags];
          const removedTag = newTags.pop();
          setTags(newTags);
          setInput(removedTag);  // Optional: to allow editing of last removed tag
        }
      };


      const handleChange =  (e) => {
        setInput(e.target.value) 
        debouceTag(e.target.value)

    }
    
    
    
    const debouceTag = useCallback(
        debouce(async(searchtag) => {
            const res = await api.get('questiontags/',{params:{letter:searchtag}})

            setTagDatabase(res.data)

        }, 1000), []
    )
    


    const validateForm = () => {
        const newErr = {}

        if(title.trim() === '') {
            newErr.title = 'the title should not be empty'
        }
         else if (title.trim().split(/\s+/).length <4 ) {
            newErr.title = 'there should be atleast 4 words in the title'
         }

        if (value.trim().split(/\s+/).length < 8 ){
            newErr.value = 'there should be atleast 8 words in the question details'
        }

        


        setError(newErr) 
        return Object.keys(newErr).length === 0 
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateForm() ) {
            try{
                setLoading(true)
                const res = await api.patch(`updatequestion/${question.id}`,{title,body:value,tags:tags})
                toast.success('your question is updated')
                onClose()
                fetchQuest()
            }
            catch(err) {
                console.log(err)
                if (err.status === 400) {
                    if (err.response.data && err.response.data.tags) {
                        toast.error('Entered tag is not exist, check the suggestions')
                    }
                }
            }
            finally{
                setLoading(false)
            }
            
        }

        else{
            toast.error('please fix the errors then submit')
        }

    }
    
    

    return(
        <div className=' flex justify-center'>
            <div className='absolute  bg-gray-950 w-[820px] h-[460px] p-4 rounded-xl border border-slate-500 shadow-md shadow-slate-600'>
                <div className='absolute right-6 mt-0 '>
                    <p onClick={onClose} className='bg-slate-800 px-2 rounded-md cursor-pointer hover:text-red-500'>✕</p>
                </div>
                <div className='flex justify-center'>
                    <h1 className='text-lg font-bold '> Edit Question</h1>
                </div>

                <div className="mt-4">
                <motion.div className="top-0 left-0 right-0 h-1 bg-lime-400 origin-left" style={{ scaleX }} />

                

                <div ref={scrollRef} className='overflow-y-auto h-[350px] mt-4 custom-scrollbar'>
                    <form onSubmit={handleSubmit}>
                        
                        <div className="mx-2 mt-6">
                            <h1 className="text-lg">Title for your Question</h1>
                            <p className="text-sm text-slate-600">give an understandable question</p>
                            {error.space && <p className='text-red-400 text-xs flex  justify-end'>{error.space} </p> } 
                            {error.wordlen && <p className="text-red-400 text-xs flex justify-end">{error.wordlen}</p> }
                            {error.title && <p className="text-red-400 text-xs">{error.title}</p>}
                            <input type="text" value={title} onChange={handleTitle} className="w-full p-2 mt-4 bg-black-050 my-2 border border-slate-700 rounded-md " />
                            
                            <h1 className="mt-4 text-lg">What is the details of the problem</h1>
                            <p className="text-sm text-slate-600">explain more about the question</p>
                            {error.value && <p className="text-red-400 text-xs">{error.value}</p>}
                            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} className="mt-4 " />
                            

                            <div className="mt-10">
                                <p>Add tags here</p>
                                <p className="text-xs text-gray-400">add up to 4 tags based about on your question,Please select tag from suggestion</p>
                                <div className="mt-4">
                                        <div className="flex mb-2 items-center gap-4">already added tags {alreadyTag.map((alreadytag, indx) => (<div key={indx} className="text-sm"><p className="text-slate-500">#{alreadytag}</p></div> ))} </div>
                                    <div className="tags-container flex gap-3">
                                        {tags.map((tag, index) => (
                                        <div key={index} className="tag text-zinc-400">
                                            {tag} <button className="text-red-500" onClick={() => setTags(tags.filter((_, i) => i !== index))}>x</button>
                                        </div>
                                        ))}
                                    </div>
                                        {error.tags && <p className="text-red-400 text-xs">{error.tags}</p>}

                                    <input type="text" value={input} placeholder="Enter a tag" onKeyDown={handleKeyDown} onChange={handleChange} className="bg-black-050 border-slate-400 w-full p-2 border"/>
                                    <div className="p-2 border border-zinc-600">
                                        {TagDatabase.map((data, indx) => (
                                            <div key={indx}>{data.name} </div>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            <button className='w-full border border-gray-800 font-bold bg-slate-900 shadow-sm shadow-slate-800 rounded-md p-2 my-6'> Submit </button>
                        </div>

                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default EditQuestion