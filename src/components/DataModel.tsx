import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";

export const DataModel = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-gradient-card shadow-card border border-border/50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Database className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
              Modelagem de Dados
            </CardTitle>
            <CardDescription className="text-base">
              Estrutura relacional do banco de dados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="font-semibold text-lg text-primary mb-3">Tabela: Médicos</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>• ID (PK)</li>
                  <li>• Nome</li>
                  <li>• CRM</li>
                  <li>• Especialidade</li>
                  <li>• Telefone</li>
                  <li>• Email</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="font-semibold text-lg text-primary mb-3">Tabela: Pacientes</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>• ID (PK)</li>
                  <li>• Nome</li>
                  <li>• CPF</li>
                  <li>• Data Nascimento</li>
                  <li>• Telefone</li>
                  <li>• Email</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="font-semibold text-lg text-primary mb-3">Tabela: Consultas</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>• ID (PK)</li>
                  <li>• ID_Médico (FK)</li>
                  <li>• ID_Paciente (FK)</li>
                  <li>• Data/Hora</li>
                  <li>• Status</li>
                  <li>• Observações</li>
                </ul>
              </div>
            </div>
            
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">Relacionamentos:</h4>
              <ul className="space-y-1 text-sm text-foreground/80">
                <li>• Um <span className="font-semibold text-primary">Médico</span> pode ter várias <span className="font-semibold text-primary">Consultas</span> (1:N)</li>
                <li>• Um <span className="font-semibold text-primary">Paciente</span> pode ter várias <span className="font-semibold text-primary">Consultas</span> (1:N)</li>
                <li>• Uma <span className="font-semibold text-primary">Consulta</span> vincula um Médico a um Paciente (N:N através de Consultas)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
