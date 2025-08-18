import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
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
import { loginAccount } from "../api/api";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordState, setPasswordState] = useState("password");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(AuthContext);

  const navigateTo = useNavigate();

  const submitHandler = async (data) => {
    setIsLoading(true);
    const payload = {
      email: data.email.trim(),
      password: data.password.trim(),
    };
    try {
      const response = await loginAccount(payload);
      if (response.status === 200) {
        setUser(response.data.user);
        navigateTo("/dashboard");
        reset();
      } else {
        console.log(response.data.message);
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
            <span className="inline-flex items-center space-x-2">
              <Brain className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Learnly</span>
            </span>
          </div>

          <Card className="shadow-xl border bg-white dark:bg-white dark:border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-900">
                Welcome back
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-600">
                Sign in to your account to continue your goal journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 dark:text-gray-700"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute top-[11px] left-3 h-4 w-4 text-gray-400 dark:text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-white dark:bg-white border-gray-300 dark:border-gray-300 text-gray-900 dark:text-gray-900"
                      required
                      autoComplete="email"
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
                      placeholder="Enter your password"
                      className="pl-10 bg-white dark:bg-white border-gray-300 dark:border-gray-300 text-gray-900 dark:text-gray-900"
                      required
                      autoComplete="password"
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
                  className="bg-[#2463eb] hover:bg-[#1d4ed8] text-white dark:text-white cursor-pointer hover:shadow-lg transition-all duration-300 w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signUp"
                    className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
                  >
                    Sign up
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

export default Login;
