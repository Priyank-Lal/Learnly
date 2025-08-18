import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Bell,
  Moon,
  Sun,
  Palette,
  Shield,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AppSidebar from "../components/layout/AppSidebar";
import Navbar from "../components/layout/Navbar";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";
import { deleteUser } from "../api/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Settings() {
  // const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [deletingUser, setDeletingUser] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const navigateTo = useNavigate();
  const { setUser } = useContext(AuthContext);
  const throwToast = () => {
    toast.message("Just a normal Button");
  };

  const deleteAccount = async () => {
    try {
      setDeletingUser(true);
      await deleteUser();
      setUser(null);
      navigateTo("/login");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setDeletingUser(false);
    }
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
                Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Customize your Learnly experience
              </p>
            </div>

            <div className="space-y-6">
              {/* Appearance */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900 dark:text-white transition-colors duration-200">
                    <Palette className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Appearance
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                    Customize how Learnly looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        Dark Mode
                      </Label>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                        Switch between light and dark themes
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* <Sun
                        className={`h-4 w-4 ${
                          !darkMode
                            ? "text-yellow-500"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      /> */}
                      <Switch
                        checked={isDark}
                        // onCheckedChange={setDarkMode}
                        onClick={toggleTheme}
                        className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                      />
                      {/* <Moon
                        className={`h-4 w-4 ${
                          darkMode
                            ? "text-blue-500"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      /> */}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900 dark:text-white transition-colors duration-200">
                    <Bell className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Notifications
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                    Manage how you receive updates and reminders
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        All Notifications
                      </Label>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                        Enable or disable all notifications
                      </div>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                      className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                      onClick={throwToast}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        Email Notifications
                      </Label>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                        Receive updates via email
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications && notifications}
                      onCheckedChange={setEmailNotifications}
                      disabled={!notifications}
                      className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        Push Notifications
                      </Label>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                        Get instant browser notifications
                      </div>
                    </div>
                    <Switch
                      checked={pushNotifications && notifications}
                      onCheckedChange={setPushNotifications}
                      disabled={!notifications}
                      className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        Weekly Progress Reports
                      </Label>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                        Receive weekly summaries of your progress
                      </div>
                    </div>
                    <Switch
                      checked={weeklyReports && notifications}
                      onCheckedChange={setWeeklyReports}
                      disabled={!notifications}
                      className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900 dark:text-white transition-colors duration-200">
                    <Shield className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                    Manage your account security and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        Two-Factor Authentication
                      </Label>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                      onClick={throwToast}
                    >
                      Enable
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        Data Export
                      </Label>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                        Download a copy of your data
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                      onClick={throwToast}
                    >
                      Export
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        Delete Account
                      </Label>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                        Permanently delete your account and all data
                      </div>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="dark:bg-red-600 dark:hover:bg-red-700 cursor-pointer"
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-gray-900 dark:text-white">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                            This action cannot be undone. This will permanently
                            delete your Account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={deleteAccount}
                            variant="destructive"
                            className=" bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-500 transition-colors duration-200 cursor-pointer"
                          >
                            {deletingUser ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting User...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>

              {/* Save Changes */}
              {/* <div className="flex justify-end">
                <Button
                  size="lg"
                  className="bg-[#2463eb] hover:bg-[#1d4ed8] dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300"
                >
                  Save Changes
                </Button>
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
