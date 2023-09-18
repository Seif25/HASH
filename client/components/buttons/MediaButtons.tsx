"use client";

// *SHADCN COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

// *ICONS
import ImageIcon from "@mui/icons-material/Image";

// *UTILS
import { Control } from "react-hook-form";
import * as z from "zod";
import { HashValidation } from "@/lib/validations/hash";
import { useRef } from "react";
import { Input } from "../ui/input";

interface MediaButtonProps {
  control: Control<z.infer<typeof HashValidation>> | undefined;
  name: any;
  type: string;
  accept: string;
  placeholder: string;
  handleImageChange: (e: any, onChange: any) => void;
}

export default function MediaButton({
  control,
  name,
  placeholder,
  type,
  accept,
  handleImageChange,
}: MediaButtonProps) {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const handleOpenUpload = (e: any) => {
    e.preventDefault();
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className="">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="rounded-full" onClick={handleOpenUpload}>
                      <ImageIcon className="text-primary" fontSize="small" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Media</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </FormLabel>
            <FormControl className="relative">
              <Input
                id="file-upload"
                type={type}
                multiple
                accept={accept}
                ref={fileUploadRef}
                placeholder={placeholder}
                className="bg-transparent text-light-1 w-[128px] h-[128px] hidden"
                onChange={(e) => handleImageChange(e, field.onChange)}
              />
            </FormControl>
          </FormItem>
        )}
      ></FormField>
    </div>
  );
}
