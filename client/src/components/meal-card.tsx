import { Star } from "lucide-react";
import { type Meal } from "@shared/schema";

interface MealCardProps {
  meal: Meal;
  onClick: () => void;
}

export default function MealCard({ meal, onClick }: MealCardProps) {
  const getDietaryTags = () => {
    const tags = [];
    if (meal.isVegetarian) tags.push("Vegetarian");
    if (meal.isVegan) tags.push("Vegan");
    if (meal.isGlutenFree) tags.push("Gluten-Free");
    if (meal.isDairyFree) tags.push("Dairy-Free");
    if (meal.isKeto) tags.push("Keto");
    if (meal.isLowSodium) tags.push("Low Sodium");
    if (meal.isPescatarian) tags.push("Pescatarian");
    if (meal.isSpicy) tags.push("Spicy");
    return tags;
  };

  const dietaryTags = getDietaryTags();

  return (
    <div
      className="meal-card bg-card rounded-lg border border-border overflow-hidden cursor-pointer"
      onClick={onClick}
      data-testid={`card-meal-${meal.id}`}
    >
      <img
        src={meal.imageUrl}
        alt={meal.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
        }}
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg" data-testid={`text-meal-name-${meal.id}`}>
            {meal.name}
          </h3>
          <span className="text-primary font-bold" data-testid={`text-meal-price-${meal.id}`}>
            ${meal.price}
          </span>
        </div>
        <p className="text-muted-foreground text-sm mb-3" data-testid={`text-meal-description-${meal.id}`}>
          {meal.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-muted px-2 py-1 rounded-full" data-testid={`text-meal-calories-${meal.id}`}>
              {meal.calories} cal
            </span>
            {dietaryTags.length > 0 && (
              <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full" data-testid={`text-meal-dietary-${meal.id}`}>
                {dietaryTags[0]}
              </span>
            )}
          </div>
          <div className="flex items-center text-secondary">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-sm ml-1" data-testid={`text-meal-rating-${meal.id}`}>
              {meal.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
