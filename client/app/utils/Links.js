import { BadgeCheck, BadgeDollarSign, Bell, Bookmark, Home, LogOut, Mail, Search, Settings, User2, Users2 } from "lucide-react"

export const SheetLinks = [
    {
        icon: <User2 size={24} />,
        title: "Profile",
        link: "/profile/",
        section: 1
    },
    {
        icon: <Bookmark size={24} />,
        title: "Bookmarks",
        link: "/bookmarks/",
        section: 1
    },
    {
        icon: <Users2 size={24} />,
        title: "Communities",
        link: "/communities/",
        section: 1
    },
    {
        icon: <BadgeCheck size={24} className="text-primary" />,
        title: "Premium",
        link: "/premium/",
        section: 1
    },
    {
        icon: <BadgeDollarSign size={24} />,
        title: "Monetization",
        link: "/monetization/",
        section: 1
    },
    {
        icon: <Settings size={24} />,
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
        icon: <Home size={24} />,
        title: "Home",
        link: "/",
        specific: false
    },
    {
        icon: <User2 size={24} />,
        title: "Profile",
        link: "/profile/",
        specific: true
    },
    {
        icon: <Mail size={24} />,
        title: "Messages",
        link: "/messages",
        specific: false
    },
    {
        icon: <Bell size={24} />,
        title: "Notifications",
        link: "/notifications/",
        specific: false
    },
    {
        icon: <Bookmark size={24} />,
        title: "Bookmarks",
        link: "/bookmarks/",
        specific: false
    },
]

export const BottomBarLinks = [
    {
        icon: <Home size={24} />,
        title: "Home",
        link: "/",
        specific: false
    },
    {
        icon: <Bell size={24} />,
        title: "Notifications",
        link: "/notifications/",
        specific: false
    },
    {
        icon: <Search size={24} />,
        title: "Search",
        link: "/search/",
        specific: false
    },
    {
        icon: <Bookmark size={24} />,
        title: "Bookmarks",
        link: "/bookmarks/",
        specific: true
    },
    {
        icon: <Mail size={24} />,
        title: "Messages",
        link: "/messages",
        specific: false
    },
]