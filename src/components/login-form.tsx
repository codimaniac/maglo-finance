import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import { toast } from "react-toastify"
import { loginUser } from "@/appwrite/config"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get('remember-me') as string;

    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    loginUser(email, password, rememberMe)
      .then(() => {
        toast.success("Logged in successfully!") 
        navigate('/')
      })
      .catch((error) => {
        toast.error(`${error.message}`)
      });
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Welcome back! Please enter your details
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="Enter your email" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input id="password" name="password" type="password" placeholder="• • • • • • •" required />
        </Field>
        <Field>
          <div className="flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary/50"
              />
              <p>Remember for 30 days</p>
            </div>
            <a href="#">
              Forgot password
            </a>
          </div>
        </Field>
        <Field>
          <Button type="submit" className="bg-primary text-accent-foreground cursor-pointer">Sign in</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            <span>Don't have an account? </span>
            <Link to='/signup' className="relative font-medium text-accent-foreground !no-underline hover:!text-accent-foreground hover:!no-underline">
              <span className="after:content-[' '] after:block after:absolute after:right-0 after:top-[150%] after:w-full after:h-[30px] after:border-t-4 after:border-primary after:rounded-t-[50%]">Sign up for free</span>
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
