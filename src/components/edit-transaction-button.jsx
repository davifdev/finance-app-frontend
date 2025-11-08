import {
  ExternalLink,
  Loader2Icon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";

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
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const EditTransactionButton = () => {
  const form = useForm({});
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon-sm" variant="ghost">
          <ExternalLink className="text-muted-foreground" size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-2">
        <SheetHeader>
          <SheetTitle>Transação</SheetTitle>
        </SheetHeader>
      </SheetContent>
      <Form {...form}>
        <form className="space-y-6">
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
                    disabled={form.formState.isSubmitting}
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
                      Ganho
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
                      Gasto
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
              <Button
                variant="secondary"
                className="flex-1"
                disabled={form.formState.isSubmitting}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button className="flex-1" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Sheet>
  );
};

export default EditTransactionButton;
