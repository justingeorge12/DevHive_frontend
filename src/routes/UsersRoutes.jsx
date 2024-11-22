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
// import FindAns from "../components/userside/pages/FindAns";
import UserLogProtected from "./ProtectedRoutes/UserLogProtected";
import ListUsers from "../components/userside/pages/ListUsers";
import ListTags from "../components/userside/pages/ListTags";
import Questions from "../components/userside/pages/Questions";
import AskQuestion from "../components/userside/pages/QA/AskQuestion";
import Answer from "../components/userside/pages/QA/Answer";
import Profile from "../components/userside/pages/Profile";
import ProfQuesDetails from "../components/userside/pages/ProfileCompo/details/ProfQuesDetails";
import OtherUserProfile from "../components/userside/pages/Usermanage/OtherUserProfile";
// import Chat from "../components/userside/pages/chat/Chat";
import ChatPage from "../components/userside/pages/chat/ChatPage";
import Store from "../components/userside/pages/reward/Store";
import OrderDetails from "../components/userside/pages/reward/OrderDetails";
import OneProductView from "../components/userside/pages/reward/productDetail/OneProductView";
import OrderSuccess from "../components/userside/pages/reward/productDetail/OrderSuccess";
import OrderCancel from "../components/userside/pages/reward/productDetail/OrderCancel";


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
            <Route path="*" element={<NotFound />} />
            
            <Route path="/" element={<ProtectedRoute> <HomePage /> </ProtectedRoute> } />
            <Route path="/users" element={<ProtectedRoute>  <ListUsers/>  </ProtectedRoute>} />
            <Route path="/tags" element={<ProtectedRoute>  <ListTags />  </ProtectedRoute>} />
            <Route path="/questions" element={<ProtectedRoute> <Questions /> </ProtectedRoute>} />
            <Route path="/askquestion" element={<ProtectedRoute> <AskQuestion /> </ProtectedRoute>} />
            <Route path="/answer" element={<ProtectedRoute> <Answer /> </ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
            <Route path="/userquestion" element={<ProtectedRoute> <ProfQuesDetails /> </ProtectedRoute>} />
            <Route path="/:username" element={<ProtectedRoute> <OtherUserProfile /> </ProtectedRoute>} />
            <Route path="/chatpage" element={<ProtectedRoute> <ChatPage /> </ProtectedRoute>} />
            <Route path="/chatpage/:receiver_id" element={<ProtectedRoute> <ChatPage /> </ProtectedRoute>} />
            <Route path="/store" element={<ProtectedRoute> <Store /> </ProtectedRoute>} />
            <Route path="/orderdetails" element={<ProtectedRoute><OrderDetails /> </ProtectedRoute>} />
            <Route path="/oneproductview" element={<ProtectedRoute><OneProductView /> </ProtectedRoute>} />
            <Route path="/ordersuccess" element={<ProtectedRoute><OrderSuccess /> </ProtectedRoute>} />
            <Route path="/ordercancel" element={<ProtectedRoute><OrderCancel /> </ProtectedRoute>} />
        </Routes>
    )
}

export default UsersRoutes