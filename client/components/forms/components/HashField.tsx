import { NextPage } from "next";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HashTextarea } from "@/components/ui/hashtextarea";
import { FocusEventHandler } from "react";
import { Button } from "@/components/ui/button";
import PublicIcon from "@mui/icons-material/Public";

import { Loader2 } from "lucide-react";
import HashFieldOptions from "@/components/shared/HashFieldOptions";
import { Control } from "react-hook-form";
import { HashValidation } from "@/lib/validations/hash";
import * as z from "zod";
import { Tag } from "@/utils/types/tag.types";

interface HashFieldProps {
  control: Control<z.infer<typeof HashValidation>> | undefined;
  name: any;
  label?: string;
  maxLength?: number;
  rows?: number;
  placeholder?: string;
  handleFocus: FocusEventHandler<HTMLTextAreaElement>;
  handleBlur: FocusEventHandler<HTMLTextAreaElement>;
  focused: boolean;
  loading: boolean;
  length: number;
  handleImageChange: (e: any, onChange: any) => void;
  handleTextChange: (e: any, onChange: any) => void;
  openHashSuggestions: boolean;
  setOpenHashSuggestions: (value: boolean) => void;
  suggestedTags: Tag[]
}

export default function HashField({
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
  handleImageChange,
  handleTextChange,
  openHashSuggestions,
  setOpenHashSuggestions,
  suggestedTags = []
}: HashFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex flex-col justify-start items-start gap-0 w-full`}
        >
          <FormControl className="no-focus text-black">
            <div
              className={`w-full flex flex-col ${
                focused ? "bubble-foc" : "bubble"
              } rounded-r-2xl rounded-bl-2xl rounded-tl-none px-2`}
            >
              {focused && (
                <div className={`flex items-center justify-start w-full`}>
                  <Button
                    className="flex items-center justify-start gap-1 w-auto h-auto hover:bg-primary text-[12px] p-1 rounded-full"
                    size={"sm"}
                  >
                    <PublicIcon className="text-inherit" fontSize="small" />
                    Everyone can reply
                  </Button>
                </div>
              )}
              <Popover
                open={openHashSuggestions}
                onOpenChange={setOpenHashSuggestions}
              >
                <PopoverTrigger asChild>
                  <HashTextarea
                    placeholder={placeholder || label}
                    {...field}
                    className="text-accent1 w-full pl-2 textarea"
                    maxLength={maxLength}
                    onChange={(e) => handleTextChange(e, field.onChange)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    rows={focused ? rows : 1}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-80 flex flex-col gap-2">
                  {
                    suggestedTags.map((tag) => (
                      <h3 key={tag.tag}>{tag.tag}</h3>
                    ))
                  }
                </PopoverContent>
              </Popover>
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
                  handleImageChange={handleImageChange}
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
