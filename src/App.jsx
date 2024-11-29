import { BrowserRouter, Router, Route, Routes } from "react-router-dom"
import UsersRoutes from "./routes/UsersRoutes"
import AdminRoutes from "./routes/AdminRoutes"
import AdminLogin from "./components/adminside/auth/AdminLogin"
import { Toaster } from 'react-hot-toast';
import Dashboard from "./components/adminside/pages/Dashboard";
import SendNotification from "./components/userside/pages/Notification/SendNotification";
import Layout from "./components/userside/pages/Notification/Layout";


function App() {

  const userId = localStorage.getItem('user_id') || ''

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Layout>
          <Routes>
            <Route path="/*" element = {<UsersRoutes />} />
            <Route path="/admin/*" element = {<AdminRoutes />} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </>
  )
}

export default App
