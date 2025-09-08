import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { type Meal } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface AdminMealFormProps {
  meal?: Meal | null;
  selectedDay: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminMealForm({ meal, selectedDay, onClose, onSuccess }: AdminMealFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    ingredients: "",
    allergens: "",
    imageUrl: "",
    rating: "",
    dayOfWeek: selectedDay,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    isKeto: false,
    isLowSodium: false,
    isPescatarian: false,
    isSpicy: false,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (meal) {
      setFormData({
        name: meal.name,
        description: meal.description,
        price: meal.price,
        calories: meal.calories.toString(),
        protein: meal.protein,
        carbs: meal.carbs,
        fat: meal.fat,
        ingredients: meal.ingredients,
        allergens: meal.allergens,
        imageUrl: meal.imageUrl,
        rating: meal.rating,
        dayOfWeek: meal.dayOfWeek,
        isVegetarian: meal.isVegetarian,
        isVegan: meal.isVegan,
        isGlutenFree: meal.isGlutenFree,
        isDairyFree: meal.isDairyFree,
        isKeto: meal.isKeto,
        isLowSodium: meal.isLowSodium,
        isPescatarian: meal.isPescatarian,
        isSpicy: meal.isSpicy,
      });
    } else {
      setFormData(prev => ({ ...prev, dayOfWeek: selectedDay }));
    }
  }, [meal, selectedDay]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const endpoint = meal 
        ? `/api/admin/meals/${meal.id}` 
        : "/api/admin/meals";
      const method = meal ? "PUT" : "POST";
      
      return await apiRequest(endpoint, method, {
        ...data,
        calories: parseInt(data.calories),
      });
    },
    onSuccess: () => {
      toast({
        title: meal ? "Meal updated" : "Meal created",
        description: "Meal has been saved successfully",
      });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const dietaryOptions = [
    { key: "isVegetarian", label: "Vegetarian" },
    { key: "isVegan", label: "Vegan" },
    { key: "isGlutenFree", label: "Gluten-Free" },
    { key: "isDairyFree", label: "Dairy-Free" },
    { key: "isKeto", label: "Keto" },
    { key: "isLowSodium", label: "Low Sodium" },
    { key: "isPescatarian", label: "Pescatarian" },
    { key: "isSpicy", label: "Spicy" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {meal ? "Edit Meal" : "Add New Meal"}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  data-testid="input-meal-name"
                />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  required
                  data-testid="input-meal-price"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                required
                data-testid="textarea-meal-description"
              />
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                required
                data-testid="input-meal-image-url"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  value={formData.calories}
                  onChange={(e) => handleInputChange("calories", e.target.value)}
                  required
                  data-testid="input-meal-calories"
                />
              </div>
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  step="0.1"
                  value={formData.protein}
                  onChange={(e) => handleInputChange("protein", e.target.value)}
                  required
                  data-testid="input-meal-protein"
                />
              </div>
              <div>
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  step="0.1"
                  value={formData.carbs}
                  onChange={(e) => handleInputChange("carbs", e.target.value)}
                  required
                  data-testid="input-meal-carbs"
                />
              </div>
              <div>
                <Label htmlFor="fat">Fat (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  step="0.1"
                  value={formData.fat}
                  onChange={(e) => handleInputChange("fat", e.target.value)}
                  required
                  data-testid="input-meal-fat"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea
                id="ingredients"
                value={formData.ingredients}
                onChange={(e) => handleInputChange("ingredients", e.target.value)}
                required
                data-testid="textarea-meal-ingredients"
              />
            </div>

            <div>
              <Label htmlFor="allergens">Allergen Information</Label>
              <Textarea
                id="allergens"
                value={formData.allergens}
                onChange={(e) => handleInputChange("allergens", e.target.value)}
                required
                data-testid="textarea-meal-allergens"
              />
            </div>

            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                required
                data-testid="input-meal-rating"
              />
            </div>

            <div>
              <Label>Dietary Options</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {dietaryOptions.map((option) => (
                  <div key={option.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.key}
                      checked={formData[option.key as keyof typeof formData] as boolean}
                      onCheckedChange={(checked) => handleInputChange(option.key, checked)}
                      data-testid={`checkbox-${option.key}`}
                    />
                    <Label htmlFor={option.key} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={mutation.isPending} data-testid="button-save-meal">
                {mutation.isPending ? "Saving..." : meal ? "Update Meal" : "Create Meal"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}