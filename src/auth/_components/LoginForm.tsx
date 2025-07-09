import * as React from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  type LoginFormSchema,
} from "@/lib/validators/loginFormSchema";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFormLayout } from "@/components/layouts";

const LoginForm: React.FC = () => {
  const [isVisibe, setIsVisible] = React.useState<boolean>(false);
  const naviagte = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      regNum: "",
      password: "",
    },
  });

  async function SubmitLoginForm(data: LoginFormSchema) {
    await new Promise((resolve) =>
      setTimeout(() => {
        toast.success("Login successful, redirecting");
        setTimeout(() => {
          naviagte("/dashboard");
          resolve(null);
        }, 4000);
      }, 2000),
    );
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(SubmitLoginForm)}>
      <div className="flex flex-col gap-8">
        <div>
          <Label htmlFor="regNum" className="mb-4">
            Username
          </Label>
          <Input
            className={`border ${
              errors.regNum ? "border-red-300" : "border-gray-300"
            } focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none`}
            type="text"
            {...register("regNum")}
            placeholder="Emter username"
            id="regNum"
          />
          {errors.regNum && (
            <span className="text-red-600 text-xs select-none">
              {errors.regNum.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="mb-4">
            Password
          </Label>
          <div className="relative flex">
            <Input
              className={`border ${
                errors.password ? "border-red-300" : "border-gray-300"
              } focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none`}
              type={isVisibe ? "text" : "password"}
              {...register("password")}
              placeholder="Enter password"
              id="password"
            />
            <span
              className="absolute right-2 top-2.5 cursor-pointer"
              onClick={(): void => setIsVisible((prev) => !prev)}
            >
              {isVisibe ? <EyeOff size={17} /> : <Eye size={17} />}
            </span>
          </div>
          {errors.password && (
            <span className="text-red-600 text-xs select-none">
              {errors.password.message}
            </span>
          )}
          <div className="flex justify-end mt-1 mb-2">
            <Link
              className="flex text-end text-green-400 font-light text-[12px] underline"
              to=""
            >
              Forgotten password?
            </Link>
          </div>
        </div>
        <div className="w-full h-[0.3px] bg-gray-400 z-10" />
      </div>
      <button
        className="rounded-sm text-white text-[15px] font-semibold mt-4 cursor-pointer w-24 h-10 bg-green-500 flex items-center justify-center"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

const LoginBody: React.FC = () => {
  return (
    <AuthFormLayout
      heading="Welcome to TMIT ADMIN PORTAL"
      subtitle="Please login to portal"
    >
      <LoginForm />
      <Toaster richColors position="top-left" />
    </AuthFormLayout>
  );
};

export { LoginBody, type LoginFormSchema };
