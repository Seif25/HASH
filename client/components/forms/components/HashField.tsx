import { NextPage } from "next";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { HashFieldProps } from "@/utils/types/user";
import { HashTextarea } from "@/components/ui/hashtextarea";
import { FocusEventHandler } from "react";
import { Button } from "@/components/ui/button";
import PublicIcon from "@mui/icons-material/Public";

const HashField: NextPage<
  HashFieldProps & { handleFocus: FocusEventHandler<HTMLTextAreaElement> } & {
    handleBlur: FocusEventHandler<HTMLTextAreaElement>;
  } & { focused: boolean }
> = ({
  control,
  name,
  label,
  maxLength,
  rows,
  placeholder,
  handleFocus,
  handleBlur,
  focused,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start items-start gap-2">
          <FormLabel className="font-bold">{label}</FormLabel>
          <FormControl className="no-focus text-light-1">
            <div className="w-full flex flex-col border-b-2 border-light-3 pb-2">
              <HashTextarea
                placeholder={placeholder || label}
                {...field}
                className="bg-transparent text-light-1 textarea"
                maxLength={maxLength}
                onChange={field.onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                rows={focused ? rows : 1}
              />
              {focused && (
                <div
                  className={`flex items-center ${
                    focused ? "justify-between" : "justify-end"
                  } w-full`}
                >
                  <Button
                    variant={"ghost"}
                    className="flex items-center gap-1 text-[#CBCCFF]"
                  >
                    <PublicIcon className="text-[#CBCCFF]" />
                    Everyone can reply
                  </Button>
                  <span className="text-light-3">{field.value.length}/250</span>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HashField;
