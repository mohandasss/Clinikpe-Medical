import React from "react";
import { TextInput, Button } from "@mantine/core";
import { useFormContext, Controller } from "react-hook-form";
import { colors } from "../../../Constants/colors";
import type { InviteProviderType } from "../schemas/provider.schema";

interface InviteCardProps {
  isSubmitting?: boolean;
  onSend: () => void;
}

export default function InviteCard({
  isSubmitting = false,
  onSend,
}: InviteCardProps) {
  const { control, watch } = useFormContext<{ invite: InviteProviderType }>();
  const email = watch("invite.email");

  return (
    <div className="rounded-lg p-2" style={{ backgroundColor: "#EFF6FF" }}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1">
          <Controller
            name="invite.email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                label="Send invite to a doctor"
                placeholder="Enter doctor's email"
                {...field}
                error={error?.message}
                disabled={isSubmitting}
                size="sm"
                radius="md"
                classNames={{
                  label: "text-primary font-medium text-sm mb-1",
                }}
              />
            )}
          />
        </div>
        <button
          onClick={onSend}
          disabled={isSubmitting || !email}
          className="px-6 py-2 rounded-lg text-white font-medium text-sm whitespace-nowrap transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed self-end"
          style={{ backgroundColor: colors.primary }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
