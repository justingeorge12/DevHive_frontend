
import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../../../services/api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../../services/constants"
import { useEffect, useState } from "react"


function AdminProtected({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post('token/refresh', {refresh:refreshToken})
            
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }

        }
        catch(error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }


    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if (!token) {
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

        if (isAuthorized === null) {
            return <div> Loading... </div>
        }

        
        return isAuthorized ? children : <Navigate to = '/admin/login' />
}

export default AdminProtected





// function ProtectedRoute({children}) {
//     const [isAuthorized, setIsAuthorized ] = useState(null)

//     useEffect(() => {
//         auth().catch(() => setIsAuthorized(false))
//     },[])

//     const refreshToken = async () => {
//         const refreshToken = localStorage.getItem(REFRESH_TOKEN)
//         try{
//             const res = await api.post('token/refresh/', {refresh:refreshToken})

//             if (res.status === 200) {
//                 localStorage.setItem(ACCESS_TOKEN, res.data.access)
//                 setIsAuthorized(true)
//             } else{
//                 setIsAuthorized(false)
//             }
//         }
//         catch(error) {
//             console.log(error)
//             setIsAuthorized(false)
//         }
       
//     }

//     const auth = async () => {
//         const token = localStorage.getItem(ACCESS_TOKEN)

//         if (!token) {
//             setIsAuthorized(false)
//             return
//         }

//         const decoded = jwtDecode(token) 
//         const tokenExpiration = decoded.exp
//         const now = Date.now() / 1000

//         if (tokenExpiration < now) {
//             await refreshToken()
//         } else {
//             setIsAuthorized(true)
//         }
//     }

//     if (isAuthorized === null) {
//         return <div> Loading... </div>
//     }

//     return isAuthorized ? children : <Navigate to='/land/' />
// }


// export default ProtectedRoute




















// import { useEffect, useState } from "react"
// import { ACCESS_TOKEN } from "../../../services/constants"
// import { Navigate } from "react-router-dom"
// import { jwtDecode } from "jwt-decode"

// import { useEffect, useState } from "react"
// import { Navigate } from "react-router-dom"
// import { ACCESS_TOKEN } from "../../../services/constants"


// function AdminProtected({chlildren}) {


//     const [isAuthorized, setIsAuthorized] = useState(false)

//     useEffect(() => {
//         auth()
//     },[])


//     const auth = () => {

//         try {
//             const token = localStorage.getItem(ACCESS_TOKEN)

//             const decoded = jwtDecode(token)
//             const role = decoded.role 
            

//             if (token) {
//                 setIsAuthorized(true)
//                 console.log(isAuthorized)
//                 console.log(role, 'rrroooooooooooooooooooooooooooooooooooooooooooollllllllllllllllle')
//             }
//             else{
//                 setIsAuthorized(false)
//             }
//         }
//         catch (error) {
//             setIsAuthorized(false)
//         }
//     }

//     console.log(isAuthorized)

//     return isAuthorized ? chlildren : <Navigate to='/admin/login' />
// }

// export default AdminProtected



// function AdminProtected({children}) {

//     const [isAuthorized, setIsAuthorized] = useState('')
// console.log(children);

//     useEffect(() => {
//         auth()
//     },[])

//     const auth = () => {
//         try{
//             const token = localStorage.getItem(ACCESS_TOKEN)

//             console.log(token)

//             if (token) {
//                 console.log('toooooooooooooooooken is there .....')
//                 setIsAuthorized('true')

//                 console.log('ddddddddd',isAuthorized)
//             }
//             else{
//                 setIsAuthorized(false)
//                 console.log('tokkn is nooooooooooooooooooooooo')
//             }
//         }
//         catch (error) {
//             console.log(error)
//         }
//     }

//     console.log(isAuthorized, '__________________________')

//     return isAuthorized ? children : <Navigate to='/admin/' />
// }

// export default AdminProtected 