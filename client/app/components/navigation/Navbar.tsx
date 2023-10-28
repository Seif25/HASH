import Image from "next/image";
import ProfileSheet from "./ProfileSheet";
import { UserType } from "@/lib/types/user.types";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BellIcon, SearchIcon } from "lucide-react";
const Search = dynamic(() => import("./Search"), { ssr: false });

interface NavbarProps {
  loggedUser: UserType;
}

export default function Navbar({ loggedUser }: NavbarProps) {
  return (
    <nav id="navbar" className="navbar">
      <div className="w-1/3 px-2">
        <ProfileSheet
          username={loggedUser.username}
          profilePicture={loggedUser.image}
          name={loggedUser.name}
          following={loggedUser.following.length}
          followers={loggedUser.followers.length}
          verified={loggedUser.verified}
        />
      </div>
      <div className="w-1/3 flex items-center justify-center">
        <Link href={"/"}>
          <Image src={"/LogoName.png"} alt="HASH" width={128} height={128} />
        </Link>
      </div>
      <div className="hidden lg:flex w-1/3">
        <Search />
      </div>
      <div className="flex lg:hidden items-center justify-end gap-5 w-1/3">
        <Link href={"/search"}>
          <BellIcon size={"24px"} className="text-accent1" />
        </Link>
        <Link href={"/search"}>
          <SearchIcon size={"24px"} className="text-accent1" />
        </Link>
      </div>
    </nav>
  );
}
