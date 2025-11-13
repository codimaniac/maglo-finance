import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router"
import { Dashboard, Invoices, Login, Signup } from "./pages"
import ProtectedRoute from './components/custom/ProtectedRoute';

function App() {

  return (
    <>
      <ToastContainer position='top-right' className='text-sm' />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />        
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
