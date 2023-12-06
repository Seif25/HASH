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
import { ArrowLeft, AtSign, CheckCircle2, Globe, Mail } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="flex flex-col gap-5 p-5 h-screen overflow-scroll custom-scrollbar">
      <div className="flex items-center gap-5 bg-transparent rounded-2xl text-accent1">
        <Link href={`/settings/account-settings`}>
          <ArrowLeft size={20} className="text-accent1/75 hover:text-primary" />
        </Link>
        <h3 className="text-heading flex-grow">Account Information</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"icon"}>
                <CheckCircle2
                  size={24}
                  className="text-primary opacity-75 hover:opacity-100"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-body">Save Changes</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* Profile Information */}
      <div className="flex flex-col gap-5 rounded-2xl">
        <div className="flex flex-col gap-2 lg:bg-accent1/10 p-5 rounded-2xl">
          <h3 className="text-heading">Profile Information</h3>
          <p className="text-[12px] text-accent1/70 font-bold">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-5 p-5 rounded-2xl">
          {/* Profile Picture */}
          <div className="flex flex-col gap-2 col-span-12">
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
          <div className="flex flex-col gap-2 col-span-12">
            <Label htmlFor="username">Username</Label>
            <div className="flex items-center border border-accent1/10 rounded-xl gap-1">
              <div className="border-r border-accent1/10 h-full p-2 flex items-center justify-center">
                <AtSign size={20} />
              </div>
              <Input
                id="username"
                type="text"
                autoComplete="off"
                placeholder={`@${loggedInUser.username}`}
                className="border-none outline-none ring-0 focus:ring-0 focus:outline-none h-auto focus-visible:ring-0"
              />
            </div>
            <span className="font-bold text-[12px] text-red-500">
              {
                "That username is already taken. Let's find one that's just for you!"
              }
            </span>
          </div>
          {/* First Name & Last Name */}
          <div className="flex flex-col gap-2 col-span-6">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              type="text"
              autoComplete="off"
              placeholder={firstName}
              className="border border-accent1/10 h-auto focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-col gap-2 col-span-6">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              type="text"
              autoComplete="off"
              placeholder={lastName}
              className="border border-accent1/10 h-auto focus-visible:ring-0"
            />
          </div>
          {/* Email Address */}
          <div className="flex flex-col gap-2 col-span-12">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center border border-accent1/10 rounded-xl gap-1">
              <div className="border-r border-accent1/10 h-full p-2 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <Input
                id="email"
                type="email"
                autoComplete="off"
                placeholder={email}
                className="border-none outline-none ring-0 focus:ring-0 focus:outline-none h-auto focus-visible:ring-0"
              />
            </div>
            <span className="font-bold text-[12px] text-red-500">
              {
                "Looks like that email address is already in use. Would you like to try a different one?"
              }
            </span>
          </div>
          {/* Bio */}
          <div className="flex flex-col gap-2 col-span-12">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              autoComplete="off"
              placeholder={loggedInUser.bio ?? ""}
              rows={4}
              className="border border-accent1/10 resize-none p-2 bg-transparent outline-none ring-0 rounded-xl h-auto focus-visible:ring-0"
            />
          </div>
          {/* Website & Location */}
          <div className="flex flex-col gap-2 col-span-6">
            <Label htmlFor="website">Website</Label>
            <div className="flex items-center border border-accent1/10 rounded-xl gap-1">
              <div className="border-r border-accent1/10 h-full p-2 flex items-center justify-center">
                <Globe size={20} />
              </div>
              <Input
                id="website"
                type="url"
                autoComplete="off"
                placeholder={loggedInUser.website ?? ""}
                className="border-none outline-none ring-0 focus:ring-0 focus:outline-none h-auto focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 col-span-6">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              autoComplete="off"
              placeholder={loggedInUser.location ?? ""}
              className="border border-accent1/10 h-auto focus-visible:ring-0"
            />
          </div>
          {/* Banner */}
          <div className="flex flex-col gap-2 col-span-12">
            <Label htmlFor="banner">Banner</Label>
            <div className="flex flex-col gap-5">
              <Image
                src={loggedInUser.banner}
                alt={`${loggedInUser.username}'s banner`}
                width={100}
                height={100}
                className="w-full h-40 rounded-xl object-cover"
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
      <div className="flex flex-col gap-5 rounded-2xl">
        <div className="flex flex-col gap-2 lg:bg-accent1/10 p-5 rounded-2xl">
          <h3 className="text-heading">Account Information</h3>
          <p className="text-[12px] text-accent1/70 font-bold">
            This information is private. No one will see it but you.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-5 p-5 rounded-2xl">
          {/* Phone Number & DoB */}
          <div className="flex flex-col gap-2 col-span-6">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex items-center border border-accent1/10 rounded-xl gap-1">
              <div className="border-r border-accent1/10 h-full p-2 flex items-center justify-center">
                {"+20"}
              </div>
              <Input
                id="phone"
                type="tel"
                autoComplete="off"
                placeholder={phone}
                className="border-none h-auto focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 col-span-6">
            <Label htmlFor="dob">Birth Date</Label>
            <Input
              id="dob"
              type="date"
              autoComplete="off"
              defaultValue={moment(loggedInUser.birthDate).format("YYYY-MM-DD")}
              className="border border-accent1/10 h-auto focus-visible:ring-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
