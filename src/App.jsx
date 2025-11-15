import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router"
import { useEffect } from "react";
import { Dashboard, Invoices, Login, Signup, Transactions, VATSummaries } from "./pages"
import { checkIfDocumentExists, checkSession, databases } from "@/lib/appwrite";
import { useDatabaseStore } from "@/store/useDatabaseStore";
import { useStateStore } from "@/store/useStateStore";
import ProtectedRoute from './components/custom/ProtectedRoute';
import Redirect from './components/custom/Redirect';

function App() {
  const user = useDatabaseStore((state) => state.user);
  const { hasShownWelcome, setHasShownWelcome } = useStateStore()
  const fetchInvoices = useDatabaseStore((state) => state.fetchInvoices);
  const getUserDetails = useDatabaseStore((state) => state.getUserDetails);

  useEffect(() => {
    checkSession().then(async (user) => {
      const userDocExist = await checkIfDocumentExists(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
          user.$id
      );
      console.log('User document exists:', userDocExist);

      const userDoc = userDocExist ? await databases.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
          user.$id
      ) : {};

      console.log('User document:', userDoc);

      if (userDocExist && !userDoc.$id || !userDoc.firstName || !userDoc.lastName || !userDoc.email) {
          const newUser = await databases.createDocument(
              import.meta.env.VITE_APPWRITE_DATABASE_ID,
              import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
              user.$id,
              {
                  firstName: user.name?.split(" ")[0] || '',
                  lastName: user.name?.split(" ")[1] || '',
                  email: user.email || ''
              }
          );

          console.log('New user document created:', newUser);
      }

      if (!hasShownWelcome) {
        toast.success(`Welcome back, ${user.name || user.email}!`)
        setHasShownWelcome(true)
      }
      console.log(user)
      fetchInvoices(user.$id);
    });
    
  }, [user.$id]);

  useEffect(() => {
    getUserDetails()
    console.log('User state changed:', user);
  }, [user.$id])

  return (
    <>
      <ToastContainer position='top-right' className='text-sm' />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />    
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/vat-summaries" element={<ProtectedRoute><VATSummaries /></ProtectedRoute>} />  
        <Route path="/signin" element={<Redirect><Login /></Redirect>} />
        <Route path="/signup" element={<Redirect><Signup /></Redirect>} />
      </Routes>
    </>
  )
}

export default App
