interface CategoryFilter {
  label: string;
  value: string;
}

interface FilterChipsProps {
  filters: CategoryFilter[];
  activeTab: string;
  onCategoryChange: (value: string) => void;
}

export default function FilterChips({
  filters,
  activeTab,
  onCategoryChange,
}: FilterChipsProps) {
  return (
    <div className="px-0 pt-0 pb-0">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <div
            key={filter.value}
            onClick={() => onCategoryChange(filter.value)}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm transition-all cursor-pointer ${
              activeTab === filter.value
                ? "bg-[#1E40AF] text-white"
                : "bg-[#F3F4F6] text-[#4B5563]"
            }`}
          >
            {filter.label}
          </div>
        ))}
      </div>
    </div>
  );
}
