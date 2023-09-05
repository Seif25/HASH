"use client";

import { User } from "@/utils/types/user";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import TextField from "./components/TextField";
import TextAreaField from "./components/TextAreaField";
import DatePickerField from "./components/DatePickerField";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface Params {
  user: User;
  btnTitle: string;
}

function AccountProfile({ user, btnTitle }: Params) {
  const [date, setDate] = useState<Date>(user.birthDate || new Date());
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      username: user.username || "",
      name: user.name === "null null" ? "" : (user.name || ""),
      bio: user.bio || "",
      image: user.image || "",
      bannerUrl: user.bannerUrl || "",
      website: user.website || "",
      location: user.location || "",
      birthDate: user.birthDate || date,
    },
  });


  const onSubmit = async (values: z.infer<typeof UserValidation & { pathname: string }>) => {
    try {
      await updateUser({
        _id: user._id,
        username: values.username,
        name: values.name,
        bio: values.bio,
        image: values.image,
        bannerUrl: values.bannerUrl,
        website: values.website,
        location: values.location,
        birthDate: values.birthDate,
        pathname,
        clerkId: user.id ?? ""
      })
  
      if (pathname.startsWith("/profile/edit")) {
        router.back()
      } else {
        router.push("/")
      }
    } catch (error: any) {
      console.log(error.message)
    }

  }

  return (
    <div>
      <section
        className="lg:rounded-lg p-10"
        style={{
          backgroundImage: `url("/assets/utopia-banner.png")`,
          backgroundSize: "cover",
          width: "100%",
          height: "300px",
        }}
      ></section>
      <Image
        src={"/assets/profile-pic.jpg"}
        alt="banner"
        width={128}
        height={128}
        className="rounded-full bg-contain z-10 -mt-[15%] md:-mt-[10%] lg:-mt-[8%] ml-[5%]"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onError={(errors) => console.log(errors)}
          className="p-10 flex flex-col justify-start gap-10"
        >
          {/* Username */}
          <TextField
            control={form.control}
            name="username"
            label="Username"
            type="text"
            placeholder="Please provide a username"
            max={30}
            maxLength={30}
            min={5}
            minLength={5}
          />
          {/* Name */}
          <TextField
            control={form.control}
            name="name"
            label="Name"
            type="text"
            placeholder="Please provide a name"
            max={50}
            maxLength={50}
            min={2}
            minLength={2}
          />
          {/* Bio */}
          <TextAreaField
            control={form.control}
            name="bio"
            label="Bio"
            placeholder="Please provide a bio"
            maxLength={150}
            rows={3}
          />
          {/* Website */}
          <TextField
            control={form.control}
            name="website"
            label="Website"
            type="text"
            max={100}
            maxLength={100}
          />
          {/* Location */}
          <TextField
            control={form.control}
            name="location"
            label="Location"
            type="text"
            max={30}
            maxLength={30}
          />
          {/* DoB */}
          <DatePickerField
            control={form.control}
            name="birthDate"
            label="Date of Birth"
            date={date}
            onDateChange={setDate}
          />
          {/* Submit Btn */}
          <Button
            type="submit"
            className="text-white border hover:bg-white hover:text-black bg-transparent"
          >
            {btnTitle}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AccountProfile;
