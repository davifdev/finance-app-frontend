import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDaysIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const DatePickerWithRange = ({ value, onChange }) => {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarDaysIcon />
            {value?.from ? (
              value?.to ? (
                <>
                  {format(value.from, "LLL dd, y", {
                    locale: ptBR,
                  })}{" "}
                  -{" "}
                  {format(value.to, "LLL dd, y", {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(value.from, "LLL dd, y", {
                  locale: ptBR,
                })
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerWithRange;
