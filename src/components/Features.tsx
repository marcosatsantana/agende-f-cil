import { UserRound, Stethoscope, CalendarCheck } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const Features = () => {
  const features = [
    {
      icon: Stethoscope,
      title: "Médicos",
      description: "Gestão completa do cadastro médico",
      features: [
        "Cadastro de informações profissionais",
        "Especialidades e CRM",
        "Histórico de atendimentos",
        "Disponibilidade de horários"
      ]
    },
    {
      icon: UserRound,
      title: "Pacientes",
      description: "Controle eficiente de pacientes",
      features: [
        "Dados pessoais e contatos",
        "Histórico médico completo",
        "Documentos e exames",
        "Consultas agendadas"
      ]
    },
    {
      icon: CalendarCheck,
      title: "Consultas",
      description: "Sistema de agendamento integrado",
      features: [
        "Agendamento rápido e intuitivo",
        "Vinculação médico-paciente",
        "Controle de status das consultas",
        "Notificações e lembretes"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Funcionalidades do Sistema
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sistema CRUD completo para gerenciamento de consultas médicas com relacionamento entre entidades
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
