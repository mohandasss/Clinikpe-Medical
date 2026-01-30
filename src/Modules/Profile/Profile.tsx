import React from "react";
import ProfileMenu from "./components/ProfileMenu";

const Profile = () => {
  const profileData = {
    storeName: "City Medical Store",
    location: "123 Health Ave, Wellness City",
    ownerName: "Ajji Rahaman",
    phoneNumber: "+91 9693566430",
  };

  const handleQRCode = () => {
    console.log("QR Code clicked");
  };

  const handleAvailability = () => {
    console.log("Availability Management clicked");
  };

  const handleHelpSupport = () => {
    console.log("Help & Support clicked");
  };

  const handleChangePassword = () => {
    console.log("Change Password clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="w-full">
      <ProfileMenu
        data={profileData}
        onQRCode={handleQRCode}
        onAvailability={handleAvailability}
        onHelpSupport={handleHelpSupport}
        onChangePassword={handleChangePassword}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Profile;