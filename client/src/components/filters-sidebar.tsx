import { Filters } from "@/pages/home";

interface FiltersSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const priceRanges = [
  { id: "under-8", label: "Under $8" },
  { id: "8-12", label: "$8 - $12" },
  { id: "12-16", label: "$12 - $16" },
  { id: "over-16", label: "Over $16" },
];

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
  { id: "keto", label: "Keto" },
  { id: "low-sodium", label: "Low Sodium" },
  { id: "pescatarian", label: "Pescatarian" },
  { id: "spicy", label: "Spicy" },
];

export default function FiltersSidebar({ filters, onFiltersChange }: FiltersSidebarProps) {
  const handlePriceChange = (priceId: string, checked: boolean) => {
    const newPriceRanges = checked
      ? [...filters.priceRanges, priceId]
      : filters.priceRanges.filter(id => id !== priceId);
    
    onFiltersChange({
      ...filters,
      priceRanges: newPriceRanges,
    });
  };

  const handleDietaryChange = (dietaryId: string) => {
    const newDietaryOptions = filters.dietaryOptions.includes(dietaryId)
      ? filters.dietaryOptions.filter(id => id !== dietaryId)
      : [...filters.dietaryOptions, dietaryId];
    
    onFiltersChange({
      ...filters,
      dietaryOptions: newDietaryOptions,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      priceRanges: [],
      dietaryOptions: [],
    });
  };

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        
        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.priceRanges.includes(range.id)}
                  onChange={(e) => handlePriceChange(range.id, e.target.checked)}
                  className="rounded border-border"
                  data-testid={`checkbox-price-${range.id}`}
                />
                <span className="ml-2 text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dietary Options */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Dietary Options</h3>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleDietaryChange(option.id)}
                className={`filter-chip px-3 py-1 rounded-full text-sm border border-border hover:border-primary ${
                  filters.dietaryOptions.includes(option.id) ? "active" : ""
                }`}
                data-testid={`button-dietary-${option.id}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearAllFilters}
          className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg"
          data-testid="button-clear-filters"
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  );
}
