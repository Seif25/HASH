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
import { EventHandler, useRef } from "react";

export default function BannerField({
  control,
  name,
  type,
  accept,
  label,
  placeholder,
  handleImageChange,
  banner,
  username,
}: ImageFieldProps & { banner: string | undefined; username: string }) {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const openFileUpload = (e: any) => {
    e.preventDefault()
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="rounded-full bg-contain z-10">
            <FormLabel className="">
              {field.value ? (
                <section
                  className="lg:rounded-lg p-10 cursor-pointer"
                  onClick={openFileUpload}
                  style={{
                    backgroundImage: `url(${
                      field.value ||
                      `https://placehold.co/800x300/13161a/1991fe?text=${username};&font=Lato`
                    })`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "300px",
                  }}
                ></section>
              ) : (
                <section
                  className="lg:rounded-lg p-5 bg-accent2 flex items-start justify-end"
                  style={{
                    backgroundSize: "cover",
                    width: "100%",
                    height: "150px",
                  }}
                >
                  <button
                    className="bg-gradient-to-b from-[#1991fe] via-[#1183e8] to-[#0671cb] rounded-full text-white p-2"
                    onClick={(e) => openFileUpload(e)}
                  >
                    Add Banner
                  </button>
                </section>
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
    </>
  );
}
