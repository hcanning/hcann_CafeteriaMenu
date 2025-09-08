interface DayNavigationProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function DayNavigation({ selectedDay, onDayChange }: DayNavigationProps) {
  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto py-4">
          {weekDays.map((day) => (
            <button
              key={day}
              onClick={() => onDayChange(day)}
              className={`day-tab px-4 py-2 rounded-lg whitespace-nowrap font-medium ${
                selectedDay === day
                  ? "active"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`button-day-${day.toLowerCase()}`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
