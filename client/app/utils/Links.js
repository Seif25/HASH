import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { BookmarkIcon } from "@heroicons/react/20/solid"
import { BanknotesIcon } from "@heroicons/react/20/solid"
import { Cog6ToothIcon } from "@heroicons/react/20/solid"
import { UserGroupIcon } from "@heroicons/react/20/solid"
import { UserIcon } from "@heroicons/react/20/solid"

import { HomeIcon } from "@heroicons/react/20/solid"
import { EnvelopeIcon } from "@heroicons/react/20/solid"
import { BellIcon } from "@heroicons/react/20/solid"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"


export const SheetLinks = [
    {
        icon: <UserIcon className="size-4" />,
        title: "Profile",
        link: "/profile/",
        section: 1
    },
    {
        icon: <BookmarkIcon className="size-4" />,
        title: "Bookmarks",
        link: "/bookmarks/",
        section: 1
    },
    {
        icon: <UserGroupIcon className="size-4" />,
        title: "Communities",
        link: "/communities/",
        section: 1
    },
    {
        icon: <CheckBadgeIcon className="size-4 text-primary" />,
        title: "Premium",
        link: "/premium/",
        section: 1
    },
    {
        icon: <BanknotesIcon className="size-4" />,
        title: "Monetization",
        link: "/monetization/",
        section: 1
    },
    {
        icon: <Cog6ToothIcon className="size-4" />,
        title: "Settings",
        link: "/settings/account-settings",
        section: 2
    },
    // {
    //     icon: <LogOut size={24} />,
    //     title: "Logout",
    //     link: "/logout",
    //     section: 2
    // },
]

export const LeftSidebarLinks = [
    {
        icon: <HomeIcon className="size-4" />,
        title: "Home",
        link: "/",
        specific: false
    },
    {
        icon: <UserIcon className="size-4" />,
        title: "Profile",
        link: "/profile/",
        specific: true
    },
    {
        icon: <EnvelopeIcon className="size-4" />,
        title: "Messages",
        link: "/messages",
        specific: false
    },
    {
        icon: <BellIcon className="size-4" />,
        title: "Notifications",
        link: "/notifications/",
        specific: false
    },
    {
        icon: <BookmarkIcon className="size-4" />,
        title: "Bookmarks",
        link: "/bookmarks/",
        specific: false
    },
]

export const BottomBarLinks = [
    {
        icon: <HomeIcon className="size-5" />,
        title: "Home",
        link: "/",
        specific: false
    },
    {
        icon: <BellIcon className="size-5" />,
        title: "Notifications",
        link: "/notifications/",
        specific: false
    },
    {
        icon: <MagnifyingGlassIcon className="size-5" />,
        title: "Search",
        link: "/search/",
        specific: false
    },
    {
        icon: <BookmarkIcon className="size-5" />,
        title: "Bookmarks",
        link: "/bookmarks/",
        specific: true
    },
    {
        icon: <EnvelopeIcon className="size-5" />,
        title: "Messages",
        link: "/messages",
        specific: false
    },
]