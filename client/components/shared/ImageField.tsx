"use client";

import { ImageFieldProps } from "@/utils/types/user.types";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "../ui/input";
import { useRef } from "react";

export default function ImageField({
  control,
  name,
  type,
  accept,
  label,
  placeholder,
  handleImageChange,
}: ImageFieldProps) {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const openFileUpload = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="rounded-full bg-contain z-10 -mt-[15%]">
          <FormLabel className="">
            {field.value ? (
              <Image
                src={field.value}
                alt="Profile Picture"
                width={128}
                height={128}
                className="rounded-full cursor-pointer object-cover max-w-[128px] max-h-[128px]"
                priority
                onClick={openFileUpload}
                placeholder="blur"
              />
            ) : (
              <Image
                src="/assets/profile-pic.png"
                alt="Profile Picture"
                width={128}
                height={128}
                className="rounded-full cursor-pointer object-cover max-w-[128px] max-h-[128px]"
                onClick={openFileUpload}
                priority
                blurDataURL="/assets/profile-pic.png"
              />
            )}
          </FormLabel>
          <FormControl className="relative">
            <Input
              id="file-upload"
              type={type}
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
  );
}
