"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <footer className="footer">
      <div className="footer-container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`${
                isActive ? "footer-active-link" : "footer-link"
              }`}
            >
              {link.icon}

              <p className="max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;
