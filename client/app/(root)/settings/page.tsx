import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 mt-5 w-full h-full bg-accent2 rounded-lg">
      <div className="col-span-1 lg:col-span-2 bg-accent2 lg:bg-accent1/10 h-full rounded-lg lg:rounded-l-2xl lg:rounded-r-none w-full p-5">
        <div className="flex flex-col gap-5 justify-center">
          {settings.map((setting) => (
            <Link href={`/settings/${setting.href}`}>
              <div
                key={setting.title}
                className={`flex items-center justify-between p-5 bg-transparent
                 hover:bg-primary rounded-lg text-accent1 cursor-pointer`}
              >
                <h3 className="text-body">{setting.title}</h3>
                <ChevronRight size={20} className="text-accent1/30" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const settings = [
  {
    title: "Your Account",
    href: "account-settings",
  },
  {
    title: "Monetization",
    href: "monetization",
  },
  {
    title: "Premium",
    href: "premium",
  },
  {
    title: "Creator Subscriptions",
    href: "creator-subscriptions",
  },
  {
    title: "Security",
    href: "security",
  },
  {
    title: "Privacy & Safety",
    href: "privacy-safety",
  },
  {
    title: "Notifications",
    href: "notifications",
  },
  {
    title: "Content Preferences",
    href: "content-preferences",
  },
  {
    title: "Additional Services",
    href: "additional-services",
  },
];
