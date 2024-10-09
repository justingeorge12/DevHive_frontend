import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserRegister from "../components/userside/auth/UserRegister";
import UserLogin from "../components/userside/auth/UserLogin";
import LandingPage from "../components/userside/auth/LandingPage";
import ForgetPass from "../components/userside/auth/ForgetPass";
import Otp from "../components/userside/auth/Otp";
import ResetPass from "../components/userside/auth/ResetPass";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import HomePage from "../components/userside/pages/HomePage";
import NotFound from "../components/common/NotFound";
import FindAns from "../components/userside/pages/FindAns";
import UserLogProtected from "./ProtectedRoutes/UserLogProtected";


function Logout() {
    localStorage.clear()
    return <Navigate to='/login' />
}

function RegisterAndLogout() {
    localStorage.clear()
    return <UserRegister />
}


function UsersRoutes() {

    return(
        <Routes>
            <Route path="/land/" element = {<UserLogProtected children={<LandingPage />} redirectTo={'/'} />}  />
            <Route path="/register" element = {<UserLogProtected children={<RegisterAndLogout />} redirectTo={'/'} />} />
            <Route path="/login/" element = {<UserLogProtected children={<UserLogin />} redirectTo={'/'} />} />
            <Route path="/logout" element = {<Logout />} />
            <Route path='/forgetpass' element={<UserLogProtected children={<ForgetPass /> } redirectTo={'/'}/> } />
            <Route path="/otp" element={<UserLogProtected children={ <Otp />} redirectTo={'/'}/> } />
            <Route path="/resetpass" element={<UserLogProtected children={<ResetPass /> } redirectTo={'/'} /> } />
            <Route path="/" element={<ProtectedRoute> <HomePage /> </ProtectedRoute> } />
            <Route path="*" element={<NotFound />} />
            <Route path="/find" element={<ProtectedRoute> <FindAns /> </ProtectedRoute> } />
        </Routes>
    )
}

export default UsersRoutes