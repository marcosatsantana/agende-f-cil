import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Consulta, ConsultaComDetalhes, Medico, Paciente } from "@/types";

const consultaSchema = z.object({
  medicoId: z.string().min(1, "Selecione um médico"),
  pacienteId: z.string().min(1, "Selecione um paciente"),
  dataHora: z.string().min(1, "Data e hora obrigatórias"),
  status: z.enum(["agendada", "confirmada", "concluida", "cancelada"]),
  observacoes: z.string().optional(),
});

interface ConsultaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consulta?: ConsultaComDetalhes | null;
  medicos: Medico[];
  pacientes: Paciente[];
  onSubmit: (data: Omit<Consulta, "id">) => void;
}

export const ConsultaForm = ({ open, onOpenChange, consulta, medicos, pacientes, onSubmit }: ConsultaFormProps) => {
  const form = useForm<z.infer<typeof consultaSchema>>({
    resolver: zodResolver(consultaSchema),
    defaultValues: consulta ? {
      medicoId: consulta.medicoId,
      pacienteId: consulta.pacienteId,
      dataHora: consulta.dataHora.slice(0, 16),
      status: consulta.status,
      observacoes: consulta.observacoes || "",
    } : {
      medicoId: "",
      pacienteId: "",
      dataHora: "",
      status: "agendada",
      observacoes: "",
    },
  });

  useEffect(() => {
    if (consulta) {
      form.reset({
        medicoId: consulta.medicoId.toString(),
        pacienteId: consulta.pacienteId.toString(),
        dataHora: consulta.dataHora.slice(0, 16),
        status: consulta.status as "agendada" | "confirmada" | "concluida" | "cancelada",
        observacoes: consulta.observacoes || "",
      });
    } else {
      form.reset({
        medicoId: "",
        pacienteId: "",
        dataHora: "",
        status: "agendada",
        observacoes: "",
      });
    }
  }, [consulta, form]);

  const handleSubmit = (data: z.infer<typeof consultaSchema>) => {
    onSubmit(data as Omit<Consulta, "id">);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{consulta ? "Editar Consulta" : "Nova Consulta"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="pacienteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paciente</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um paciente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {pacientes.map((paciente) => (
                        <SelectItem key={paciente.id} value={paciente.id.toString()}>
                          {paciente.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Médico</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um médico" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {medicos.map((medico) => (
                        <SelectItem key={medico.id} value={medico.id.toString()}>
                          Dr(a). {medico.nome} - {medico.especialidade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dataHora"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data e Hora</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="agendada">Agendada</SelectItem>
                        <SelectItem value="confirmada">Confirmada</SelectItem>
                        <SelectItem value="concluida">Concluída</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informações adicionais sobre a consulta"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                {consulta ? "Atualizar" : "Agendar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
