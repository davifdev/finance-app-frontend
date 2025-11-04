import { CalendarDaysIcon } from "lucide-react";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const DatePickerWithRange = ({ value, onChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarDaysIcon /> Selecione uma data
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          className="rounded-lg border shadow-sm"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerWithRange;
