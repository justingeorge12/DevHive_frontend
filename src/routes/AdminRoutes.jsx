import { Route, Routes } from "react-router-dom"
import AdminLogin from "../components/adminside/auth/AdminLogin"
import Dashboard from "../components/adminside/pages/Dashboard"
import Tags from "../components/adminside/pages/Tags"
import AdminProtected from "./ProtectedRoutes/admin/AdminProtected"

function AdminRoutes() {

    return(
        <>
            <Routes>
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/" element={<AdminProtected> <Dashboard /> </AdminProtected> } />
                {/* <Route path="/" element={<Dashboard /> } /> */}
                <Route path="/tags" element={<AdminProtected> <Tags /> </AdminProtected> } />
            </Routes>
        </>
    )
}

export default AdminRoutes