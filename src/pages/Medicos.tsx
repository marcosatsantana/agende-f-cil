import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMockData } from "@/hooks/useMockData";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { MedicoForm } from "@/components/MedicoForm";
import { Medico } from "@/types";
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

const Medicos = () => {
  const { medicos, addMedico, updateMedico, deleteMedico } = useMockData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMedico, setEditingMedico] = useState<Medico | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingMedico(null);
    setIsFormOpen(true);
  };

  const handleEdit = (medico: Medico) => {
    setEditingMedico(medico);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMedico(id);
    setDeleteId(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Médicos</h1>
            <p className="text-muted-foreground">Gerencie o cadastro de médicos</p>
          </div>
          <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Novo Médico
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicos.map((medico) => (
            <Card key={medico.id} className="bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {medico.nome}
                </CardTitle>
                <p className="text-sm text-primary font-medium">{medico.especialidade}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">CRM: {medico.crm}</p>
                <p className="text-sm text-muted-foreground">Tel: {medico.telefone}</p>
                <p className="text-sm text-muted-foreground">Email: {medico.email}</p>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(medico)}
                    className="flex-1"
                  >
                    <Pencil className="mr-2 h-3 w-3" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(medico.id)}
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

        {medicos.length === 0 && (
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">
                Nenhum médico cadastrado. Clique em "Novo Médico" para começar.
              </p>
            </CardContent>
          </Card>
        )}

        <MedicoForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          medico={editingMedico}
          onSubmit={(data) => {
            if (editingMedico) {
              updateMedico(editingMedico.id, data);
            } else {
              addMedico(data);
            }
            setIsFormOpen(false);
          }}
        />

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este médico? Esta ação não pode ser desfeita.
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

export default Medicos;
