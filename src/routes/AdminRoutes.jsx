import { Route, Routes } from "react-router-dom"
import AdminLogin from "../components/adminside/auth/AdminLogin"
import Dashboard from "../components/adminside/pages/Dashboard"
import Tags from "../components/adminside/pages/Tags"
import AdminProtected from "./ProtectedRoutes/admin/AdminProtected"
import AdminLogProtect from "./ProtectedRoutes/admin/AdminLogProtect"
import ListUser from "../components/adminside/pages/ListUser"
import AdminQuestion from "../components/adminside/pages/QAmanage/AdminQuestion"
import QuestionManage from "../components/adminside/pages/QAmanage/QuestionManage"
// import Questions from "../components/userside/pages/Questions"

function AdminRoutes() {

    return(
        <>
            <Routes>
                <Route path="/login" element={<AdminLogProtect children = {<AdminLogin />} redirectTo={'/admin/'} />} />
                {/* <Route path="/login" element={<AdminLogin /> } /> */}
                <Route path="/" element={<AdminProtected> <Dashboard /> </AdminProtected> } />
                {/* <Route path="/" element={<Dashboard /> } /> */}
                <Route path="/tags" element={<AdminProtected> <Tags /> </AdminProtected> } />
                <Route path="/users" element={<AdminProtected> <ListUser /> </AdminProtected>} />
                <Route path="/allquestions" element={<AdminProtected> <AdminQuestion />  </AdminProtected> } />
                <Route path="/questiondetail" element={<AdminProtected> <QuestionManage /> </AdminProtected>} />
            </Routes>
        </>
    )
}

export default AdminRoutes