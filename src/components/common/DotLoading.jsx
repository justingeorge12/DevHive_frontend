import {BeatLoader} from "react-spinners"

function DotLoading({loading}){
    
    return(
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-70 bg-black'>
            <BeatLoader color='#ffffff' loading={loading} size={20} /> 
            
        </div>
                            
    )
}

export default DotLoading


// import { BarLoader, BeatLoader, RingLoader } from "react-spinners"

// function Loading({loading}) {

    
// }

// export default Loading