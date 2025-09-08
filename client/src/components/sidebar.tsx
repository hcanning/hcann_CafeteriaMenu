import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filters } from "@/pages/home";

interface SidebarProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

function SidebarContent({ selectedDay, onDayChange, search, onSearchChange, filters, onFiltersChange }: SidebarProps) {
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
    onSearchChange("");
  };

  return (
    <div className="h-full bg-card border-r border-border p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CE</span>
          </div>
          <h1 className="text-lg font-bold text-foreground">Campus Eats</h1>
        </div>

        {/* Search */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-foreground">Search</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search meals..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
        </div>

        {/* Day Navigation */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-foreground">Day</h2>
          <div className="space-y-1">
            {weekDays.map((day) => (
              <button
                key={day}
                onClick={() => onDayChange(day)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDay === day
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-testid={`button-day-${day.toLowerCase()}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-foreground">Price Range</h2>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.priceRanges.includes(range.id)}
                  onChange={(e) => handlePriceChange(range.id, e.target.checked)}
                  className="rounded border-border"
                  data-testid={`checkbox-price-${range.id}`}
                />
                <span className="text-sm text-foreground">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dietary Options */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-foreground">Dietary Options</h2>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleDietaryChange(option.id)}
                className={`px-3 py-1 rounded-full text-xs border border-border transition-colors ${
                  filters.dietaryOptions.includes(option.id)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-foreground hover:bg-muted"
                }`}
                data-testid={`button-dietary-${option.id}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-full"
          data-testid="button-clear-filters"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}

export default function Sidebar(props: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="mb-4">
              <Menu className="h-4 w-4 mr-2" />
              Filters & Days
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SidebarContent {...props} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <SidebarContent {...props} />
      </div>
    </>
  );
}