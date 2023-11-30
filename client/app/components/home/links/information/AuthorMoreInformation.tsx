import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  changeRestrictionAction,
  deleteHashAction,
  highlightHashAction,
  pinHashAction,
  unhighlightHashAction,
  unpinHashAction,
} from "@/app/lib/actions/hash/hash.actions";
import {
  BarChart2,
  Globe2,
  Loader2,
  MessageCircle,
  Pin,
  PinOff,
  Sparkles,
  Trash2,
  UserCheck2,
  UserPlus2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { usePathname } from "next/navigation";
import { useState } from "react";

interface AuthorMoreInformationProps {
  hashId: string;
  pinned: boolean;
  highlighted: boolean;
  restriction: "everyone" | "followers only" | "followed by me";
  closeDropdown: (value: boolean) => void;
}

export default function AuthorMoreInformation({
  hashId,
  pinned,
  highlighted,
  restriction,
  closeDropdown,
}: AuthorMoreInformationProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [whoCanReply, changeRestriction] = useState<
    "everyone" | "followers only" | "followed by me"
  >(restriction);
  const [loading, setLoading] = useState<boolean>(false);

  function handlePinHash() {
    if (pinned) {
      unpinHashAction({ hashId, pathname });
    } else {
      pinHashAction({ hashId, pathname });
    }
  }

  function handleHighlightHash() {
    if (highlighted) {
      unhighlightHashAction({ hashId, pathname });
    } else {
      highlightHashAction({ hashId, pathname });
    }
  }

  function handleOpenDialog(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setOpen(true);
  }

  function handleRestrictionChange(value: typeof restriction) {
    changeRestriction(value);
  }

  function saveRestriction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    changeRestrictionAction({ hashId, restriction: whoCanReply, pathname });
    setLoading(false);
    setOpen(false);
    // closeDropdown(false);
  }
  return (
    <DropdownMenuContent>
      {/* Delete Hash */}
      <DropdownMenuItem
        className="flex items-center gap-5 text-red-500 cursor-pointer"
        onClick={() => deleteHashAction({ hashId, pathname })}
      >
        <Trash2 size={"20px"} className="mr-2" />
        <span>Delete Hash</span>
      </DropdownMenuItem>
      {/* Pin Hash */}
      <DropdownMenuItem
        className="flex items-center gap-5 text-accent1 cursor-pointer"
        onClick={handlePinHash}
      >
        {!pinned ? (
          <Pin size={"20px"} className="mr-2" />
        ) : (
          <PinOff size={"20px"} className="mr-2 text-primary" />
        )}
        <span>
          {!pinned
            ? "Pin Hash to your Profile"
            : "Unpin Hash from your profile"}
        </span>
      </DropdownMenuItem>
      {/* Highlight Hash */}
      <DropdownMenuItem
        className="flex items-center gap-5 text-accent1 cursor-pointer"
        onClick={handleHighlightHash}
      >
        {!highlighted ? (
          <Sparkles size={"20px"} className="mr-2" />
        ) : (
          <Sparkles size={"20px"} className="mr-2 text-primary" />
        )}
        <span>
          {!highlighted
            ? "Highlight Hash on your Profile"
            : "Unhighlight Hash from your Profile"}
        </span>
      </DropdownMenuItem>
      {/* Change Who can Reply */}
      <DropdownMenuItem
        className="flex items-center gap-5 text-accent1 cursor-pointer"
        onClick={handleOpenDialog}
      >
        {whoCanReply === "everyone" ? (
          <Globe2 size={"20px"} className="mr-2 text-primary" />
        ) : whoCanReply === "followers only" ? (
          <UserPlus2 size={"20px"} className="mr-2 text-primary" />
        ) : whoCanReply === "followed by me" ? (
          <UserCheck2 size={"20px"} className="mr-2 text-primary" />
        ) : (
          <MessageCircle size={"20px"} className="mr-2" />
        )}
        <span className="flex flex-col gap-1">
          Change Who can Reply
          <span className="text-paragraph text-primary text-[12px]">
            {whoCanReply === "everyone" ? (
              <span className="flex items-center gap-1">Everyone</span>
            ) : whoCanReply === "followers only" ? (
              <span className="flex items-center gap-1">
                Only Your Followers Can Reply
              </span>
            ) : whoCanReply === "followed by me" ? (
              <span className="flex items-center gap-1">
                Only People You Follow Can Reply
              </span>
            ) : (
              ""
            )}
          </span>
        </span>
      </DropdownMenuItem>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Who can Reply</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <RadioGroup
              defaultValue={restriction}
              onValueChange={(value) =>
                handleRestrictionChange(value as typeof restriction)
              }
            >
              {/* Everyone can reply */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="everyone"
                  id="everyone"
                  // onClick={handleRestrictionChange}
                />
                <Label
                  htmlFor="everyone"
                  className={`flex items-center gap-1 ${
                    whoCanReply === "everyone" ? "text-primary" : "text-accent1"
                  }`}
                >
                  <Globe2 size={"20px"} />
                  <span>Everyone Can Reply</span>
                </Label>
              </div>
              {/* Author's followers only */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="followers only"
                  id="followers only"
                  // onClick={handleRestrictionChange}
                />
                <Label
                  htmlFor="followers only"
                  className={`flex items-center gap-1 ${
                    whoCanReply === "followers only"
                      ? "text-primary"
                      : "text-accent1"
                  }`}
                >
                  <UserPlus2 size={"20px"} />
                  <span>Only Your Followers Can Reply</span>
                </Label>
              </div>
              {/* People the Author is following */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="followed by me"
                  id="followed by me"
                  // onClick={handleRestrictionChange}
                />
                <Label
                  htmlFor="followed by me"
                  className={`flex items-center gap-1 ${
                    whoCanReply === "followed by me"
                      ? "text-primary"
                      : "text-accent1"
                  }`}
                >
                  <UserCheck2 size={"20px"} />
                  <span>Only People You Follow Can Reply</span>
                </Label>
              </div>
            </RadioGroup>
            <button className="btn w-40 h-auto" onClick={saveRestriction}>
              {loading ? (
                <Loader2 className="text-accent1 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {/* View Post Analytics */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent1 cursor-pointer">
        <BarChart2 size={"20px"} className="mr-2" />
        <span>View Hash Analytics</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
