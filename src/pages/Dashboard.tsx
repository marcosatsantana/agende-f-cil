import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMockData } from "@/hooks/useMockData";
import { Stethoscope, UserRound, CalendarCheck, Activity } from "lucide-react";

const Dashboard = () => {
  const { medicos, pacientes, consultas } = useMockData();

  const stats = [
    {
      title: "Médicos Cadastrados",
      value: medicos.length,
      icon: Stethoscope,
      color: "text-primary"
    },
    {
      title: "Pacientes Ativos",
      value: pacientes.length,
      icon: UserRound,
      color: "text-accent"
    },
    {
      title: "Consultas Agendadas",
      value: consultas.filter(c => c.status === "agendada" || c.status === "confirmada").length,
      icon: CalendarCheck,
      color: "text-primary"
    },
    {
      title: "Total de Consultas",
      value: consultas.length,
      icon: Activity,
      color: "text-muted-foreground"
    }
  ];

  const proximasConsultas = consultas
    .filter(c => c.status === "agendada" || c.status === "confirmada")
    .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime())
    .slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do sistema de agendamentos</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={cn("h-5 w-5", stat.color)} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">
              Próximas Consultas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proximasConsultas.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhuma consulta agendada
                </p>
              ) : (
                proximasConsultas.map((consulta) => (
                  <div
                    key={consulta.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-background border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{consulta.pacienteNome}</p>
                      <p className="text-sm text-muted-foreground">
                        Dr(a). {consulta.medicoNome}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {new Date(consulta.dataHora).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(consulta.dataHora).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          consulta.status === "confirmada"
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary"
                        )}
                      >
                        {consulta.status === "confirmada" ? "Confirmada" : "Agendada"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
