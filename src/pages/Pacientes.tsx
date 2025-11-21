import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMockData } from "@/hooks/useMockData";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PacienteForm } from "@/components/PacienteForm";
import { Paciente } from "@/types";
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

const Pacientes = () => {
  const { pacientes, addPaciente, updatePaciente, deletePaciente } = useMockData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingPaciente(null);
    setIsFormOpen(true);
  };

  const handleEdit = (paciente: Paciente) => {
    setEditingPaciente(paciente);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deletePaciente(id);
    setDeleteId(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pacientes</h1>
            <p className="text-muted-foreground">Gerencie o cadastro de pacientes</p>
          </div>
          <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Novo Paciente
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pacientes.map((paciente) => (
            <Card key={paciente.id} className="bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {paciente.nome}
                </CardTitle>
                <p className="text-sm text-primary font-medium">
                  {new Date(paciente.dataNascimento).toLocaleDateString("pt-BR")}
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">CPF: {paciente.cpf}</p>
                <p className="text-sm text-muted-foreground">Tel: {paciente.telefone}</p>
                <p className="text-sm text-muted-foreground">Email: {paciente.email}</p>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(paciente)}
                    className="flex-1"
                  >
                    <Pencil className="mr-2 h-3 w-3" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(paciente.id)}
                    className="flex-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {pacientes.length === 0 && (
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">
                Nenhum paciente cadastrado. Clique em "Novo Paciente" para começar.
              </p>
            </CardContent>
          </Card>
        )}

        <PacienteForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          paciente={editingPaciente}
          onSubmit={(data) => {
            if (editingPaciente) {
              updatePaciente(editingPaciente.id, data);
            } else {
              addPaciente(data);
            }
            setIsFormOpen(false);
          }}
        />

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este paciente? Esta ação não pode ser desfeita.
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

export default Pacientes;
