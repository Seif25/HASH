"use client";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";
import LinkIcon from '@mui/icons-material/Link';
import ShareIcon from '@mui/icons-material/Share';
import EmailIcon from '@mui/icons-material/Email';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IosShare from "@mui/icons-material/IosShare";


function ShareMenu({ id, authorId }: { id: string; authorId: string }) {
  
  return (
    <div className="w-full flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="rounded-full w-5 h-5 p-3 flex items-center justify-center">
            <IosShare className="text-white" fontSize="small"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full flex flex-col gap-2 p-2">
          <DropdownMenuItem>
            <LinkIcon className="mr-2 h-4 w-4" />
            <span className="">Copy link</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon className="mr-2 h-4 w-4" />
            <span className="">Share post via ...</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EmailIcon className="mr-2 h-4 w-4" />
            <span className="">Send via Direct Message</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookmarkAddIcon className="mr-2 h-4 w-4" />
            <span className="">Bookmark</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ShareMenu;
