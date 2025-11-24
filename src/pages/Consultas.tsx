import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMockData } from "@/hooks/useMockData";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { ConsultaForm } from "@/components/ConsultaForm";
import { ConsultaComDetalhes } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

const Consultas = () => {
  const { consultas, medicos, pacientes, addConsulta, updateConsulta, deleteConsulta } = useMockData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingConsulta, setEditingConsulta] = useState<ConsultaComDetalhes | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingConsulta(null);
    setIsFormOpen(true);
  };

  const handleEdit = (consulta: ConsultaComDetalhes) => {
    setEditingConsulta(consulta);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteConsulta(id);
    setDeleteId(null);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      agendada: "bg-primary/10 text-primary",
      confirmada: "bg-accent/10 text-accent",
      concluida: "bg-muted text-muted-foreground",
      cancelada: "bg-destructive/10 text-destructive"
    };

    const labels = {
      agendada: "Agendada",
      confirmada: "Confirmada",
      concluida: "Concluída",
      cancelada: "Cancelada"
    };

    return (
      <span className={cn("px-3 py-1 rounded-full text-xs font-medium", styles[status as keyof typeof styles])}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Consultas</h1>
            <p className="text-muted-foreground">Gerencie os agendamentos de consultas</p>
          </div>
          <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nova Consulta
          </Button>
        </div>

        <div className="space-y-3">
          {consultas.map((consulta) => (
            <Card key={consulta.id} className="bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Paciente</p>
                      <p className="font-semibold text-foreground">{consulta.pacienteNome}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Médico</p>
                      <p className="font-medium text-foreground">Dr(a). {consulta.medicoNome}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Data e Hora</p>
                      <p className="font-medium text-foreground">
                        {new Date(consulta.dataHora).toLocaleDateString("pt-BR")} às{" "}
                        {new Date(consulta.dataHora).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>

                </div>
                <div className="flex items-center gap-3 pt-4">
                  {getStatusBadge(consulta.status)}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(consulta)}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(consulta.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                {consulta.observacoes && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Observações</p>
                    <p className="text-sm text-foreground">{consulta.observacoes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {consultas.length === 0 && (
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">
                Nenhuma consulta agendada. Clique em "Nova Consulta" para começar.
              </p>
            </CardContent>
          </Card>
        )}

        <ConsultaForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          consulta={editingConsulta}
          medicos={medicos}
          pacientes={pacientes}
          onSubmit={(data) => {
            if (editingConsulta) {
              updateConsulta(editingConsulta.id, data);
            } else {
              addConsulta(data);
            }
            setIsFormOpen(false);
          }}
        />

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir esta consulta? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Consultas;
