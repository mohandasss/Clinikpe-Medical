import React from "react";
import { Sun, Clock, Building2, Video } from "lucide-react";
import { Switch } from "@mantine/core";
import { colors } from "../../../Constants/colors";

interface ProviderData {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  availableDays: string[];
  startTime: string;
  endTime: string;
  location: string;
  videoCallAvailable: boolean;
  isActive: boolean;
}

interface ProviderCardProps {
  provider: ProviderData;
  onViewProfile?: (id: string) => void;
  onManageAvailability?: (id: string) => void;
  onToggleActive?: (id: string, active: boolean) => void;
}

export default function ProviderCard({
  provider,
  onViewProfile,
  onManageAvailability,
  onToggleActive,
}: ProviderCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
      {/* Header with Profile */}
      <div className="flex items-start gap-4 justify-between">
        <div className="flex items-start gap-3 flex-1">
          {/* Profile Image */}
          <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Provider Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {provider.name}
            </h3>
            <p
              className="text-sm font-medium"
              style={{ color: colors.secondary }}
            >
              {provider.specialty}
            </p>
            <p className="text-sm text-gray-600 mt-1">{provider.experience}</p>
          </div>
        </div>

        {/* Toggle Switch */}
        <Switch
          checked={provider.isActive}
          onChange={(event) =>
            onToggleActive?.(provider.id, event.currentTarget.checked)
          }
          color="#0D52AF"
          size="md"
        />
      </div>

      {/* Availability */}
      <div className="flex justify-between gap-4  border-gray-200 pt-0">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Sun size={16} className="text-gray-600" />
            <span>{provider.availableDays.join(" • ")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock size={16} className="text-gray-600" />
            <span>
              {provider.startTime} – {provider.endTime}
            </span>
          </div>
        </div>

        <div className="space-y-2 flex-1 text-right">
          <div className="flex items-center justify-end gap-2 text-sm text-gray-700">
            <Building2 size={16} className="text-gray-600" />
            <span>{provider.location}</span>
          </div>
          {provider.videoCallAvailable && (
            <div className="flex items-center justify-end gap-2 text-sm text-gray-700">
              <Video size={16} className="text-gray-600" />
              <span>Video Call</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 border-t gap-3 pt-2">
        <button
          onClick={() => onViewProfile?.(provider.id)}
          className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition text-sm"
          style={{
            borderColor: colors.primary,
            color: colors.primary,
          }}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
