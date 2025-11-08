import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useAddTransaction, useEditTransaction } from "@/api/hooks/transaction";

import {
  addTransactionButtonSchema,
  editTransactionButtonSchema,
} from "./schemas/transaction-schema";

export const useAddTransactionForm = ({ onSuccess, onError }) => {
  const { mutateAsync: createdTransaction } = useAddTransaction();

  const form = useForm({
    resolver: zodResolver(addTransactionButtonSchema),
    defaultValues: {
      name: "",
      amount: 0,
      date: new Date(),
      type: "EARNING",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data) => {
    try {
      await createdTransaction(data);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  return { form, onSubmit };
};

const getEditTransactionDefaultValues = (transaction) => ({
  name: transaction.name,
  amount: parseFloat(transaction.amount),
  date: new Date(transaction.date),
  type: transaction.type,
});

export const useEditTransactionForm = ({ transaction, onSuccess, onError }) => {
  const { mutateAsync: updateTransaction } = useEditTransaction();
  const form = useForm({
    resolver: zodResolver(editTransactionButtonSchema),
    defaultValues: getEditTransactionDefaultValues(transaction),
    shouldUnregister: true,
  });
  useEffect(() => {
    form.reset(getEditTransactionDefaultValues(transaction));
    form.setValue("id", transaction.id);
  }, [form, transaction]);

  const onSubmit = async (data) => {
    try {
      await updateTransaction(data);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  return { form, onSubmit };
};
