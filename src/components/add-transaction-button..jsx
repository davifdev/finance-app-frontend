import { zodResolver } from "@hookform/resolvers/zod";
import {
  PiggyBankIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import z from "zod";

import { Button } from "./ui/button";
import { DatePickerDemo } from "./ui/date-picker-demo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const addTransactionButtonSchema = z.object({
  name: z.string().trim().min(1, "O nome da transação é obrigatporio"),
  amount: z.number({
    required_error: "O valor é obrigatório",
  }),
  date: z.date({
    required_error: "A data é obrigatória",
  }),
  type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"]),
});

const AddTransactionButton = () => {
  const form = useForm({
    resolver: zodResolver(addTransactionButtonSchema),
    defaultValues: {
      name: "",
      amount: 0,
      date: new Date(),
      type: "EARNING",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Nova transação <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="sm:text-center">
          <DialogTitle>Adicionar transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da transação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <NumericFormat
                      placeholder="Digite o valor da transação"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      {...field}
                      onChange={() => {}}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <DatePickerDemo
                      placeholder="Selecione a data da transação"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        type="button"
                        variant={
                          field.value === "EARNING" ? "secondary" : "outline"
                        }
                        onClick={() => field.onChange("EARNING")}
                      >
                        <TrendingUpIcon className="text-primary-green" />
                        Ganho
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === "EXPENSE" ? "secondary" : "outline"
                        }
                        onClick={() => field.onChange("EXPENSE")}
                      >
                        <TrendingDownIcon className="text-primary-red" />
                        Gasto
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === "INVESTMENT" ? "secondary" : "outline"
                        }
                        onClick={() => field.onChange("INVESTMENT")}
                      >
                        <PiggyBankIcon className="text-primary-blue" />
                        Investimento
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" className="flex-1">
                  Cancelar
                </Button>
              </DialogClose>
              <Button className="flex-1">Adicionar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
