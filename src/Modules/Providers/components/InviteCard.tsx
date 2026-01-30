import React, { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { colors } from "../../../Constants/colors";

interface InviteCardProps {
  onSend?: (email: string) => void;
}

export default function InviteCard({ onSend }: InviteCardProps) {
  const [inviteEmail, setInviteEmail] = useState("");

  const handleSendInvite = () => {
    if (inviteEmail.trim()) {
      onSend?.(inviteEmail);
      setInviteEmail("");
    }
  };

  return (
    <div className="rounded-lg p-2" style={{ backgroundColor: "#EFF6FF" }}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-primary">Send invite to a doctor</h3>
        <button
          onClick={handleSendInvite}
          className="px-6 py-2 rounded-lg text-white font-medium text-sm whitespace-nowrap transition hover:opacity-90 self-center"
          style={{ backgroundColor: colors.primary }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
