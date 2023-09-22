import {
  UserButton,
  currentUser,
  SignedIn,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getUserInformation } from "@/lib/actions/user.actions";
import { Separator } from "../ui/separator";
import Logout from "./profile/Logout";

async function Navbar() {
  const user = await currentUser();
  const dbUser = await getUserInformation(user?.username ?? "");
  return (
    <nav className="navbar">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/LogoName.png"
          alt="Hash Logo"
          width={128}
          height={128}
          className="object-cover"
        />
      </Link>
      <SignedIn>
        {dbUser && (
          <Sheet>
            <SheetTrigger className="flex items-center justify-center">
              <Image
                src={dbUser.image ?? "/assets/profile-pic.png"}
                alt={dbUser.username}
                width={48}
                height={48}
                className="rounded-full cursor-pointer"
                priority
              />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex flex-col justify-start items-start pt-5">
                  <Link href={`/profile/${dbUser.username}`}>
                    <Image
                      src={dbUser.image ?? "/assets/profile-pic.png"}
                      alt={dbUser.username}
                      width={32}
                      height={32}
                      className="rounded-full cursor-pointer"
                      priority
                    />
                  </Link>
                  <h3 className="font-bold">{dbUser.name}</h3>
                  <h3 className="font-light text-light-3">
                    @{dbUser.username}
                  </h3>
                  <div className="flex items-center justify-between pt-2 w-full">
                    <h3 className="flex items-center gap-1 font-light">
                      <h3 className="font-bold">
                        {dbUser.following?.length ?? 0}
                      </h3>
                      Following
                    </h3>
                    <h3 className="flex items-center gap-1 font-light">
                      <h3 className="font-bold">
                        {dbUser.followers?.length ?? 0}
                      </h3>
                      Followers
                    </h3>
                  </div>
                  <Separator className="bg-zinc-600 my-2" />
                </SheetTitle>
                <SheetDescription className="flex flex-col justify-end items-end h-full">
                  <Logout />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        )}
      </SignedIn>
    </nav>
  );
}

export default Navbar;
