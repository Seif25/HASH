import { BadgeCheck, BadgeDollarSign, Bell, Bookmark, Home, LogOut, Mail, Settings, User2, Users2 } from "lucide-react"

export const SheetLinks = [
    {
        icon: <User2 size={"24px"} />,
        title: "Profile",
        link: "/profile/",
        section: 1
    },
    {
        icon: <Bookmark size={"24px"} />,
        title: "Bookmarks",
        link: "/bookmarks/",
        section: 1
    },
    {
        icon: <Users2 size={"24px"} />,
        title: "Communities",
        link: "/communities/",
        section: 1
    },
    {
        icon: <BadgeCheck size={"24px"} className="text-primary" />,
        title: "Premium",
        link: "/premium/",
        section: 1
    },
    {
        icon: <BadgeDollarSign size={"24px"} />,
        title: "Monetization",
        link: "/monetization/",
        section: 1
    },
    {
        icon: <Settings size={"24px"} />,
        title: "Settings",
        link: "/settings",
        section: 2
    },
    {
        icon: <LogOut size={"24px"} />,
        title: "Logout",
        link: "/logout",
        section: 2
    },
]

export const LeftSidebarLinks = [
    {
        icon: <Home size={"24px"} />,
        title: "Home",
        link: "/",
        specific: false
    },
    {
        icon: <User2 size={"24px"} />,
        title: "Profile",
        link: "/profile/",
        specific: true
    },
    {
        icon: <Mail size={"24px"} />,
        title: "Messages",
        link: "/messages/",
        specific: true
    },
    {
        icon: <Bell size={"24px"} />,
        title: "Notifications",
        link: "/notifications/",
        specific: true
    },
    {
        icon: <Bookmark size={"24px"} />,
        title: "Bookmarks",
        link: "/bookmarks/",
        specific: true
    },
]