import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAddTransaction } from "@/api/hooks/transaction";

import { addTransactionButtonSchema } from "./schemas/transaction-schema";

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
