import { Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Activity className="h-12 w-12 text-primary-foreground animate-pulse" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground">
              MediAgenda
            </h1>
          </div>
          <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-4 font-medium">
            Sistema de Gerenciamento de Consultas Médicas
          </p>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Projeto Acadêmico de Modelagem de Dados - UniGoiás
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Acessar Sistema
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm"
            >
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
