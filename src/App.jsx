import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router"
import { Dashboard, Invoices, Login, Signup, Transactions, VATSummaries } from "./pages"
import ProtectedRoute from './components/custom/ProtectedRoute';
import Redirect from './components/custom/Redirect';

function App() {

  return (
    <>
      <ToastContainer position='top-right' className='text-sm' />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />    
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/vat-summaries" element={<VATSummaries />} />  
        <Route path="/signin" element={<Redirect><Login /></Redirect>} />
        <Route path="/signup" element={<Redirect><Signup /></Redirect>} />
      </Routes>
    </>
  )
}

export default App
