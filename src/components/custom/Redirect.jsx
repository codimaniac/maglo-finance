import { checkSession } from "@/lib/appwrite"
import { useEffect, useState } from "react"
import { Navigate } from "react-router"
import LoadingState from "./LoadingState"

const Redirect = ({children}) => {    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        checkSession()
            .then((session) => setUser(session.$id))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    console.log(user)

    
    if (loading) return <LoadingState />

    if (user) return <Navigate to="/" replace />
    
    return children
}

export default Redirect