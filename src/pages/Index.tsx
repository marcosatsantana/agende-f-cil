import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { DataModel } from "@/components/DataModel";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <div className="py-12 bg-background text-center">
        <Button 
          size="lg" 
          onClick={() => navigate("/dashboard")}
          className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Acessar Sistema
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <Features />
      <DataModel />
      <Footer />
    </div>
  );
};

export default Index;
