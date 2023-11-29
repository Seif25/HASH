"use client";

import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import HashVideoPlayer from "./HashVideoPlayer";
import {
  VideoDialog,
  VideoDialogContent,
  VideoDialogTrigger,
} from "../shared/dialog";

export default function HashVideoPreview({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [muted, setMuted] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [initialVolume, setInitialVolume] = useState(0);
  const [progress, setProgress] = useState<number | undefined>();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", () => {
        setDuration(videoRef.current?.currentTime);
      });
    }
  }, [videoRef.current]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = progress ?? 0;
      setDuration(progress);
    }
  }, [progress]);

  function toggleMute() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  }

  function formatDuration(duration: number | undefined) {
    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2,
    });
    if (duration) {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor(duration / 60) % 60;
      const seconds = Math.floor(duration) % 60;
      if (hours > 0) {
        return `${hours}:${leadingZeroFormatter.format(minutes)}:${seconds}`;
      }
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    }
  }

  function handleFullScreenChange() {
    if (!muted) {
      setMuted(true);
      setInitialVolume(1);
    } else {
      setInitialVolume(0);
    }
    setFullScreen(!fullScreen);
  }

  return (
    <div
      id="video-container"
      className={`w-[90%] max-w-5xl flex justify-center video-container relative`}
    >
      <div
        id="video-controls-container"
        className={`absolute bottom-0 left-0 right-0 text-accent1 z-50 transition-all hover:opacity-100 focus-within:opacity-100 before:bg-gradient-to-t before:from-black before:rounded-b-2xl before:to-transparent before:absolute before:z-[-1] before:w-full before:bottom-0 before:aspect-[6/1]`}
      >
        <div id="controls" className="flex items-center gap-2 p-5">
          <div className="flex items-center gap-1 flex-grow">
            <p className="bg-accent2/50 rounded-md video-duration w-auto max-w-20 flex items-center justify-center h-5 p-1">
              {formatDuration(duration)}
            </p>
          </div>
          <div className="flex items-center gap-1 group">
            <Button
              size={"icon"}
              variant={"icon"}
              className="hover:text-primary bg-accent2/50 w-5 h-5 p-1 rounded-md opacity-80 transition-all hover:opacity-100"
              onClick={toggleMute}
            >
              {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </Button>
          </div>
        </div>
      </div>
      <VideoDialog open={fullScreen} onOpenChange={setFullScreen}>
        <VideoDialogTrigger onClick={handleFullScreenChange}>
          <video
            src={src}
            className="w-full z-10 rounded-2xl"
            ref={videoRef}
            muted={muted}
            loop
            autoPlay
          ></video>
        </VideoDialogTrigger>
        <VideoDialogContent className="w-[100vw] h-[100vh]">
          <HashVideoPlayer
            src={src}
            fullScreen={fullScreen}
            initialTime={videoRef.current?.currentTime}
            initialVolume={initialVolume}
            closeFullScreen={setFullScreen}
            changeFullScreenDuration={setProgress}
          />
        </VideoDialogContent>
      </VideoDialog>
    </div>
  );
}
