import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Page({ params }: { params: { setting: string } }) {
  const selectedSetting = settings.find((s) => s.href === params.setting);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 mt-5 w-full h-full bg-accent2 rounded-2xl">
      <div className="hidden lg:block col-span-1 lg:col-span-2 bg-accent2 lg:bg-accent1/10 h-full rounded-2xl lg:rounded-l-2xl lg:rounded-r-none w-full p-5">
        <div className="flex flex-col gap-5 justify-center">
          {settings.map((setting) => (
            <Link href={`/settings/${setting.href}`}>
              <div
                key={setting.title}
                className={`flex items-center justify-between p-5 ${
                  params.setting === setting.href
                    ? "bg-primary"
                    : "bg-transparent"
                } hover:bg-primary rounded-2xl text-accent1 cursor-pointer`}
              >
                <h3 className="text-body">{setting.title}</h3>
                <ChevronRight size={20} className="text-accent1/30" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-1 lg:col-span-4 bg-accent2 h-full rounded-2xl w-full">
        <div className="flex flex-col gap-5 justify-center">
          <div className="flex items-center gap-5 p-5 bg-transparent rounded-2xl text-accent1">
            <Link href="/settings" className="lg:hidden">
              <ArrowLeft
                size={20}
                className="text-accent1/75 hover:text-primary"
              />
            </Link>
            <h3 className="text-heading">{selectedSetting?.title}</h3>
          </div>
          <div className="flex flex-col gap-5 px-5">
            {selectedSetting?.options?.map((option) => (
              <Link href={`/settings/${selectedSetting.href}/${option.href}`}>
                <div
                  key={option.title}
                  className={`flex items-center justify-between p-5 bg-transparent
                  hover:bg-primary rounded-2xl text-accent1 cursor-pointer`}
                >
                  <h3 className="text-body">{option.title}</h3>
                  <ChevronRight size={20} className="text-accent1/30" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const settings = [
  {
    title: "Your Account",
    href: "account-settings",
    options: [
      {
        title: "Account Information",
        href: "account-information",
      },
      {
        title: "Change Your Password",
        href: "change-password",
      },
      {
        title: "Download an Archive of your Data",
        href: "download-data",
      },
      {
        title: "Delete Your Account",
        href: "delete-account",
      },
    ],
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
