import {
  Globe2,
  Loader2,
  MoreVertical,
  UserCheck2,
  UserPlus2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SummarizedUserType } from "@/app/lib/types/user.types";
import ViewerMoreInformation from "./information/ViewerMoreInformation";
import AuthorMoreInformation from "./information/AuthorMoreInformation";
import { useState } from "react";
import { MediaType } from "@/app/lib/types/hash.types";
import {
  changeRestrictionAction,
  deleteHashAction,
} from "@/app/lib/actions/hash/hash.actions";
import { usePathname } from "next/navigation";
import EditHash from "../../shared/post/EditHash";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface InformationBtnProps {
  loggedInUser: string;
  hashAuthor: SummarizedUserType;
  hashId: string;
  pinned: boolean;
  highlighted: boolean;
  restriction: "everyone" | "followers only" | "followed by me";
  hashMedia: MediaType[];
  hashText: string;
}

export default function InformationBtn({
  loggedInUser,
  hashAuthor,
  hashId,
  pinned,
  highlighted,
  restriction,
  hashMedia,
  hashText,
}: InformationBtnProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [openRestriction, setOpenRestriction] = useState<boolean>(false);
  const [whoCanReply, changeRestriction] = useState<
    "everyone" | "followers only" | "followed by me"
  >(restriction);
  const [loading, setLoading] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  function handleOpenDialog() {
    setOpenRestriction(true);
    setOpen(false);
  }

  function handleOpenEditDialog() {
    setOpenEdit(true);
    setOpen(false);
  }

  function handleOpenDeleteDialog() {
    setOpenDeleteDialog(true);
    setOpen(false);
  }

  function handleRestrictionChange(value: typeof restriction) {
    changeRestriction(value);
  }

  async function saveRestriction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    await changeRestrictionAction({
      hashId,
      restriction: whoCanReply,
      pathname,
    });
    setLoading(false);
    setOpenRestriction(false);
  }
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <div className="group">
              <DropdownMenuTrigger>
                <TooltipTrigger>
                  <MoreVertical className="size-4 text-accent2 dark:text-accent1 group-hover:text-primary" />
                </TooltipTrigger>
              </DropdownMenuTrigger>
            </div>
            {loggedInUser !== hashAuthor.username ? (
              <ViewerMoreInformation
                loggedInUser={loggedInUser}
                hashAuthor={hashAuthor}
              />
            ) : (
              <AuthorMoreInformation
                hashId={hashId}
                pinned={pinned}
                highlighted={highlighted}
                closeDropdown={setOpen}
                whoCanReply={whoCanReply}
                handleOpenDialog={handleOpenDialog}
                handleOpenEditDialog={handleOpenEditDialog}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
              />
            )}
          </DropdownMenu>
          <TooltipContent>
            <p>More</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* Confirm Delete Dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <Button
                variant={"destructive"}
                size={"default"}
                onClick={() => deleteHashAction({ hashId, pathname })}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Edit Hash Dialog */}
      <EditHash
        hashId={hashId}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        loggedInUser={loggedInUser}
        hashMedia={hashMedia}
        hashText={hashText}
        pathname={pathname}
      />
      {/* Restrictions Dialog */}
      <Dialog open={openRestriction} onOpenChange={setOpenRestriction}>
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
                    whoCanReply === "everyone"
                      ? "text-primary"
                      : "text-accent2 dark:text-accent1"
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
                      : "text-accent2 dark:text-accent1"
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
                      : "text-accent2 dark:text-accent1"
                  }`}
                >
                  <UserCheck2 size={"20px"} />
                  <span>Only People You Follow Can Reply</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button
              variant={"default"}
              size={"default"}
              className="hover:bg-primary"
              onClick={saveRestriction}
            >
              {loading ? (
                <Loader2 className="text-accent2 dark:text-accent1 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
