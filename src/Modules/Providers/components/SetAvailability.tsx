import { useState } from "react";
import { Clock, Plus } from "lucide-react";
import { colors } from "../../../Constants/colors";

interface AvailabilitySlot {
  id: string;
  days: string[];
  startTime: string;
  endTime: string;
  duration: number;
}

interface SetAvailabilityProps {
  onSave?: (slots: AvailabilitySlot[]) => void;
}

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function SetAvailability({ onSave }: SetAvailabilityProps) {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([
    {
      id: "1",
      days: ["M", "T", "W", "T", "F"],
      startTime: "11:43",
      endTime: "13:43",
      duration: 15,
    },
  ]);

  const handleDayToggle = (slotId: string, day: string) => {
    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          const newDays = slot.days.includes(day)
            ? slot.days.filter((d) => d !== day)
            : [...slot.days, day];
          return { ...slot, days: newDays };
        }
        return slot;
      }),
    );
  };

  const handleTimeChange = (
    slotId: string,
    type: "startTime" | "endTime",
    value: string,
  ) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId ? { ...slot, [type]: value } : slot,
      ),
    );
  };

  const handleDurationChange = (slotId: string, value: number | string) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId ? { ...slot, duration: Number(value) } : slot,
      ),
    );
  };

  const handleAddSlot = () => {
    const newSlot: AvailabilitySlot = {
      id: Date.now().toString(),
      days: [],
      startTime: "09:00",
      endTime: "17:00",
      duration: 15,
    };
    setSlots((prev) => [...prev, newSlot]);
  };

  const handleRemoveSlot = (slotId: string) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== slotId));
  };

  const handleSave = () => {
    onSave?.(slots);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Set Availability</h2>
        <p className="text-sm text-gray-500 mt-1">
          Pick A Time Of The Day When You Would Be Available Here
        </p>
      </div>

      {/* Slots */}
      <div className="space-y-4">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="border border-gray-200 rounded-lg p-3 space-y-3"
          >
            {/* Days Selection */}
            <div className="grid grid-cols-7 gap-2">
              {DAYS.map((day, dayIndex) => (
                <button
                  key={day + dayIndex}
                  onClick={() => handleDayToggle(slot.id, day)}
                  className={`w-full h-10 px-5 rounded-full font-medium text-sm transition flex items-center justify-center ${
                    slot.days.includes(day)
                      ? "border-2 text-white"
                      : "border-2 border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                  style={{
                    borderColor: slot.days.includes(day)
                      ? colors.primary
                      : undefined,
                    backgroundColor: slot.days.includes(day)
                      ? colors.primary
                      : "white",
                  }}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Time & Duration Section */}
            <div className="flex gap-2 items-center  ">
              {/* Duration */}
              <div className="flex-shrink-0">
                <label className="text-xs font-medium text-gray-600 block mb-1">
                  Duration
                </label>
                <div className="flex items-center gap-1 px-2 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <Clock size={16} className="text-gray-600" />
                  <input
                    type="number"
                    min="5"
                    step="5"
                    value={slot.duration}
                    onChange={(e) =>
                      handleDurationChange(slot.id, e.target.value)
                    }
                    className="w-6 bg-transparent text-sm font-medium outline-none text-gray-900"
                  />
                  <span className="text-xs text-gray-600">m</span>
                </div>
              </div>

              {/* Start Time */}
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-600 block mb-1">
                  From
                </label>
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    handleTimeChange(slot.id, "startTime", e.target.value)
                  }
                  className="w-full max-w-[110px] px-1 py-2 border border-gray-300 rounded-lg text-sm font-medium text-blue-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* End Time */}
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-600 block mb-1">
                  To
                </label>
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    handleTimeChange(slot.id, "endTime", e.target.value)
                  }
                  className="w-full max-w-[110px] px-1 py-2 border border-gray-300 rounded-lg text-sm font-medium text-blue-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Remove Slot Button */}
            {slot.id !== "1" && (
              <button
                onClick={() => handleRemoveSlot(slot.id)}
                className="w-full py-2 text-xs text-red-600 hover:bg-red-50 rounded transition font-medium"
              >
                Remove Slot
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Slot Button */}
      <button
        onClick={handleAddSlot}
        className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium text-sm hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Slot
      </button>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3 rounded-lg text-white font-medium text-sm transition hover:opacity-90"
        style={{ backgroundColor: colors.primary }}
      >
        Save Availability
      </button>
    </div>
  );
}
