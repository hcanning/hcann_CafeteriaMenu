import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Meal } from "@shared/schema";
import Header from "@/components/header";
import DayNavigation from "@/components/day-navigation";
import FiltersSidebar from "@/components/filters-sidebar";
import MealCard from "@/components/meal-card";
import MealDetailModal from "@/components/meal-detail-modal";

export interface Filters {
  search: string;
  priceRanges: string[];
  dietaryOptions: string[];
}

export default function Home() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showMealDetail, setShowMealDetail] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    priceRanges: [],
    dietaryOptions: [],
  });

  const { data: meals = [], isLoading } = useQuery<Meal[]>({
    queryKey: ["/api/meals", selectedDay],
  });

  const filteredMeals = meals.filter((meal) => {
    // Search filter
    if (filters.search && !meal.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !meal.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Price filter
    if (filters.priceRanges.length > 0) {
      const price = parseFloat(meal.price);
      const matchesPrice = filters.priceRanges.some(range => {
        switch (range) {
          case "under-8": return price < 8;
          case "8-12": return price >= 8 && price <= 12;
          case "12-16": return price > 12 && price <= 16;
          case "over-16": return price > 16;
          default: return false;
        }
      });
      if (!matchesPrice) return false;
    }

    // Dietary filter
    if (filters.dietaryOptions.length > 0) {
      const matchesDietary = filters.dietaryOptions.some(option => {
        switch (option) {
          case "vegetarian": return meal.isVegetarian;
          case "vegan": return meal.isVegan;
          case "gluten-free": return meal.isGlutenFree;
          case "dairy-free": return meal.isDairyFree;
          case "keto": return meal.isKeto;
          case "low-sodium": return meal.isLowSodium;
          case "pescatarian": return meal.isPescatarian;
          case "spicy": return meal.isSpicy;
          default: return false;
        }
      });
      if (!matchesDietary) return false;
    }

    return true;
  });

  const handleMealClick = (meal: Meal) => {
    setSelectedMeal(meal);
    setShowMealDetail(true);
  };

  const handleCloseMealDetail = () => {
    setShowMealDetail(false);
    setSelectedMeal(null);
  };

  return (
    <div className="bg-background min-h-screen">
      <Header 
        search={filters.search} 
        onSearchChange={(search) => setFilters(prev => ({ ...prev, search }))}
      />
      
      <DayNavigation 
        selectedDay={selectedDay} 
        onDayChange={setSelectedDay} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FiltersSidebar 
            filters={filters}
            onFiltersChange={setFilters}
          />

          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedDay}'s Menu</h2>
              <span className="text-muted-foreground" data-testid="meals-count">
                {filteredMeals.length} meals available
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="w-full h-48 bg-muted animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded animate-pulse" />
                      <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                      <div className="flex justify-between">
                        <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
                        <div className="h-3 bg-muted rounded animate-pulse w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredMeals.length === 0 ? (
              <div className="text-center py-12" data-testid="no-meals-message">
                <p className="text-muted-foreground text-lg">No meals found matching your criteria.</p>
                <p className="text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMeals.map((meal) => (
                  <MealCard 
                    key={meal.id} 
                    meal={meal} 
                    onClick={() => handleMealClick(meal)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {showMealDetail && selectedMeal && (
        <MealDetailModal
          meal={selectedMeal}
          onClose={handleCloseMealDetail}
        />
      )}
    </div>
  );
}
