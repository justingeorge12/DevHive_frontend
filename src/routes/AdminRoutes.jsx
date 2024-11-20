import { Route, Routes } from "react-router-dom"
import AdminLogin from "../components/adminside/auth/AdminLogin"
import Dashboard from "../components/adminside/pages/Dashboard"
import NotFound from '../components/common/NotFound'
import Tags from "../components/adminside/pages/Tags"
import AdminProtected from "./ProtectedRoutes/admin/AdminProtected"
import AdminLogProtect from "./ProtectedRoutes/admin/AdminLogProtect"
import ListUser from "../components/adminside/pages/ListUser"
import AdminQuestion from "../components/adminside/pages/QAmanage/AdminQuestion"
import QuestionManage from "../components/adminside/pages/QAmanage/QuestionManage"
import TailSidebar from "../components/adminside/layout/TailSidebar"
import AdminProduct from "../components/adminside/pages/rewards/AdminProducts"
import AddProduct from "../components/adminside/pages/rewards/AddProduct"
import EditProduct from "../components/adminside/pages/rewards/EditProduct"
// import AddProduct from "../components/adminside/pages/rewards/AddProduct"
// import Questions from "../components/userside/pages/Questions"

function AdminRoutes() {

    return(
        <>
            <Routes>
                <Route path="/login" element={<AdminLogProtect children = {<AdminLogin />} redirectTo={'/admin/'} />} />
                {/* <Route path="/login" element={<AdminLogin /> } /> */}
                <Route path="/" element={<AdminProtected> <Dashboard /> </AdminProtected> } />
                <Route path="*" element={<NotFound />} />

                {/* <Route path="/" element={<Dashboard /> } /> */}
                <Route path="/tags" element={<AdminProtected> <Tags /> </AdminProtected> } />
                <Route path="/users" element={<AdminProtected> <ListUser /> </AdminProtected>} />
                <Route path="/allquestions" element={<AdminProtected> <AdminQuestion />  </AdminProtected> } />
                <Route path="/questiondetail" element={<AdminProtected> <QuestionManage /> </AdminProtected>} />
                <Route path="/products" element={<AdminProtected><AdminProduct /> </AdminProtected>}  />
                <Route path="/addproduct" element={<AdminProtected><AddProduct /> </AdminProtected>} />
                <Route path="/editproduct/:product_id" element={<AdminProtected><EditProduct /> </AdminProtected>} />

            </Routes>
        </>
    )
}

export default AdminRoutes