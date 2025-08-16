import { useContext, useState } from "react";
import { Lock, Camera, Check, Trash2 } from "lucide-react";

import { AuthContext } from "../context";

import { Card } from "../components/Commons/Card";
import { Input } from "../components/Commons/Input";
import { Button } from "../components/Commons/Button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../components/Commons/Avatar";

import ChangeAvatarModal from "../components/Modals/ChangeAvatarModal";
import DeleteAccountModal from "../components/Modals/DeleteAccountModal";
import ChangePasswordModal from "../components/Modals/ChangePasswordModal";
import { toast } from "react-toastify";
import { useFetch } from "../hooks/useFetch";
import type { User } from "../types/user";
import useModal from "../hooks/useModal";

export function AccountPage() {
  const { process, isPending } = useFetch({
    tx: "UpdateUser",
    fnName: "update-user",
  });

  const { user, handleUpdateUser } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
  });

  const {
    isOpen: isChangePasswordModalOpen,
    openModal: openChangePasswordModal,
    closeModal: closeChangePasswordModal,
  } = useModal(false);
  const {
    isOpen: isDeleteAccountModalOpen,
    openModal: openDeleteAccountModal,
    closeModal: closeDeleteAccountModal,
  } = useModal(false);
  const {
    isOpen: isChangeAvatarModalOpen,
    openModal: openChangeAvatarModal,
    closeModal: closeChangeAvatarModal,
  } = useModal(false);

  const handleSaveProfile = async () => {
    const { firstName, lastName } = user as User;

    if (firstName === userData.firstName && lastName === userData.lastName)
      return;

    await toast.promise(process(userData), {
      error: "Error updating profile",
      pending: "Updating profile...",
      success: "Profile updated successfully",
    });

    handleUpdateUser(userData.firstName, userData.lastName);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Profile Information
        </h2>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={""} />
                <AvatarFallback className="text-lg">
                  {user && user.firstName}
                  {user && user.lastName}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                onClick={
                  isChangeAvatarModalOpen
                    ? closeChangeAvatarModal
                    : openChangeAvatarModal
                }
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20 capitalize">
              {user && user.role.toLowerCase()}
            </div>
          </div>

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
                  value={user ? (user.email as string) : ""}
                  disabled
                  placeholder="Enter your email"
                  className="flex-1"
                />
                {user ? (
                  <div className="flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-md border border-green-200">
                    <Check className="h-4 w-4" />
                  </div>
                ) : (
                  <Button variant="outline">Verify</Button>
                )}
              </div>
              {user && user.email ? (
                <p className="text-sm text-green-600 mt-1">Email verified</p>
              ) : (
                <p className="text-sm text-amber-600 mt-1">
                  Email not verified
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveProfile} disabled={isPending}>
              Save Profile
            </Button>
          </div>
        </div>
      </Card>

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
            <Button
              variant="outline"
              onClick={
                isChangePasswordModalOpen
                  ? closeChangePasswordModal
                  : openChangePasswordModal
              }
            >
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
            <Button
              variant="destructive"
              onClick={
                isDeleteAccountModalOpen
                  ? closeDeleteAccountModal
                  : openDeleteAccountModal
              }
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </Card>

      {/* Modals */}
      <ChangePasswordModal
        open={isChangePasswordModalOpen}
        onOpenChange={
          isChangePasswordModalOpen
            ? closeChangePasswordModal
            : openChangePasswordModal
        }
      />
      <DeleteAccountModal
        open={isDeleteAccountModalOpen}
        onOpenChange={
          isDeleteAccountModalOpen
            ? closeDeleteAccountModal
            : openDeleteAccountModal
        }
      />
      <ChangeAvatarModal
        open={isChangeAvatarModalOpen}
        onOpenChange={
          isChangePasswordModalOpen
            ? closeChangePasswordModal
            : openChangePasswordModal
        }
        currentAvatar={""}
        userName={`${user && user.firstName} ${user && user.lastName}`}
        onAvatarChange={() => null}
      />
    </div>
  );
}
