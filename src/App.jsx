import { Route, Routes } from "react-router"
import { LoginPage, SignupPage } from "./pages"

function App() {

  return (
    <Routes>
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}

export default App
