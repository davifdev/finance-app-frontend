import {
  ExternalLink,
  Loader2Icon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

import { useEditTransactionForm } from "@/form/hooks/transactions";

import { Button } from "./ui/button";
import { DatePickerDemo } from "./ui/date-picker-demo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const EditTransactionButton = ({ transaction }) => {
  const [sheetIsOpen, setSheetIsOpen] = useState();
  const { form, onSubmit } = useEditTransactionForm({
    transaction,
    onSuccess: () => {
      toast.success("Transação atualizada com sucesso");
      setSheetIsOpen(false);
    },
    onError: () => {
      toast.error("Erro ao atualizar transação");
    },
  });

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen} className="m">
      <SheetTrigger asChild>
        <Button size="icon-sm" variant="ghost">
          <ExternalLink className="text-muted-foreground" size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4 md:min-w-[450px]">
        <SheetHeader>
          <SheetTitle>Transação</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="Nome da transação"
                      {...field}
                    />
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
                      disabled={form.formState.isSubmitting}
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
                      disabled={form.formState.isSubmitting}
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
                        disabled={form.formState.isSubmitting}
                      >
                        <TrendingUpIcon className="text-primary-green" />
                        <span
                          className="max-w-[81px] truncate md:max-w-full"
                          aria-label="Ganho"
                          title="Ganho"
                        >
                          Ganho
                        </span>
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === "EXPENSE" ? "secondary" : "outline"
                        }
                        onClick={() => field.onChange("EXPENSE")}
                        disabled={form.formState.isSubmitting}
                      >
                        <TrendingDownIcon className="text-primary-red" />
                        <span
                          className="max-w-[81px] truncate md:max-w-full"
                          aria-label="Gasto"
                          title="Gasto"
                        >
                          Gasto
                        </span>
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === "INVESTMENT" ? "secondary" : "outline"
                        }
                        onClick={() => field.onChange("INVESTMENT")}
                        disabled={form.formState.isSubmitting}
                      >
                        <PiggyBankIcon className="text-primary-blue" />
                        <span
                          className="max-w-[91px] truncate md:max-w-full"
                          aria-label="Investimento"
                          title="Investimento"
                        >
                          Investimento
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  variant="secondary"
                  className="flex-1"
                  disabled={form.formState.isSubmitting}
                >
                  Cancelar
                </Button>
              </SheetClose>
              <Button className="flex-1" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                Salvar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditTransactionButton;
