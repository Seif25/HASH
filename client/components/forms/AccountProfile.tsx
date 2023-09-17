"use client";

import { User } from "@/utils/types/user.types";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ChangeEvent, useState } from "react";
import TextField from "./components/TextField";
import TextAreaField from "./components/TextAreaField";
import DatePickerField from "./components/DatePickerField";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import ImageField from "../shared/ImageField";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadThing";
import { Loader2 } from "lucide-react";

interface Params {
  user: User;
  btnTitle: string;
}

function AccountProfile({ user, btnTitle }: Params) {
  const [date, setDate] = useState<Date>(user.birthDate || new Date());
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("profileMedia");

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      username: user.username || "",
      name: user.name === "null null" ? "" : user.name || "",
      bio: user.bio || "",
      image: user.image || "",
      banner: user.banner || "",
      website: user.website || "",
      location: user.location || "",
      birthDate: user.birthDate || date,
    },
  });

  // *Handle Profile Picture Upload
  const uploadImage = async (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() ?? "";

        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // ! This is a workaround to avoid errors -> Needs to be fixed in new version
  const onSubmit = async (
    values: z.infer<typeof UserValidation & { pathname: string }>
  ) => {
    setLoading(true)
    const blob = values.image;

    const ImageHasChanged = isBase64Image(blob);

    if (ImageHasChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.image = imgRes[0].url;
      }
    }
    try {
      await updateUser({
        _id: user._id,
        username: values.username,
        name: values.name,
        bio: values.bio,
        image: values.image,
        banner: values.banner,
        website: values.website,
        location: values.location,
        birthDate: values.birthDate,
        pathname,
        clerkId: user.id ?? "",
        followers: [],
        following: [],
        id: "",
        joinedAt: new Date(),
        onBoarded: false,
        verified: false,
      });

      if (pathname.startsWith("/profile/edit")) {
        router.back();
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error.message);
    }

    setLoading(false)
  };

  return (
    <div>
      {user.banner ? (
        <section
          className="lg:rounded-lg p-10"
          style={{
            backgroundImage: `url(${
              user.banner ||
              `https://placehold.co/800x300/13161a/1991fe?text=${user.username};&font=Lato`
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
          <button className="bg-gradient-to-b from-[#1991fe] via-[#1183e8] to-[#0671cb] rounded-full text-white p-2">
            Add Banner
          </button>
        </section>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onError={(errors) => console.log(errors)}
          className="p-10 flex flex-col justify-start gap-10"
        >
          {/* Profile Picture */}
          <ImageField
            control={form.control}
            name="image"
            label="Profile Picture"
            type="file"
            accept="image/*"
            placeholder="Please provide a profile picture"
            handleImageChange={uploadImage}
          />
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
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {btnTitle}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AccountProfile;
