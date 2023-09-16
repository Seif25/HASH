"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "../ui/button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import { deleteHash } from "@/lib/actions/hash.actions";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function AuthMoreMenu({ hashId, currentUser }: { hashId: string; currentUser: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await deleteHash(hashId);

    setLoading(false)
    router.refresh();
  };

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="rounded-full w-5 h-5 p-3 flex items-center justify-center">
            <MoreVertIcon className="text-white" fontSize="small"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full flex flex-col gap-2 p-2">
          <AlertDialog>
            <AlertDialogTrigger className="w-full flex items-center justify-start px-2 pt-2">
              <DeleteIcon className="mr-2 h-4 w-4 text-red-600" />
              <span className="text-red-600">Delete</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-light-2 font-extrabold">
                  Are you sure you wan to delete this post?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="text-red-600 bg-black-2 border border-light-2 hover:bg-red-600 hover:text-light-2"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DropdownMenuItem>
            <PushPinIcon className="mr-2 h-4 w-4" />
            <span className="">Pin to your profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AutoAwesomeIcon className="mr-2 h-4 w-4" />
            <span className="">Highlight on your profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <VolumeOffIcon className="mr-2 h-4 w-4" />
            <span className="">Mute conversation</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ChatBubbleOutlineIcon className="mr-2 h-4 w-4" />
            <span className="">Change who can reply</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BarChartIcon className="mr-2 h-4 w-4" />
            <span className="">View post analytics</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CommentsDisabledIcon className="mr-2 h-4 w-4" />
            <span className="">View hidden replies</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default AuthMoreMenu;
