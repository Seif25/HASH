import { NextPage } from "next";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { CommentFieldProps } from "@/utils/types/user";
import { HashTextarea } from "@/components/ui/hashtextarea";
import { FocusEventHandler } from "react";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageIcon from "@mui/icons-material/Image";
import GifBoxIcon from "@mui/icons-material/GifBox";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Loader2 } from "lucide-react";

const CommentField: NextPage<
  CommentFieldProps & {
    handleFocus: FocusEventHandler<HTMLTextAreaElement>;
  } & {
    handleBlur: FocusEventHandler<HTMLTextAreaElement>;
  } & { focused: boolean, loading: boolean, length: number }
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
  loading,
  length
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start items-start gap-0 w-full">
          <FormControl className="no-focus text-black">
            <div className={`w-full flex flex-col ${
                focused ? "bubble-foc" : "bubble"
              } rounded-r-2xl rounded-bl-2xl rounded-tl-none px-2`}>
              {focused && (
                <span className="text-[12px] font-bold text-primary italic px-2 pt-2">
                  {`Replying to @user1, @user2 and @user3`}
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
                <div className={`flex items-center justify-end w-full px-5 pt-2`}>
                  <span className="text-light-3 text-[12px]">
                    {field.value.length}/250
                  </span>
                </div>
              )}
               <div className="grid grid-cols-2 gap-10 pl-2">
                <div className="flex items-center w-full gap-5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="rounded-full">
                          <ImageIcon
                            className="text-primary"
                            fontSize="small"
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Media</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="rounded-full">
                          <GifBoxIcon
                            className="text-primary"
                            fontSize="small"
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>GIF</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="rounded-full">
                          <InsertEmoticonIcon
                            className="text-primary"
                            fontSize="small"
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Emojis</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
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
};

export default CommentField;
