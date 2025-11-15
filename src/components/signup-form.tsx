import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { createUser } from "@/lib/appwrite";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    createUser(name, email, password)
      .then(() => {
        toast.success("Account created successfully!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Mahfuzul Nabil"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="• • • • • • •"
            required
          />
        </Field>
        <Field>
          <Button
            type="submit"
            className="bg-primary text-accent-foreground cursor-pointer"
          >
            Create Account
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            <span>Already have an account? </span>
            <Link
              to="/signin"
              className="relative font-medium text-accent-foreground !no-underline hover:!text-accent-foreground hover:!no-underline"
            >
              <span className="after:content-[' '] after:block after:absolute after:right-0 after:top-[150%] after:w-full after:h-[30px] after:border-t-4 after:border-primary after:rounded-t-[50%]">
                Sign in
              </span>
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
