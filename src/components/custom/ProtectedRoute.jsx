import { checkSession } from "@/lib/appwrite"
import { useNavigate } from "react-router"

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const user = checkSession()

    if (!user) {
        return navigate('/signin')
    }
    
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute