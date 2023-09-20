import { currentUser } from "@clerk/nextjs";
import NavigationContent from "./NavigationContent";

export default async function Footer() {
  const user = await currentUser();
  return (
    <footer className="footer z-50">
      <NavigationContent username={user?.username ?? ""} type="bottom" />
    </footer>
  );
}
