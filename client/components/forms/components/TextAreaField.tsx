import { NextPage } from "next";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TextAreaProps } from "@/utils/types/user";

const TextAreaField: NextPage<TextAreaProps> = ({
  control,
  name,
  label,
  maxLength,
  placeholder,
  rows,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start items-start gap-2">
          <FormLabel className="font-bold">{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder || label}
              {...field}
              className="bg-transparent text-accent1"
              rows={rows}
              maxLength={maxLength}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextAreaField;
