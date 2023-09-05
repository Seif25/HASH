import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";

async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="navbar">
      <div className="lg:hidden text-black">Hash</div>

      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo_t.png" alt="Hash Logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 hidden lg:block">Hash</p>
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
