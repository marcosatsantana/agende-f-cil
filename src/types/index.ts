export interface Medico {
  id: string;
  nome: string;
  crm: string;
  especialidade: string;
  telefone: string;
  email: string;
}

export interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email: string;
}

export interface Consulta {
  id: string;
  medicoId: string;
  pacienteId: string;
  dataHora: string;
  status: "agendada" | "confirmada" | "concluida" | "cancelada";
  observacoes?: string;
}

export interface ConsultaComDetalhes extends Consulta {
  medicoNome: string;
  pacienteNome: string;
}
