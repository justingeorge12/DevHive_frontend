
import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../../services/api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../../services/constants'
import { useEffect, useState } from 'react'
import DotLoading from '../../components/common/DotLoading'


function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post('/token/refresh', {refresh:refreshToken})

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                setIsAuthorized(true)
            } 
            else{
                setIsAuthorized(false)
            }

        }
        catch(error) {
            setIsAuthorized(false)
        }
       
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        const role = localStorage.getItem('role')

        console.log(role, 'rooooooooole')

        

        if (!token) {
            setIsAuthorized(false)
            return
        }

        if (role !== 'user') {
            setIsAuthorized(false)
            return
        }

        const decoded = jwtDecode(token) 
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000


        if (tokenExpiration < now) {
            await refreshToken()
        } 
        else{
            setIsAuthorized(true)
        }
    }

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [auth])

    if (isAuthorized === null) {
        return <div> <DotLoading /> </div>
    }

    return isAuthorized ? children : <Navigate to='/land/' />
}


export default ProtectedRoute