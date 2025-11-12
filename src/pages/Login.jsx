import Logo from "@/assets/logo.svg"
import AuthImage from "@/assets/auth-image.png"
import { LoginForm } from "@/components/login-form"
import { useEffect } from "react"
import { checkSession } from "@/appwrite/config"
import { useNavigate } from "react-router"

export default function Login() {
  const navigate = useNavigate()
  useEffect(() => {
    window.addEventListener('unload', () => {
        checkSession().then(navigate('/'))
    });
  })

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img src={Logo} alt="Logo" className="h-auto w-31" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={AuthImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
