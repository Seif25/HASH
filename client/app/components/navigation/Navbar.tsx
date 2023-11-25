import Image from "next/image";
import ProfileSheet from "./ProfileSheet";
import { UserType } from "@/app/lib/types/user.types";
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
      <div className="w-1/2 lg:w-1/3 px-2 flex items-center justify-start">
        <ProfileSheet
          username={loggedUser.username}
          profilePicture={loggedUser.image}
          name={loggedUser.name}
          following={loggedUser.following.length}
          followers={loggedUser.followers.length}
          verified={loggedUser.verified}
        />
      </div>
      <div className="w-1/2 lg:w-1/3 flex items-center justify-start lg:justify-center">
        <Link href={"/"} className="hidden lg:flex">
          <Image src={"/LogoName.png"} alt="HASH" width={128} height={128} />
        </Link>
        <Link href={"/"} className="lg:hidden">
          <Image src={"/logo.png"} alt="HASH" width={48} height={48} />
        </Link>
      </div>
      <div className="hidden lg:flex w-1/3 justify-end items-center">
        <Search />
      </div>
    </nav>
  );
}
