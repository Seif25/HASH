"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import BlockIcon from '@mui/icons-material/Block';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FlagIcon from '@mui/icons-material/Flag';
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function ViewerMoreMenu({ id, authorId, username }: { id: string; authorId: string; username: string }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="rounded-full">
            <MoreVertIcon className="text-[#CBCCFF]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 flex flex-col gap-2 p-2">
          <DropdownMenuItem>
            <SentimentVeryDissatisfiedIcon className="mr-2 h-4 w-4" />
            <span className="">Not interested in this post</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PersonAddAlt1Icon className="mr-2 h-4 w-4" />
            <span className="">Follow @{username}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <VolumeOffIcon className="mr-2 h-4 w-4" />
            <span className="">Mute @{username}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <VolumeOffIcon className="mr-2 h-4 w-4" />
            <span className="">Mute conversation</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BlockIcon className="mr-2 h-4 w-4" />
            <span className="">Block @{username}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FlagIcon className="mr-2 h-4 w-4" />
            <span className="">Report post</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CommentsDisabledIcon className="mr-2 h-4 w-4" />
            <span className="">View hidden replies</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ViewerMoreMenu;
