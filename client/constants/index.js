import Favorite from "@mui/icons-material/Favorite"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PeopleIcon from '@mui/icons-material/People';
import { Activity, Hash, Home, Search, Users2 } from "lucide-react";

export const sidebarLinks = [
  {
    // icon: <Home fontSize="medium" sx={{ color: "#fff" }}/>,
    icon: <Home />,
    route: "/",
    label: "Home",
  },
  {
    icon: <Search />,
    route: "/search",
    label: "Search",
  },
  {
    icon: <Activity />,
    route: "/activity",
    label: "Activity",
  },
  {
    icon: <Hash />,
    route: "/create-hash",
    label: "Create Hash",
  },
  {
    icon: <Users2 />,
    route: "/communities",
    label: "Communities",
  },
];

export const profileTabs = [
  { value: "hashes", label: "Hashes", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "hashes", label: "Hashes", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];

export const generateYears = () => {
  const years = [];
  for (let i = new Date().getFullYear(); i >= new Date().getFullYear()-60; i--) {
    years.push(new Date(`1/1/${i}`));
  }
  return years;
}

export const getMonths = [{ value: 1, label: "January" }, { value: 2, label: "February" }, { value: 3, label: "March" }, { value: 4, label: "April" }, { value: 5, label: "May" }, { value: 6, label: "June" }, { value: 7, label: "July" }, { value: 8, label: "August" }, { value: 9, label: "September" }, { value: 10, label: "October" }, { value: 11, label: "November" }, { value: 12, label: "December"}]