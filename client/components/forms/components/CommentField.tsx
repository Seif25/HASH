// *SHADCN COMPONENTS
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { HashTextarea } from "@/components/ui/hashtextarea";
import { Button } from "@/components/ui/button";
import { FocusEventHandler } from "react";

// *LUCIDE
import { Loader2 } from "lucide-react";
import { Control } from "react-hook-form";

// *UTILS
import * as z from "zod";
import { CommentValidation } from "@/lib/validations/hash";
import HashFieldOptions from "@/components/shared/HashFieldOptions";

interface CommentFieldProps {
  control: Control<z.infer<typeof CommentValidation>> | undefined;
  name: any;
  label?: string;
  maxLength: number;
  rows: number;
  placeholder: string;
  handleFocus: FocusEventHandler<HTMLTextAreaElement>;
  handleBlur: FocusEventHandler<HTMLTextAreaElement>;
  focused: boolean;
  loading: boolean;
  length: number;
  parentAuthor: string;
}

export default function CommentField({
  control,
  name,
  label,
  maxLength,
  rows,
  placeholder,
  handleFocus,
  handleBlur,
  focused,
  loading,
  length,
  parentAuthor
}: CommentFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start items-start gap-0 w-full">
          <FormControl className="no-focus text-black">
            <div
              className={`w-full flex flex-col ${
                focused ? "bubble-foc" : "bubble"
              } rounded-r-2xl rounded-bl-2xl rounded-tl-none px-2`}
            >
              {focused && (
                <span className="text-[12px] font-bold text-primary italic px-2 pt-2">
                  {`Replying to @${parentAuthor}`}
                </span>
              )}
              <HashTextarea
                placeholder={placeholder || label}
                {...field}
                className="bg-transparent text-black w-full pl-2 textarea"
                maxLength={maxLength}
                onChange={field.onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                rows={focused ? rows : 1}
              />
              {focused && (
                <div
                  className={`flex items-center justify-end w-full px-5 pt-2`}
                >
                  <span className="text-light-3 text-[12px]">
                    {field.value.length}/280
                  </span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-10 pl-2">
                <HashFieldOptions 
                  control={control}
                  handleImageChange={() => {}}
                />
                <div className="flex items-center justify-end">
                  <Button
                    className="rounded-full w-20"
                    variant={"default"}
                    type="submit"
                    disabled={length < 1 || loading}
                    size={"sm"}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}