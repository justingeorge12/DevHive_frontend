
import { BarLoader } from "react-spinners";


function BarLoading({loading}) {

    return(
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-70 bg-black'>
            <BarLoader color='#ffffff' loading={loading} size={20} /> 
        
        </div>
    )
}

export default BarLoading