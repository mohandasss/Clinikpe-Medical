import React from "react";
import InviteCard from "./components/InviteCard";
import ProviderForm from "./components/ProviderForm";
import SetAvailability from "./components/SetAvailability";
const AddProvider = () => {
  const handleSendInvite = (email: string) => {
    console.log("Send invite to:", email);
  };

  const handleSubmitProvider = (formData: any, profileImage: File | null) => {
    console.log("Add provider:", formData, profileImage);
  };

  return (
    <div className="w-full  space-y-4">
      <InviteCard onSend={handleSendInvite} />
      <ProviderForm onSubmit={handleSubmitProvider} />
      <SetAvailability onSave={(slots) => console.log("Availability saved:", slots)} />
    </div>
  );
};

export default AddProvider;
