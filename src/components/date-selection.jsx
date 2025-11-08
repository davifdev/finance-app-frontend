import { useQueryClient } from "@tanstack/react-query";
import { addMonths, format, isValid } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuthContext } from "@/contexts/auth";

import DatePickerWithRange from "./ui/date-picker-with-range";

const formatDateToQueryParam = (date) => format(date, "yyyy-MM-dd");

const getDateTransaction = (searchParams) => {
  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  };
  4;
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return defaultDate;
  }

  const checkDateIsValid = !isValid(new Date(from)) || !isValid(new Date(to));
  if (checkDateIsValid) {
    return defaultDate;
  }

  return {
    from: new Date(from + "T00:00:00"),
    to: new Date(to + "T00:00:00"),
  };
};

const DateSelection = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(getDateTransaction(searchParams));

  useEffect(() => {
    if (!date?.from || !date?.to) return;
    const queryParams = new URLSearchParams();
    queryParams.set("from", formatDateToQueryParam(date.from));
    queryParams.set("to", formatDateToQueryParam(date.to));
    navigate(`/?${queryParams.toString()}`);
    queryClient.invalidateQueries(
      ["getBalance"],
      formatDateToQueryParam(date.from),
      formatDateToQueryParam(date.to),
      user.id
    );
  }, [date, navigate, queryClient, user]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
