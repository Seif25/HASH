import Home from "@mui/icons-material/Home"
import Search from "@mui/icons-material/Search"
import Favorite from "@mui/icons-material/Favorite"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
// import { Home } from  '@styled-icons/boxicons-solid/Home'


export const sidebarLinks = [
  {
    icon: <Home fontSize="medium" sx={{ color: "#fff" }}/>,
    // icon: <Home className="w-[20px] h-[20px] text-white" size="small"/>,
    route: "/",
    label: "Home",
  },
  {
    icon: <Search fontSize="medium" sx={{ color: "#fff" }} />,
    route: "/search",
    label: "Search",
  },
  {
    icon: <Favorite fontSize="medium" sx={{ color: "#fff" }}/>,
    route: "/activity",
    label: "Activity",
  },
  {
    icon: <AddPhotoAlternateIcon fontSize="medium" sx={{ color: "#fff" }}/>,
    route: "/create-hash",
    label: "Create Hash",
  },
  {
    icon: <PeopleIcon fontSize="medium" sx={{ color: "#fff" }}/>,
    route: "/communities",
    label: "Communities",
  },
  {
    icon: <PersonIcon fontSize="medium" sx={{ color: "#fff" }}/>,
    route: "/profile",
    label: "Profile",
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