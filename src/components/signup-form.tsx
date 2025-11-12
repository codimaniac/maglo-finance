import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" type="text" placeholder="Mahfuzul Nabil" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="example@gmail.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" className="bg-primary text-accent-foreground cursor-pointer">Create Account</Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            <span>Already have an account? </span>
            <Link to='/signin' className="relative font-medium text-accent-foreground !no-underline hover:!text-accent-foreground hover:!no-underline">
              <span className="after:content-[' '] after:block after:absolute after:right-0 after:top-[150%] after:w-full after:h-[30px] after:border-t-4 after:border-primary after:rounded-t-[50%]">Sign in</span>
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
