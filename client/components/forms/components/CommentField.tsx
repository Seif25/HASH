import { NextPage } from "next";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CommentFieldProps } from "@/utils/types/user";
import { HashTextarea } from "@/components/ui/hashtextarea";
import { FocusEventHandler } from "react";
import { Button } from "@/components/ui/button";
import PublicIcon from "@mui/icons-material/Public";

const CommentField: NextPage<
  CommentFieldProps & {
    handleFocus: FocusEventHandler<HTMLTextAreaElement>;
  } & {
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
        <FormItem className="flex flex-col justify-start items-start gap-0 w-full">
          <FormLabel className="font-bold">{label}</FormLabel>
          <FormControl className="no-focus text-accent1">
            <div className="w-full flex flex-col border-y-2 border-light-3 pb-2">
              {focused && (
                <span className="text-small-semibold text-accent1 px-2 pt-2">
                  {`Replying to @user1, @user2 and @user3`}
                </span>
              )}
              <HashTextarea
                placeholder={placeholder || label}
                {...field}
                className="bg-transparent text-accent1 textarea w-full flex items-center"
                maxLength={maxLength}
                onChange={field.onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                rows={focused ? rows : 1}
              />
              {focused && (
                <div className="flex items-center justify-end w-full">
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

export default CommentField;
