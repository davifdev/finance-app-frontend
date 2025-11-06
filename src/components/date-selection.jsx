import { useQueryClient } from "@tanstack/react-query";
import { addMonths, format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuthContext } from "@/contexts/auth";

import DatePickerWithRange from "./ui/date-picker-with-range";

const formatDateToQueryParam = (date) => format(date, "yyyy-MM-dd");

const DateSelection = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const navigate = useNavigate();
  const [date, setDate] = useState({
    from: from ? new Date(from + "T00:00:00") : new Date(),
    to: to ? new Date(to + "T00:00:00") : addMonths(new Date(), 1),
  });

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
      user
    );
  }, [date, navigate, queryClient, user]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
