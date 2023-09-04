import Home from "@mui/icons-material/Home"
import Search from "@mui/icons-material/Search"
import Favorite from "@mui/icons-material/Favorite"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';

export const sidebarLinks = [
  {
    icon: <Home fontSize="medium" sx={{ color: "white" }}/>,
    route: "/",
    label: "Home",
  },
  {
    icon: <Search fontSize="medium" sx={{ color: "white" }}/>,
    route: "/search",
    label: "Search",
  },
  {
    icon: <Favorite fontSize="medium" sx={{ color: "white" }}/>,
    route: "/activity",
    label: "Activity",
  },
  {
    icon: <AddPhotoAlternateIcon fontSize="medium" sx={{ color: "white" }}/>,
    route: "/create-hash",
    label: "Create Hash",
  },
  {
    icon: <PeopleIcon fontSize="medium" sx={{ color: "white" }}/>,
    route: "/communities",
    label: "Communities",
  },
  {
    icon: <PersonIcon fontSize="medium" sx={{ color: "white" }}/>,
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
