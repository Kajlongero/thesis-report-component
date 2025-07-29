import { useState } from "react";
import { Lock, Camera, Check, Trash2 } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/Avatar";

import ChangePasswordModal from "../components/ui/Modals/ChangePassword";
import DeleteAccountModal from "../components/ui/Modals/DeleteAccount";

export default function Account() {
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatar: "",
    emailVerified: false,
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const handleSaveProfile = () => {
    // Save profile logic here
    console.log("Profile saved:", userData);
  };

  const handleVerifyEmail = () => {
    // Email verification logic here
    console.log("Verification email sent");
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccount(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Profile Information
        </h2>

        <div className="flex flex-col space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="text-lg">
                  {userData.firstName[0]}
                  {userData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                First Name
              </label>
              <Input
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Last Name
              </label>
              <Input
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="flex gap-2">
                <Input
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="flex-1"
                />
                {userData.emailVerified ? (
                  <div className="flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-md border border-green-200">
                    <Check className="h-4 w-4" />
                  </div>
                ) : (
                  <Button variant="outline" onClick={handleVerifyEmail}>
                    Verify
                  </Button>
                )}
              </div>
              {userData.emailVerified ? (
                <p className="text-sm text-green-600 mt-1">Email verified</p>
              ) : (
                <p className="text-sm text-amber-600 mt-1">
                  Email not verified
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveProfile}>Save Profile</Button>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-5 w-5 text-foreground" />
          <h2 className="text-xl font-semibold text-foreground">Security</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-medium text-foreground">Change Password</h3>
              <p className="text-sm text-muted-foreground">
                Update your password for better security
              </p>
            </div>
            <Button variant="outline" onClick={handleChangePassword}>
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
            <div>
              <h3 className="font-medium text-destructive">Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </Card>

      {/* Modals */}
      <ChangePasswordModal
        open={showChangePassword}
        onOpenChange={setShowChangePassword}
      />
      <DeleteAccountModal
        open={showDeleteAccount}
        onOpenChange={setShowDeleteAccount}
      />
    </div>
  );
}
