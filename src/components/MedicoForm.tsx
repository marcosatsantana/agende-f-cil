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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Medico } from "@/types";

const medicoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  especialidade: z.string().min(3, "Especialidade obrigatória"),
  telefone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("Email inválido"),
});

interface MedicoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medico?: Medico | null;
  onSubmit: (data: Omit<Medico, "id">) => void;
}

export const MedicoForm = ({ open, onOpenChange, medico, onSubmit }: MedicoFormProps) => {
  const form = useForm<z.infer<typeof medicoSchema>>({
    resolver: zodResolver(medicoSchema),
    defaultValues: medico || {
      nome: "",
      especialidade: "",
      telefone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (medico) {
      form.reset({
        nome: medico.nome,
        especialidade: medico.especialidade,
        telefone: medico.telefone,
        email: medico.email,
      });
    } else {
      form.reset({
        nome: "",
        especialidade: "",
        telefone: "",
        email: "",
      });
    }
  }, [medico, form]);

  const handleSubmit = (data: z.infer<typeof medicoSchema>) => {
    onSubmit(data as Omit<Medico, "id">);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{medico ? "Editar Médico" : "Novo Médico"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. João Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="especialidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cardiologia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(62) 98765-4321" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="medico@email.com" {...field} />
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
                {medico ? "Atualizar" : "Cadastrar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
