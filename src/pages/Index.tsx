import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { DataModel } from "@/components/DataModel";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <DataModel />
      <Footer />
    </div>
  );
};

export default Index;
