import { useState } from "react";
import { Medico, Paciente, Consulta, ConsultaComDetalhes } from "@/types";
import { medicosMock, pacientesMock, consultasMock } from "@/data/mockData";
import { toast } from "sonner";

export const useMockData = () => {
  const [medicos, setMedicos] = useState<Medico[]>(medicosMock);
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesMock);
  const [consultas, setConsultas] = useState<Consulta[]>(consultasMock);

  // Médicos
  const addMedico = (medico: Omit<Medico, "id">) => {
    const newMedico = { ...medico, id: Date.now().toString() };
    setMedicos([...medicos, newMedico]);
    toast.success("Médico cadastrado com sucesso!");
    return newMedico;
  };

  const updateMedico = (id: string, medico: Omit<Medico, "id">) => {
    setMedicos(medicos.map(m => m.id === id ? { ...medico, id } : m));
    toast.success("Médico atualizado com sucesso!");
  };

  const deleteMedico = (id: string) => {
    setMedicos(medicos.filter(m => m.id !== id));
    toast.success("Médico removido com sucesso!");
  };

  // Pacientes
  const addPaciente = (paciente: Omit<Paciente, "id">) => {
    const newPaciente = { ...paciente, id: Date.now().toString() };
    setPacientes([...pacientes, newPaciente]);
    toast.success("Paciente cadastrado com sucesso!");
    return newPaciente;
  };

  const updatePaciente = (id: string, paciente: Omit<Paciente, "id">) => {
    setPacientes(pacientes.map(p => p.id === id ? { ...paciente, id } : p));
    toast.success("Paciente atualizado com sucesso!");
  };

  const deletePaciente = (id: string) => {
    setPacientes(pacientes.filter(p => p.id !== id));
    toast.success("Paciente removido com sucesso!");
  };

  // Consultas
  const addConsulta = (consulta: Omit<Consulta, "id">) => {
    const newConsulta = { ...consulta, id: Date.now().toString() };
    setConsultas([...consultas, newConsulta]);
    toast.success("Consulta agendada com sucesso!");
    return newConsulta;
  };

  const updateConsulta = (id: string, consulta: Omit<Consulta, "id">) => {
    setConsultas(consultas.map(c => c.id === id ? { ...consulta, id } : c));
    toast.success("Consulta atualizada com sucesso!");
  };

  const deleteConsulta = (id: string) => {
    setConsultas(consultas.filter(c => c.id !== id));
    toast.success("Consulta cancelada com sucesso!");
  };

  const getConsultasComDetalhes = (): ConsultaComDetalhes[] => {
    return consultas.map(consulta => {
      const medico = medicos.find(m => m.id === consulta.medicoId);
      const paciente = pacientes.find(p => p.id === consulta.pacienteId);
      return {
        ...consulta,
        medicoNome: medico?.nome || "Médico não encontrado",
        pacienteNome: paciente?.nome || "Paciente não encontrado"
      };
    });
  };

  return {
    medicos,
    pacientes,
    consultas: getConsultasComDetalhes(),
    addMedico,
    updateMedico,
    deleteMedico,
    addPaciente,
    updatePaciente,
    deletePaciente,
    addConsulta,
    updateConsulta,
    deleteConsulta
  };
};
