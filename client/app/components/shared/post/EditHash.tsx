"use client";

import {
  editHashAction,
  fetchHashByIdAction,
} from "@/app/lib/actions/hash/hash.actions";
import { HashType, MediaType } from "@/app/lib/types/hash.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageIcon, Loader2, MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import EmojiBtn from "../triggers/EmojiBtn";
import Image from "next/image";
import HashVideoPreview from "../../home/HashVideoPreview";

interface EditHashProps {
  loggedInUser: string;
  hashId: string;
  hashMedia: MediaType[];
  hashText: string;
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void;
  pathname: string;
}

export default function EditHash({
  loggedInUser,
  hashMedia,
  hashText,
  hashId,
  openEdit,
  setOpenEdit,
  pathname,
}: EditHashProps) {
  const [text, setText] = useState<string>("");
  const [markedMedia, setMarkedMedia] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function handleMarkMedia(id: string) {
    if (markedMedia.includes(id)) {
      const filteredMedia = markedMedia.filter((media) => media !== id);
      setMarkedMedia(filteredMedia);
    } else {
      setMarkedMedia([...markedMedia, id]);
    }
  }

  async function editHash() {
    setLoading(true);
    const editedText = text.length > 0 ? text : hashText;
    let editedMedia: MediaType[] = [];
    if (markedMedia.length > 0) {
      editedMedia = hashMedia.filter(
        (media) => !markedMedia.includes(media.id)
      );
    } else {
      editedMedia = hashMedia;
    }
    await editHashAction({
      hashId,
      text: editedText,
      media: editedMedia,
      pathname,
    });
    setLoading(false);
    setOpenEdit(false);
  }

  return (
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Hash</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl flex justify-between bg-accent2 px-2">
            <textarea
              id="edit-post-field"
              rows={2}
              placeholder={hashText}
              defaultValue={hashText}
              value={text}
              autoFocus
              className="w-[80%] resize-none bg-accent2 outline-none ring-0 border-none rounded-2xl text-accent1 p-2"
              onChange={handleOnChange}
            />
            <div className="flex items-center gap-3 px-5">
              <EmojiBtn setMessage={setText} />
              <Button
                variant={"icon"}
                size={"icon"}
                // onClick={triggerUpload}
              >
                <ImageIcon
                  size={"20px"}
                  className="text-accent1 hover:text-primary"
                />
              </Button>
              {/* <input
              type="file"
              name="media-upload"
              id="media-upload"
              ref={inputFileRef}
              accept="image/*,video/*"
              multiple
              hidden
            /> */}
            </div>
          </div>
          {hashMedia.length > 0 && (
            <div className="grid grid-cols-2 gap-5">
              {hashMedia.map((media) => (
                <div
                  key={media.id}
                  className="relative flex items-center justify-center rounded-2xl"
                >
                  {media.mediaType === "image" ? (
                    <Image
                      src={media.url}
                      alt={media.alt}
                      width={200}
                      height={200}
                      className={`
                        rounded-2xl w-full h-40 object-cover ${
                          markedMedia.includes(media.id)
                            ? "filter brightness-50"
                            : ""
                        }
                      `}
                    />
                  ) : (
                    <HashVideoPreview src={media.url} autoplay={true} />
                  )}
                  <Button
                    variant={"icon"}
                    size={"icon"}
                    className={`
                    absolute top-2 right-2 ${
                      markedMedia.includes(media.id)
                        ? "text-accent1/50"
                        : "text-red-500"
                    } opacity-75 hover:opacity-100
                    `}
                    onClick={() => handleMarkMedia(media.id)}
                  >
                    {markedMedia.includes(media.id) ? (
                      <PlusCircle size={"20px"} />
                    ) : (
                      <MinusCircle size={"20px"} />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant={"default"}
            size={"default"}
            className="hover:bg-primary disabled:bg-accent1/5 disabled:hover:bg-accent1/20"
            onClick={editHash}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
