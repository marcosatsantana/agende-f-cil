import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, Stethoscope, UserRound, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/medicos", label: "Médicos", icon: Stethoscope },
    { path: "/pacientes", label: "Pacientes", icon: UserRound },
    { path: "/consultas", label: "Consultas", icon: CalendarCheck }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-gradient-hero shadow-sm backdrop-blur">
        <div className="container flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary-foreground" />
            <span className="text-xl font-bold text-primary-foreground">MediAgenda</span>
          </Link>
          <nav className="flex flex-1 items-center gap-1 ml-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};
