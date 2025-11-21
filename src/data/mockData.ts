import { Medico, Paciente, Consulta } from "@/types";

export const medicosMock: Medico[] = [
  {
    id: "1",
    nome: "Dr. Carlos Silva",
    crm: "12345-GO",
    especialidade: "Cardiologia",
    telefone: "(62) 98765-4321",
    email: "carlos.silva@email.com"
  },
  {
    id: "2",
    nome: "Dra. Maria Santos",
    crm: "23456-GO",
    especialidade: "Pediatria",
    telefone: "(62) 98765-4322",
    email: "maria.santos@email.com"
  },
  {
    id: "3",
    nome: "Dr. João Oliveira",
    crm: "34567-GO",
    especialidade: "Ortopedia",
    telefone: "(62) 98765-4323",
    email: "joao.oliveira@email.com"
  }
];

export const pacientesMock: Paciente[] = [
  {
    id: "1",
    nome: "Ana Paula Costa",
    cpf: "123.456.789-00",
    dataNascimento: "1985-05-15",
    telefone: "(62) 99876-5431",
    email: "ana.costa@email.com"
  },
  {
    id: "2",
    nome: "Pedro Henrique Lima",
    cpf: "234.567.890-11",
    dataNascimento: "1990-08-22",
    telefone: "(62) 99876-5432",
    email: "pedro.lima@email.com"
  },
  {
    id: "3",
    nome: "Juliana Martins",
    cpf: "345.678.901-22",
    dataNascimento: "1978-12-10",
    telefone: "(62) 99876-5433",
    email: "juliana.martins@email.com"
  },
  {
    id: "4",
    nome: "Roberto Almeida",
    cpf: "456.789.012-33",
    dataNascimento: "2000-03-25",
    telefone: "(62) 99876-5434",
    email: "roberto.almeida@email.com"
  }
];

export const consultasMock: Consulta[] = [
  {
    id: "1",
    medicoId: "1",
    pacienteId: "1",
    dataHora: "2024-11-25T09:00:00",
    status: "agendada",
    observacoes: "Consulta de rotina"
  },
  {
    id: "2",
    medicoId: "2",
    pacienteId: "2",
    dataHora: "2024-11-25T10:30:00",
    status: "confirmada",
    observacoes: "Primeira consulta pediátrica"
  },
  {
    id: "3",
    medicoId: "3",
    pacienteId: "3",
    dataHora: "2024-11-24T14:00:00",
    status: "concluida",
    observacoes: "Avaliação de dor no joelho"
  },
  {
    id: "4",
    medicoId: "1",
    pacienteId: "4",
    dataHora: "2024-11-26T11:00:00",
    status: "agendada",
    observacoes: "Checkup cardíaco"
  }
];
