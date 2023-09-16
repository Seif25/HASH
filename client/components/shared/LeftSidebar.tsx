import { currentUser } from "@clerk/nextjs";
import NavigationContent from "./NavigationContent";
async function LeftSidebar() {
  const user = await currentUser();
  return (
    <NavigationContent username={user?.username ?? ""} type="left" />
  );
}

export default LeftSidebar;
