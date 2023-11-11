import { Feather } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingButton() {
  return (
    <Button
      size={"icon"}
      variant={"icon"}
      className="bg-primary fixed bottom-20 right-5 z-20 hover:z-30 hover:scale-110 transition-all md:hidden"
    >
      <Feather />
    </Button>
  );
}
