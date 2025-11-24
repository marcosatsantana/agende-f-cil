import { useState, useEffect } from "react";
import { Medico, Paciente, Consulta, ConsultaComDetalhes } from "@/types";
import api from "@/services/api";
import { toast } from "sonner";

export const useMockData = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [consultas, setConsultas] = useState<ConsultaComDetalhes[]>([]);

  const fetchData = async () => {
    try {
      const [medicosRes, pacientesRes, consultasRes] = await Promise.all([
        api.get<Medico[]>('/medicos'),
        api.get<Paciente[]>('/pacientes'),
        api.get<ConsultaComDetalhes[]>('/consultas')
      ]);

      setMedicos(medicosRes.data);
      setPacientes(pacientesRes.data);
      setConsultas(consultasRes.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      toast.error("Erro ao carregar dados do sistema");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Médicos
  const addMedico = async (medico: Omit<Medico, "id">) => {
    try {
      // Backend doesn't support POST yet, so we just mock it for now in the UI or implement POST in backend
      // Wait, the user asked to implement endpoints, but I only did PUT/DELETE.
      // I should probably add POST to backend as well to make it fully functional.
      // For now, I'll just reload data to keep it simple if I add POST later.
      // Actually, the user asked to "continue implementation", implying full CRUD.
      // I missed POST in my previous step. I will add POST to backend next.
      // For now, let's assume POST exists or I will add it.
      // Let's add POST to backend in the next step.
      await api.post('/medicos', medico);
      toast.success("Médico cadastrado com sucesso!");
      fetchData();
    } catch (error) {
      toast.error("Erro ao cadastrar médico");
    }
  };

  const updateMedico = async (id: string, medico: Omit<Medico, "id">) => {
    try {
      await api.put(`/medicos/${id}`, medico);
      toast.success("Médico atualizado com sucesso!");
      fetchData();
    } catch (error) {
      toast.error("Erro ao atualizar médico");
    }
  };

  const deleteMedico = async (id: string) => {
    try {
      await api.delete(`/medicos/${id}`);
      toast.success("Médico removido com sucesso!");
      fetchData();
    } catch (error) {
      toast.error("Erro ao remover médico");
    }
  };

  // Pacientes
  const addPaciente = async (paciente: Omit<Paciente, "id">) => {
    try {
      await api.post('/pacientes', paciente);
      toast.success("Paciente cadastrado com sucesso!");
      fetchData();
    } catch (error) {
      toast.error("Erro ao cadastrar paciente");
    }
  };

  const updatePaciente = async (id: string, paciente: Omit<Paciente, "id">) => {
    try {
      await api.put(`/pacientes/${id}`, paciente);
      toast.success("Paciente atualizado com sucesso!");
      fetchData();
    } catch (error) {
      toast.error("Erro ao atualizar paciente");
    }
  };

  const deletePaciente = async (id: string) => {
    try {
      await api.delete(`/pacientes/${id}`);
      toast.success("Paciente removido com sucesso!");
      fetchData();
    } catch (error) {
      toast.error("Erro ao remover paciente");
    }
  };

  // Consultas
  const addConsulta = async (consulta: Omit<Consulta, "id">) => {
    try {
      await api.post('/consultas', consulta);
      toast.success("Consulta agendada com sucesso!");
      fetchData();
    } catch (error) {
      toast.error("Erro ao agendar consulta");
    }
  };

  const updateConsulta = async (id: string, consulta: Omit<Consulta, "id">) => {
    try {
      await api.put(`/consultas/${id}`, consulta);
      toast.success("Consulta atualizada com sucesso!");
      fetchData();
    } catch (error) {
      toast.error("Erro ao atualizar consulta");
    }
  };

  const deleteConsulta = async (id: string) => {
    try {
      await api.delete(`/consultas/${id}`);
      toast.success("Consulta cancelada com sucesso!");
      fetchData();
    } catch (error) {
      toast.error("Erro ao cancelar consulta");
    }
  };

  return {
    medicos,
    pacientes,
    consultas,
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
