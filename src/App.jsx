import { BrowserRouter, Router, Route, Routes } from "react-router-dom"
import UsersRoutes from "./routes/UsersRoutes"
import AdminRoutes from "./routes/AdminRoutes"
import AdminLogin from "./components/adminside/auth/AdminLogin"
import { Toaster } from 'react-hot-toast';
import Dashboard from "./components/adminside/pages/Dashboard";


function App() {

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/*" element = {<UsersRoutes />} />
          <Route path="/admin/*" element = {<AdminRoutes />} />
        </Routes>
      </BrowserRouter>

        {/* <AdminLogin /> */}
        {/* <Dashboard /> */}

    </>
  )
}

export default App
