import { X } from "lucide-react";
import { type Meal } from "@shared/schema";

interface MealDetailModalProps {
  meal: Meal;
  onClose: () => void;
}

export default function MealDetailModal({ meal, onClose }: MealDetailModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black bg-opacity-50"
      onClick={onClose}
      data-testid="modal-meal-detail"
    >
      <div 
        className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-colors"
            data-testid="button-close-modal"
          >
            <X className="h-4 w-4" />
          </button>
          
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-64 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600";
            }}
            data-testid={`img-meal-detail-${meal.id}`}
          />
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2" data-testid={`text-meal-detail-name-${meal.id}`}>
                  {meal.name}
                </h2>
                <p className="text-muted-foreground mb-4" data-testid={`text-meal-detail-description-${meal.id}`}>
                  {meal.description}
                </p>
              </div>
              <span className="text-2xl font-bold text-primary" data-testid={`text-meal-detail-price-${meal.id}`}>
                ${meal.price}
              </span>
            </div>

            {/* Dietary Tags */}
            {dietaryTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {dietaryTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                    data-testid={`tag-dietary-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Nutrition Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold" data-testid={`text-nutrition-calories-${meal.id}`}>
                  {meal.calories}
                </div>
                <div className="text-sm text-muted-foreground">Calories</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold" data-testid={`text-nutrition-protein-${meal.id}`}>
                  {meal.protein}g
                </div>
                <div className="text-sm text-muted-foreground">Protein</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold" data-testid={`text-nutrition-carbs-${meal.id}`}>
                  {meal.carbs}g
                </div>
                <div className="text-sm text-muted-foreground">Carbs</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold" data-testid={`text-nutrition-fat-${meal.id}`}>
                  {meal.fat}g
                </div>
                <div className="text-sm text-muted-foreground">Fat</div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Ingredients</h3>
              <p className="text-muted-foreground text-sm" data-testid={`text-ingredients-${meal.id}`}>
                {meal.ingredients}
              </p>
            </div>

            {/* Allergen Information */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Allergen Information</h3>
              <p className="text-muted-foreground text-sm" data-testid={`text-allergens-${meal.id}`}>
                {meal.allergens}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid={`button-add-to-cart-${meal.id}`}
            >
              Add to Cart - ${meal.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
