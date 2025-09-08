import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { type Meal } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";
import AdminMealForm from "@/components/admin-meal-form";

export default function Admin() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: meals = [], isLoading: mealsLoading } = useQuery<Meal[]>({
    queryKey: ["/api/meals", selectedDay],
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/api/logout", "POST");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setLocation("/login");
      toast({
        title: "Logged out successfully",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (mealId: string) => {
      return await apiRequest(`/api/admin/meals/${mealId}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/meals", selectedDay] });
      toast({
        title: "Meal deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal);
    setShowForm(true);
  };

  const handleDelete = (mealId: string) => {
    if (confirm("Are you sure you want to delete this meal?")) {
      deleteMutation.mutate(mealId);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMeal(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold">Campus Eats Admin</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Day Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {weekDays.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                onClick={() => setSelectedDay(day)}
                data-testid={`button-admin-day-${day.toLowerCase()}`}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        {/* Add Meal Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowForm(true)}
            data-testid="button-add-meal"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Meal
          </Button>
        </div>

        {/* Meals List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{selectedDay}'s Meals</h2>
          
          {mealsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : meals.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No meals found for {selectedDay}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {meals.map((meal) => (
                <Card key={meal.id} className="overflow-hidden">
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
                    }}
                  />
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span className="text-lg">{meal.name}</span>
                      <Badge variant="secondary">${meal.price}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {meal.description}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline">{meal.calories} cal</Badge>
                      {meal.isVegetarian && <Badge variant="outline">Vegetarian</Badge>}
                      {meal.isVegan && <Badge variant="outline">Vegan</Badge>}
                      {meal.isGlutenFree && <Badge variant="outline">Gluten-Free</Badge>}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(meal)}
                        data-testid={`button-edit-meal-${meal.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(meal.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-meal-${meal.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Meal Form Modal */}
      {showForm && (
        <AdminMealForm
          meal={editingMeal}
          selectedDay={selectedDay}
          onClose={handleFormClose}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["/api/meals", selectedDay] });
            handleFormClose();
          }}
        />
      )}
    </div>
  );
}