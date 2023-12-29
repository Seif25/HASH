"use client";

import { useForm } from "react-hook-form";
import { UserType } from "@/app/lib/types/user.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  AtSign,
  CheckCircle2,
  Globe,
  Loader2,
  Mail,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {
  checkIfEmailExistsAction,
  checkIfUserExistsAction,
  fetchUserAction,
  updateUserAction,
} from "@/app/lib/actions/user/user.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidationSchema } from "@/app/lib/schemas/user.schema";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AccountInformationSettingsProps {
  loggedInUser: UserType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function AccountInformationSettings({
  loggedInUser,
  firstName,
  lastName,
  email,
  phone,
}: AccountInformationSettingsProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof UserValidationSchema>>({
    resolver: zodResolver(UserValidationSchema),
    defaultValues: {
      username: loggedInUser.username,
      firstName: firstName,
      lastName: lastName,
      image: loggedInUser.image || "/assets/profile-pic.png",
      banner: loggedInUser.banner || "/assets/banner.png",
      bio: loggedInUser.bio || "",
      website: loggedInUser.website || "",
      location: loggedInUser.location || "",
      birthDate: moment(loggedInUser.birthDate).format("YYYY-MM-DD"),
      email: email || loggedInUser.email,
      phoneNumber: phone || loggedInUser.phoneNumber,
    },
  });

  async function onSubmit(data: z.infer<typeof UserValidationSchema>) {
    setLoading(true);
    await updateUserAction({
      username: loggedInUser.username,
      data: {
        ...form.getValues(),
        name: `${form.getValues("firstName")} ${form.getValues("lastName")}`,
      },
      pathname: pathname ?? "",
    });
    toast({
      title: "Account Information Updated!",
      description: "Your account information has been updated successfully.",
    });
    setLoading(false);
  }

  async function checkUsernameAvailability() {
    if (loggedInUser.username !== form.getValues("username")) {
      const exists = await checkIfUserExistsAction(form.getValues("username"));
      if (exists)
        form.setError("username", {
          message:
            "That username is already taken. Let's find one that's just for you!",
        });
    } else {
      form.clearErrors("username");
    }
  }

  async function checkEmailAvailability() {
    if (email !== form.getValues("email")) {
      const exists = await checkIfEmailExistsAction(form.getValues("email"));
      if (exists)
        form.setError("email", {
          message:
            "It seems that this email is associated with another account! Please try a different one.",
        });
    } else {
      form.clearErrors("email");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-5 h-screen overflow-scroll custom-scrollbar"
      >
        {/* Header & Submit Button */}
        <div className="flex items-center gap-5 bg-transparent rounded-lg text-accent1">
          <Link href={`/settings/account-settings`}>
            <ArrowLeft
              size={20}
              className="text-accent1/75 hover:text-primary"
            />
          </Link>
          <h3 className="text-heading flex-grow">Account Information</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size={"icon"}
                  variant={"icon"}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 size={24} className="text-primary animate-spin" />
                  ) : (
                    <CheckCircle2
                      size={24}
                      className="text-primary opacity-75 hover:opacity-100"
                    />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span className="text-body">Save Changes</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* Profile Information */}
        <div className="flex flex-col gap-5 rounded-lg">
          {/* Section Header */}
          <div className="flex flex-col gap-2 lg:bg-accent1/10 p-5 rounded-lg">
            <h3 className="text-heading">Profile Information</h3>
            <p className="text-[12px] text-accent1/70 font-bold">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          {/* Form Fields */}
          <div className="grid grid-cols-12 gap-5 p-5 rounded-lg">
            {/* Profile Picture */}
            <div className={`flex flex-col gap-2 col-span-12`}>
              <Label htmlFor="pip">Profile Picture</Label>
              <div className="flex items-center gap-5">
                <Image
                  src={loggedInUser.image}
                  alt={loggedInUser.username}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <Input
                  id="pip"
                  type="file"
                  accept="image/*"
                  className="border border-accent1/10 h-auto focus-visible:ring-0"
                />
              </div>
            </div>
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem
                  className={`${
                    loading && "animate-pulse"
                  }flex flex-col gap-2 col-span-12`}
                >
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="flex items-center border border-accent1/10 rounded-lg gap-1">
                      <div className="border-r border-accent1/10 h-full p-2 flex items-center justify-center">
                        <AtSign size={20} />
                      </div>
                      <Input
                        {...field}
                        aria-label="username field"
                        autoComplete="off"
                        placeholder={field.value}
                        onBlur={checkUsernameAvailability}
                        className="border-none outline-none ring-0 focus:ring-0 focus:outline-none h-auto focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                  {/* <span className="font-bold text-[12px] text-red-500">
                    {
                      "That username is already taken. Let's find one that's just for you!"
                    }
                  </span> */}
                </FormItem>
              )}
            />
            {/* First Name & Last Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem
                  className={`${
                    loading && "animate-pulse"
                  }flex flex-col gap-2 col-span-6`}
                >
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      aria-label="first name field"
                      placeholder={field.value}
                      className="border border-accent1/10 h-auto focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem
                  className={`${
                    loading && "animate-pulse"
                  }flex flex-col gap-2 col-span-6`}
                >
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      aria-label="last name field"
                      placeholder={field.value}
                      className="border border-accent1/10 h-auto focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email Address */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem
                  className={`${
                    loading && "animate-pulse"
                  }flex flex-col gap-2 col-span-12`}
                >
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="flex items-center border border-accent1/10 rounded-lg gap-1">
                      <div className="border-r border-accent1/10 h-full p-2 flex items-center justify-center">
                        <Mail size={20} />
                      </div>
                      <Input
                        {...field}
                        autoComplete="off"
                        aria-label="email field"
                        placeholder={field.value}
                        inputMode="email"
                        onBlur={checkEmailAvailability}
                        className="border-none outline-none ring-0 focus:ring-0 focus:outline-none h-auto focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem
                  className={`${
                    loading && "animate-pulse"
                  }flex flex-col gap-2 col-span-12`}
                >
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      aria-label="bio field"
                      placeholder={field.value}
                      className="border border-accent1/10 resize-none p-2 bg-transparent outline-none ring-0 rounded-lg h-auto focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Website & Location */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem
                  className={`${
                    loading && "animate-pulse"
                  }flex flex-col gap-2 col-span-6`}
                >
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <div className="flex items-center border border-accent1/10 rounded-lg gap-1">
                      <div className="border-r border-accent1/10 h-full p-2 flex items-center justify-center">
                        <Globe size={20} />
                      </div>
                      <Input
                        {...field}
                        type="url"
                        aria-label="website field"
                        autoComplete="off"
                        inputMode="url"
                        placeholder={field.value}
                        className="border-none outline-none ring-0 focus:ring-0 focus:outline-none h-auto focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem
                  className={`${
                    loading && "animate-pulse"
                  }flex flex-col gap-2 col-span-6`}
                >
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="off"
                      placeholder={field.value}
                      aria-label="location field"
                      className="border border-accent1/10 h-auto focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Banner */}
            <div className={`flex flex-col gap-2 col-span-12`}>
              <Label htmlFor="banner">Banner</Label>
              <div className="flex flex-col gap-5">
                <Image
                  src={loggedInUser.banner}
                  alt={`${loggedInUser.username}'s banner`}
                  width={100}
                  height={100}
                  className="w-full h-40 rounded-lg object-cover"
                />
                <Input
                  id="banner"
                  type="file"
                  accept="image/*"
                  className="border border-accent1/10 h-auto focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Account Information */}
        <div className="flex flex-col gap-5 rounded-lg">
          <div className="flex flex-col gap-2 lg:bg-accent1/10 p-5 rounded-lg">
            <h3 className="text-heading">Account Information</h3>
            <p className="text-[12px] text-accent1/70 font-bold">
              This information is private. No one will see it but you.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-5 p-5 rounded-lg">
            {/* Phone Number & DoB */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem
                  className={`${
                    loading && "animate-pulse"
                  }flex flex-col gap-2 col-span-6`}
                >
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="flex items-center border border-accent1/10 rounded-lg gap-1">
                      <div className="border-r border-accent1/10 h-full p-2 flex items-center justify-center">
                        {"+20"}
                      </div>
                      <Input
                        {...field}
                        type="tel"
                        autoComplete="off"
                        aria-label="phone number field"
                        inputMode="tel"
                        placeholder={field.value}
                        className="border-none h-auto focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem
                  className={`${
                    loading && "animate-pulse"
                  }flex flex-col gap-2 col-span-6`}
                >
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      autoComplete="off"
                      aria-label="birth date field"
                      className="border border-accent1/10 h-auto focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
