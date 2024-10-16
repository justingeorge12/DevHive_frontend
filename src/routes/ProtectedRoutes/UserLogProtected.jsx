import React from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

function UserLogProtected({children, redirectTo}) {

    const location = useLocation() 
    console.log(location, 'loooooooocation ')
    const role = useSelector(state => state.auth?.role)
    console.log(useSelector(state => state.auth));
    

    if (role === 'user') {
        return <Navigate to = {redirectTo} replace />
    }
    return children 
}

export default UserLogProtected




// import React from 'react'
// import { useSelector } from 'react-redux';
// import { Navigate, useLocation } from 'react-router-dom'

// const RedirectIfAuthenticated = ({element, redirectTo}) => {
//     const location = useLocation();
//     console.log(location,'location');
//     const role = useSelector(state=>state.auth?.role)
    
//     if (role) {
//         return <Navigate to={redirectTo} replace />;
//     }

//     return element;
// }

// export default RedirectIfAuthenticated