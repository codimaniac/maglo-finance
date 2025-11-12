import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router"
import { Dashboard, Login, Signup } from "./pages"

function App() {

  return (
    <>
      <ToastContainer position='top-right' className='text-sm' />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
