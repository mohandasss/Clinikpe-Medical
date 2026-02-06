import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProviderCard from "./components/ProviderCard";
import { colors } from "../../Constants/colors";

const Providers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const providers = [
    {
      id: "1",
      name: "Dr. D.R.K Roy",
      specialty: "Cardiologist",
      experience: "8+ Years Experience",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dr-DRK-Roy",
      availableDays: ["Mon", "Tue", "Thu", "Fri"],
      startTime: "08:00 AM",
      endTime: "06:00 PM",
      location: "City Medical Center",
      videoCallAvailable: true,
      isActive: true,
    },
    {
      id: "2",
      name: "Dr. Sarah Johnson",
      specialty: "Dermatologist",
      experience: "6+ Years Experience",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dr-Sarah-Johnson",
      availableDays: ["Mon", "Wed", "Thu", "Sat"],
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      location: "Central Hospital",
      videoCallAvailable: true,
      isActive: true,
    },
    {
      id: "3",
      name: "Dr. Anup Kumar",
      specialty: "Neurologist",
      experience: "10+ Years Experience",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dr-Anup-Kumar",
      availableDays: ["Tue", "Thu", "Fri", "Sat"],
      startTime: "10:00 AM",
      endTime: "04:00 PM",
      location: "Metro Medical Institute",
      videoCallAvailable: false,
      isActive: false,
    },
  ];

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleViewProfile = (id: string) => {
    console.log("View profile:", id);
  };

  const handleManageAvailability = (id: string) => {
    console.log("Manage availability:", id);
  };

  const handleToggleActive = (id: string, active: boolean) => {
    console.log("Toggle active:", id, active);
  };

  return (
    <div className="w-full relative ">
      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Filter size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Provider Cards */}
      <div className="space-y-4">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onViewProfile={handleViewProfile}
              onManageAvailability={handleManageAvailability}
              onToggleActive={handleToggleActive}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No providers found</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/add-provider")}
        className="fixed bottom-24 right-4 w-12 h-12 text-white rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition z-40"
        style={{ backgroundColor: colors.primary }}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Providers;
