import { Search } from "lucide-react";

interface HeaderProps {
  search: string;
  onSearchChange: (search: string) => void;
}

export default function Header({ search, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <i className="fas fa-utensils text-primary text-2xl"></i>
            <h1 className="text-xl font-bold text-foreground">Campus Eats</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search meals..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-64 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                data-testid="input-search"
              />
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
