
import React from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"


function AdminLogProtect({children, redirectTo}) {

    const location = useLocation()
    const role = useSelector(state => state.auth?.role)
    console.log(role, 'rooooooooooool')

    if(role === 'admin'){
        return <Navigate to = {redirectTo} replace />
    }

    return children
}

export default AdminLogProtect


// function UserLogProtected({children, redirectTo}) {

//     const location = useLocation() 
//     console.log(location, 'loooooooocation ')
//     const role = useSelector(state => state.auth?.role)
//     console.log(useSelector(state => state.auth));
    

//     if (role === 'user') {
//         return <Navigate to = {redirectTo} replace />
//     }
//     return children 
// }

// export default UserLogProtected