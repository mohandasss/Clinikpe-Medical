import {
  Building2,
  MapPin,
  User,
  Phone,
  QrCode,
  Calendar,
  HelpCircle,
  Lock,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { colors } from "../../../Constants/colors";

interface ProfileData {
  storeName: string;
  location: string;
  ownerName: string;
  phoneNumber: string;
}

interface ProfileMenuProps {
  data: ProfileData;
  onQRCode?: () => void;
  onAvailability?: () => void;
  onHelpSupport?: () => void;
  onChangePassword?: () => void;
  onLogout?: () => void;
}

export default function ProfileMenu({
  data,
  onQRCode,
  onAvailability,
  onHelpSupport,
  onChangePassword,
  onLogout,
}: ProfileMenuProps) {
  const menuItems = [
    {
      icon: QrCode,
      label: "QR Code",
      onClick: onQRCode,
    },
    {
      icon: Calendar,
      label: "Availability Management",
      onClick: onAvailability,
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      onClick: onHelpSupport,
    },
    {
      icon: Lock,
      label: "Change Password",
      onClick: onChangePassword,
    },
    {
      icon: LogOut,
      label: "Logout",
      onClick: onLogout,
      isLogout: true,
    },
  ];

  return (
    <div className="w-full pb-20 space-y-4">
      {/* Profile Info Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
        {/* Store Name */}
        <div className="flex items-start gap-3 border-b border-gray-200 pb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${colors.primary}20` }}
          >
            <Building2 size={20} style={{ color: colors.primary }} />
          </div>
          <div>
            <p className="text-xs text-gray-600">Store Name</p>
            <p className="text-sm font-semibold text-gray-900">
              {data.storeName}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3 border-b border-gray-200 pb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${colors.primary}20` }}
          >
            <MapPin size={20} style={{ color: colors.primary }} />
          </div>
          <div>
            <p className="text-xs text-gray-600">Location</p>
            <p className="text-sm font-semibold text-gray-900">
              {data.location}
            </p>
          </div>
        </div>

        {/* Owner/Manager Name */}
        <div className="flex items-start gap-3 border-b border-gray-200 pb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${colors.primary}20` }}
          >
            <User size={20} style={{ color: colors.primary }} />
          </div>
          <div>
            <p className="text-xs text-gray-600">Owner / Manager Name</p>
            <p className="text-sm font-semibold text-gray-900">
              {data.ownerName}
            </p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${colors.primary}20` }}
          >
            <Phone size={20} style={{ color: colors.primary }} />
          </div>
          <div>
            <p className="text-xs text-gray-600">Phone Number</p>
            <p className="text-sm font-semibold text-gray-900">
              {data.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full flex items-center justify-between px-4 py-3.5 border-b last:border-b-0 transition hover:bg-gray-50 ${
                item.isLogout ? "text-red-600" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={20}
                  className={item.isLogout ? "text-red-600" : "text-gray-600"}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <ChevronRight
                size={20}
                className={item.isLogout ? "text-red-600" : "text-gray-400"}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
