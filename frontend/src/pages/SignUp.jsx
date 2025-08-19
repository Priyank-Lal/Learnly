import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Mail, Lock, User, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { registerAccount } from "../api/api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const [passwordState, setPasswordState] = useState("password");
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    setIsLoading(true);
    const payload = {
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password.trim()
    }
    try {
      const response = await registerAccount(payload);
      if (response.status === 201) {
        setUser(response.data.user)
        navigateTo("/dashboard");
        reset();
      } else {
        toast.error("An error has occurred");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <span className="flex justify-center items-center space-x-2">
              <Brain className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Learnly</span>
            </span>
          </div>

          <Card className="shadow-xl border bg-white dark:bg-white dark:border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-900">
                Create your account
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-600">
                Start your journey to achieving bigger goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-gray-700 dark:text-gray-700"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute top-[11px] left-3 h-4 w-4 text-gray-400 dark:text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10 bg-white dark:bg-white border-gray-300 dark:border-gray-300 text-gray-900 dark:text-gray-900"
                      required
                      autoComplete="new-username"
                      {...register("username")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 dark:text-gray-700"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <div className="flex items-center h-fit w-fit">
                      <Mail className="absolute top-[11px] left-3 h-4 w-4 text-gray-400 dark:text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-white dark:bg-white border-gray-300 dark:border-gray-300 text-gray-900 dark:text-gray-900"
                      required
                      autoComplete="new-email"
                      {...register("email")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 dark:text-gray-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute top-[11px] left-3 h-4 w-4 text-gray-400 dark:text-gray-400" />
                    <Input
                      id="password"
                      type={passwordState}
                      placeholder="Create a password"
                      className="pl-10 bg-white dark:bg-white border-gray-300 dark:border-gray-300 text-gray-900 dark:text-gray-900"
                      autoComplete="new-password"
                      required
                      {...register("password", {
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                      })}
                    />
                    {passwordState === "password" ? (
                      <Eye
                        onClick={() => setPasswordState("text")}
                        className="absolute top-[11px] right-3 h-4 w-4 text-gray-400 dark:text-gray-400 cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setPasswordState("password")}
                        className="absolute top-[11px] right-3 h-4 w-4 text-gray-400 dark:text-gray-400 cursor-pointer"
                      />
                    )}
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="bg-[#2463eb] hover:bg-[#1d4ed8] text-white dark:text-white cursor-pointer hover:shadow-lg transition-all duration-300 w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;
