import { Button } from "@/components/ui/button";
import { ArrowLeft, Hash } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

export default function DeleteAccount() {
  return (
    <div className="flex flex-col gap-5 p-5 h-screen overflow-scroll w-full custom-scrollbar">
      <div className="flex items-center gap-5 bg-transparent rounded-xl text-accent1">
        <Link href={`/settings/account-settings`}>
          <ArrowLeft size={20} className="text-accent1/75 hover:text-primary" />
        </Link>
        <h3 className="text-heading flex-grow">Delete Your Account</h3>
      </div>
      <div className="flex flex-col w-full gap-5 p-5 rounded-xl">
        <h1 className="text-accent1 font-bold text-heading">
          Account Deletion Confirmation
        </h1>
        <p className="text-body text-accent1/80">
          Please read carefully before proceeding.
        </p>
        <p className="text-body text-accent1">
          Deleting your account is a{" "}
          <span className="font-black uppercase text-[16px] text-red-700 underline">
            permanent action
          </span>
          . Once you confirm, your account and all data associated with it will
          be permanently erased and cannot be recovered. This includes:
        </p>
        <ul>
          <li className="flex items-center gap-1">
            <Hash size={16} className="text-accent1" />
            Your Profile and Personal Information
          </li>
          <li className="flex items-center gap-1">
            <Hash size={16} className="text-accent1" />
            All of Your Hashes, Comments, and Messages
          </li>
          <li className="flex items-center gap-1">
            <Hash size={16} className="text-accent1" />
            Your Followers and Following List
          </li>
          <li className="flex items-center gap-1 capitalize">
            <Hash size={16} className="text-accent1" />
            Any private information associated with your account
          </li>
        </ul>
        <p className="text-body text-accent1">
          If you are certain you wish to delete your account, please click the
          "Delete Account" button below.
        </p>
        <div className="flex items-center justify-between gap-5 mt-10">
          <Link href={`/settings/account-settings`}>
            <Button
              variant={"outline"}
              size={"default"}
              className="hover:bg-accent1 hover:text-dark w-40"
            >
              Cancel
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant={"destructive"} size={"default"} className="w-40">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-5">
                  <div className="w-full flex items-center justify-center">
                    <Image
                      src={"/logo.png"}
                      alt="hash"
                      width={50}
                      height={50}
                    />
                  </div>
                  <p>{"We're Sad to See You Go!"}</p>
                  <p>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-10 mt-10 w-full">
                <AlertDialogCancel className="w-40 hover:bg-accent1 hover:text-black">
                  Cancel
                </AlertDialogCancel>
                <Button
                  variant={"destructive"}
                  size={"default"}
                  className="w-40"
                >
                  Delete Account
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
