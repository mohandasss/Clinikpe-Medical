import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import InviteCard from "./components/InviteCard";
import ProviderForm from "./components/ProviderForm";
import SetAvailability from "./components/SetAvailability";
import {
  providerFormSchema,
  inviteProviderSchema,
} from "./schemas/provider.schema";
import { useAddProvider, useInviteProvider } from "./hooks/useAddProvider";
import { colors } from "../../Constants/colors";

// Extended schema that includes invite and availability
const addProviderPageSchema = z.object({
  fullName: providerFormSchema.shape.fullName,
  specialization: providerFormSchema.shape.specialization,
  experience: providerFormSchema.shape.experience,
  degree: providerFormSchema.shape.degree,
  consultationFee: providerFormSchema.shape.consultationFee,
  invite: inviteProviderSchema,
});

type AddProviderFormType = z.infer<typeof addProviderPageSchema>;

const AddProvider = () => {
  const methods = useForm<AddProviderFormType>({
    resolver: zodResolver(addProviderPageSchema),
    defaultValues: {
      fullName: "",
      specialization: "",
      experience: "",
      degree: "",
      consultationFee: "",
      invite: {
        email: "",
      },
    },
  });

  const { handleSubmit, reset } = methods;

  // Mutations for adding and inviting providers
  const addProviderMutation = useAddProvider({
    onSuccess: (data) => {
      toast.success(`Provider ${data.fullName} added successfully`);
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add provider");
    },
  });

  // Mutations for inviting providers
  const inviteProviderMutation = useInviteProvider({
    onSuccess: (data) => {
      toast.success(`Invitation sent to ${data.email}`);
      methods.resetField("invite.email");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send invitation");
    },
  });

  // Form submission handler
  const onSubmit = (data: AddProviderFormType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { invite, ...providerData } = data;

    addProviderMutation.mutate({
      ...providerData,
    });
  };

  // Invite handler
  const handleSendInvite = () => {
    const email = methods.getValues("invite.email");
    if (email) {
      inviteProviderMutation.mutate(email);
    }
  };

  // Determine if any mutation is in progress
  const isSubmitting =
    addProviderMutation.isPending || inviteProviderMutation.isPending;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <InviteCard isSubmitting={isSubmitting} onSend={handleSendInvite} />
        <ProviderForm isSubmitting={isSubmitting} />
        <SetAvailability
          onSave={(slots) => console.log("Availability saved:", slots)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg text-white font-medium text-sm transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: colors.primary }}
        >
          {isSubmitting ? "Adding Provider..." : "Add Provider"}
        </button>
      </form>
    </FormProvider>
  );
};

export default AddProvider;
