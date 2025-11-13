import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router"
import { Dashboard, Invoices, Login, Signup, Transactions, VATSummaries } from "./pages"
import ProtectedRoute from './components/custom/ProtectedRoute';

function App() {

  return (
    <>
      <ToastContainer position='top-right' className='text-sm' />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />    
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/vat-summaries" element={<ProtectedRoute><VATSummaries /></ProtectedRoute>} />  
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
