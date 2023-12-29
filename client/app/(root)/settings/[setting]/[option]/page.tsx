import { ChevronRight } from "lucide-react";
import Link from "next/link";
import AccountInformationSettings from "../../components/AccountInformationSettings";
import { currentUser } from "@clerk/nextjs";
import { fetchUserAction } from "@/app/lib/actions/user/user.actions";
import ChangePassword from "../../components/ChangePassword";
import DownloadData from "../../components/DownloadData";
import DeleteAccount from "../../components/DeleteAccount";

export default async function Page({
  params,
}: {
  params: { setting: string; option: string };
}) {
  const user = await currentUser();
  const loggedInUser = await fetchUserAction(user?.username ?? "");

  const views = [
    {
      href: "account-information",
      component: (
        <AccountInformationSettings
          loggedInUser={loggedInUser}
          firstName={user?.firstName ?? ""}
          lastName={user?.lastName ?? ""}
          email={user?.emailAddresses[0].emailAddress ?? ""}
          phone={user?.phoneNumbers[0]?.phoneNumber ?? ""}
        />
      ),
    },
    {
      href: "change-password",
      component: <ChangePassword />,
    },
    {
      href: "download-data",
      component: <DownloadData />,
    },
    {
      href: "delete-account",
      component: <DeleteAccount />,
    },
  ];

  const selectedOption = views?.find((v) => v.href === params.option);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 mt-5 w-full h-full bg-accent2 rounded-lg">
      <div className="hidden lg:block col-span-1 lg:col-span-2 bg-accent2 lg:bg-accent1/10 h-full rounded-lg lg:rounded-l-2xl lg:rounded-r-none w-full p-5">
        <div className="flex flex-col gap-5 justify-center">
          {settings.map((setting) => (
            <Link href={`/settings/${setting.href}`} key={setting.title}>
              <div
                key={setting.title}
                className={`flex items-center justify-between p-5 ${
                  params.setting === setting.href
                    ? "bg-primary"
                    : "bg-transparent"
                } hover:bg-primary rounded-lg text-accent1 cursor-pointer`}
              >
                <h3 className="text-body">{setting.title}</h3>
                <ChevronRight size={20} className="text-accent1/30" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-1 lg:col-span-4 bg-accent2 h-full rounded-lg w-full">
        <div className="flex flex-col gap-5 justify-center">
          {selectedOption?.component}
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
