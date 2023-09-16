import { NextPage } from "next";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextFieldProps } from "@/utils/types/user.types";

const TextField: NextPage<TextFieldProps> = ({
  control,
  name,
  label,
  max,
  maxLength,
  min,
  minLength,
  type,
  placeholder,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start items-start gap-2">
          <FormLabel className="font-bold">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || label}
              {...field}
              className="bg-transparent text-light-1"
              max={max}
              maxLength={maxLength}
              min={min}
              minLength={minLength}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
