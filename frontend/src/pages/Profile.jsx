import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Target,
  TrendingUp,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { goalContext } from "../context/GoalContext";
import Navbar from "../components/layout/Navbar";
import AppSidebar from "../components/layout/AppSidebar";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getUser, updateUserDetails, updateUserPassword } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const {user} = useContext(AuthContext)
  const { goals } = useContext(goalContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [passwordStates, setPasswordStates] = useState({
    current: "password",
    new: "password",
    confirm: "password",
  });



  const updatePassword = async (data) => {
    if (
      !data.currentPassword?.trim() ||
      !data.newPassword?.trim() ||
      !data.confirmPassword?.trim()
    ) {
      return toast.error("Please fill out all password fields");
    }

    if (data.newPassword.trim() === data.currentPassword.trim()) {
      return toast.error("New password must be different");
    }

    if (data.newPassword.trim() !== data.confirmPassword.trim()) {
      return toast.error("Passwords do not match");
    }

    const payload = {
      currentPassword: data.currentPassword.trim(),
      newPassword: data.newPassword.trim(),
    };

    try {
      setIsLoading2(true);
      await updateUserPassword(payload);
      toast.success("Password updated successfully");
      reset(); // reset form after success
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 401 && message) {
        toast.error(message);
      } else {
        toast.error("An error occurred while updating password");
      }
    } finally {
      setIsLoading2(false);
    }
  };

  const updateDetails = async (data) => {
    if (!data.username?.trim() || !data.email?.trim()) {
      return toast.error("Please fill out all the fields");
    }

    const payload = {
      username: data.username.trim(),
      email: data.email.trim(),
    };

    try {
      setIsLoading(true);
      await updateUserDetails(payload);
      toast.success("User updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  const togglePasswordVisibility = (field) => {
    setPasswordStates((prev) => ({
      ...prev,
      [field]: prev[field] === "password" ? "text" : "password",
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="lg:pl-64 pt-20">
        <div className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
                Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Manage your profile information and view your progress
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900 dark:text-white transition-colors duration-200">
                      <User className="mr-2 h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                      Update your profile details
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit(updateDetails)}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Full Name
                          </Label>
                          <Input
                            {...register("username")}
                            id="name"
                            defaultValue={user?.username}
                            disabled={isLoading}
                            className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-gray-700 dark:text-gray-300 transition-colors duration-200"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue={user?.email}
                            disabled={isLoading}
                            {...register("email")}
                            className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-200"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isLoading}
                          className="bg-[#255cd5] text-white px-[34.5px] hover:bg-[#1d4ed8] cursor-pointer hover:shadow-lg transition-all duration-300  dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating Profile
                            </>
                          ) : (
                            "Update Profile"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </form>
                </Card>

                {/* Change Password */}
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white transition-colors duration-200">
                      Change Password
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit(updatePassword)}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 relative">
                        <Label
                          htmlFor="current-password"
                          className="text-gray-700 dark:text-gray-300 transition-colors duration-200"
                        >
                          Current Password
                        </Label>
                        <Input
                          autoComplete="current-password"
                          id="current-password"
                          type={passwordStates.current}
                          required
                          {...register("currentPassword", {
                            minLength: {
                              value: 6,
                              message:
                                "Password must be at least 6 characters long",
                            },
                          })}
                          className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-200 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("current")}
                          className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                        >
                          {passwordStates.current === "password" ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.currentPassword && (
                        <p className="text-red-500 text-sm -mt-2">
                          {errors.currentPassword.message}
                        </p>
                      )}

                      <div className="space-y-2 relative">
                        <Label
                          htmlFor="new-password"
                          className="text-gray-700 dark:text-gray-300 transition-colors duration-200"
                        >
                          New Password
                        </Label>
                        <Input
                          autoComplete="new-password"
                          id="new-password"
                          type={passwordStates.new}
                          required
                          {...register("newPassword", {
                            minLength: {
                              value: 6,
                              message:
                                "Password must be at least 6 characters long",
                            },
                          })}
                          className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-200 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                        >
                          {passwordStates.new === "password" ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.newPassword && (
                        <p className="text-red-500 text-sm -mt-2">
                          {errors.newPassword.message}
                        </p>
                      )}
                      <div className="space-y-2 relative">
                        <Label
                          htmlFor="confirm-password"
                          className="text-gray-700 dark:text-gray-300 transition-colors duration-200"
                        >
                          Confirm New Password
                        </Label>
                        <Input
                          autoComplete="confirm-password"
                          id="confirm-password"
                          type={passwordStates.confirm}
                          required
                          {...register("confirmPassword", {
                            minLength: {
                              value: 6,
                              message:
                                "Password must be at least 6 characters long",
                            },
                          })}
                          className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-200 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                        >
                          {passwordStates.confirm === "password" ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm -mt-2 mb-0">
                          {errors.confirmPassword.message}
                        </p>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading2}
                        className="bg-[#255cd5] text-white px-6 hover:bg-[#1d4ed8] cursor-pointer hover:shadow-lg transition-all duration-300 dark:bg-blue-600 dark:hover:bg-blue-700 mt-4"
                      >
                        {isLoading2 ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating Password
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </CardContent>
                  </form>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
