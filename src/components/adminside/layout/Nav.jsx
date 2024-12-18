import { useNavigate } from "react-router-dom"
import api from "../../../services/api"

function Nav() {

    const navigate = useNavigate()

    const showHome = () => {
        navigate('/admin')
    }

    const handleLogout = async () =>{
        try{
            const refresh = localStorage.getItem('refresh')

            const res = await api.post('logout', {refresh})
            localStorage.clear();
            delete api.defaults.headers.common["Authorization"];
            navigate('/admin/login')
        }
        catch (err) {
            console.log(err)
            localStorage.clear()
            delete api.defaults.headers.common["Authorization"];
            navigate('/admin/login')
        }
        
    }

    return(
        <div className="h-14 bg-black shadow-sm shadow-lime-400 ">
                <div className="mx-10 flex justify-between items-center h-full ">
                    <div>
                        <p onClick={showHome} className="text-2xl font-bold text-lime-100 cursor-default">DevHive</p>
                    </div>
                    <div className="flex gap-6">
                        <p onClick={() => navigate('/admin/users')} className="cursor-pointer font-bold">Activities</p>
                        <p onClick={handleLogout} className="cursor-pointer font-bold">Logout</p>
                    </div>
                </div>
            </div>
    )
}

export default Nav