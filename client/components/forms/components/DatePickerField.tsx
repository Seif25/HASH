"use client"

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NextPage } from "next";
import { DatePickerProps } from "@/utils/types/user";
import { generateYears, getMonths } from "@/constants";
import { useState } from "react";

const DatePickerField: NextPage<DatePickerProps> = ({
  control,
  name,
  label,
  date,
  onDateChange,
}) => {
  const today = new Date();
  const [month, setMonth] = useState<string>(today.getMonth().toString());
  const [year, setYear] = useState<string>(today.getFullYear().toString());

  const years = generateYears();
  const currentYear = today.getFullYear()

  const handleYearChange = (value: string) => {
    setYear(value);
    onDateChange(new Date(parseInt(value), parseInt(month)-1, 1));
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
    onDateChange(new Date(parseInt(year), parseInt(value)-1, 1));
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start items-start gap-2">
          <FormLabel className="font-bold">{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full flex justify-between text-left font-normal bg-transparent",
                    !date && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="mr-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="flex items-center justify-between p-2 gap-5 bg-black rounded-t-md">
                  {/* Year Select */}
                  <Select
                    onValueChange={(value: string) => handleYearChange(value)}
                  >
                    <SelectTrigger className="bg-black text-light-1 border border-white rounded-md">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="bg-black text-light-1 overflow-y-scroll h-[310px] relative custom-scrollbar"
                    >
                      {years.map((year, index) => (
                        <SelectItem
                          value={year.getFullYear().toString()}
                          key={`year-${index}`}
                        >
                          {year.getFullYear().toString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* Month Select */}
                  <Select
                    onValueChange={(value: string) => handleMonthChange(value)}
                  >
                    <SelectTrigger className="bg-black text-light-1 border border-white rounded-md">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="bg-black text-light-1 overflow-y-scroll h-[310px] relative custom-scrollbar"
                    >
                      {getMonths.map((month, index) => (
                        <SelectItem
                          value={month.value.toString()}
                          key={`year-${index}`}
                        >
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  month={date}
                  initialFocus
                  disabled={(date) =>
                    date > new Date() ||
                    date < new Date((currentYear - 60), 1, 1)
                  }
                  className="bg-black text-light-1 rounded-b-md"
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DatePickerField;
