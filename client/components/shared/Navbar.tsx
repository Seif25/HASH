import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";

async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="navbar">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/LogoName.png" alt="Hash Logo" width={128} height={128} className="object-cover"/>
      </Link>
      <div className="flex items-center gap-2 p-2 rounded-full hover:bg-[#00AE9C] hover:bg-opacity-10">
        <UserButton
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
          userProfileMode="modal"
        />
        {user && (
          <p className="text-light-1">{user.username}</p>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
