import { GraduationCap } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">UniGoiás</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Projeto Acadêmico - Disciplina de Modelagem de Dados
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 MediAgenda. Desenvolvido para fins educacionais.
          </p>
        </div>
      </div>
    </footer>
  );
};
