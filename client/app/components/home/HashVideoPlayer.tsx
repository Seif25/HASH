"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Maximize,
  Minimize,
  Pause,
  PictureInPicture2,
  Play,
  Settings,
  Subtitles,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HashVideoPlayerProps {
  src: string;
  captionSrc?: string;
  srcLang?: string;
}

export default function HashVideoPlayer({
  src,
  srcLang,
  captionSrc,
}: HashVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [volumeState, setVolumeState] = useState<"muted" | "low" | "high">(
    "muted"
  );
  const [volume, setVolume] = useState<number>(0);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [totalDuration, setTotalDuration] = useState<number | undefined>();
  const [timelineValue, setTimelineValue] = useState<number | undefined>(0);

  function PlayPause() {
    if (videoRef.current) {
      if (paused) {
        videoRef.current.play();
        setPaused(false);
      } else {
        videoRef.current.pause();
        setPaused(true);
      }
    }
  }

  function togglePIP() {
    if (document.pictureInPictureElement === null) {
      videoRef.current?.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  }

  function toggleFullScreen() {
    if (!fullScreen) {
      setFullScreen(true);
      videoRef.current?.requestFullscreen();
    } else {
      setFullScreen(false);
      videoRef.current?.ownerDocument.exitFullscreen();
    }
  }

  function handleVolumeChange(value: number[]) {
    videoRef.current!.volume = value[0];
    videoRef.current!.muted = value[0] === 0;
    setVolume(value[0]);
  }

  function handleMute() {
    videoRef.current!.muted = !videoRef.current?.muted;
    if (videoRef.current?.muted) {
      setVolume(0);
    } else {
      setVolume(videoRef.current?.volume ?? 0);
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current?.addEventListener("play", () => {
        setPaused(false);
      });
      videoRef.current?.addEventListener("pause", () => {
        setPaused(true);
      });

      videoRef.current?.addEventListener("loadedmetadata", () => {
        setTotalDuration(videoRef.current?.duration);
      });

      videoRef.current?.addEventListener("timeupdate", () => {
        const percentage =
          ((videoRef.current?.currentTime ?? 0) /
            (videoRef.current?.duration ?? 1)) *
          100;
        setTimelineValue(percentage);
        setDuration(videoRef.current?.currentTime);
      });

      videoRef.current?.addEventListener("volumechange", () => {
        setVolume(videoRef.current?.volume ?? 0);
        if (videoRef.current?.muted) {
          setVolumeState("muted");
        } else {
          if (videoRef.current?.volume) {
            if (videoRef.current?.volume <= 0.5) {
              setVolumeState("low");
            } else {
              setVolumeState("high");
            }
          }
        }
      });
    }
  }, [videoRef.current]);

  function handleKeyBoardShortcuts(e: React.KeyboardEvent<HTMLDivElement>) {
    switch (e.key.toLowerCase()) {
      case "Spacebar":
        PlayPause();
        break;
    }
  }

  function handleTimelineSkim(value: number[]) {
    setTimelineValue(value[0]);
    videoRef.current!.currentTime =
      value[0] * (videoRef.current?.duration ?? 1);
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

  return (
    <div
      id="video-container"
      className={`w-[90%] max-w-5xl flex justify-center video-container relative ${
        fullScreen && "max-h-[100vh] w-full"
      }`}
      onKeyDownCapture={handleKeyBoardShortcuts}
    >
      <div
        id="video-controls-container"
        className={`absolute bottom-0 left-0 right-0 text-accent1 z-50 opacity-0 transition-all hover:opacity-100 ${
          paused && "opacity-100"
        } focus-within:opacity-100 before:bg-gradient-to-t before:from-black before:rounded-b-2xl before:to-transparent before:absolute before:z-[-1] before:w-full before:bottom-0 before:aspect-[6/1]`}
      >
        <div id="timeline-container">
          <div id="timeline" className="px-3 group/timeline">
            <Progress
              value={timelineValue}
              max={100}
              className="cursor-pointer flex group-hover/timeline:hidden"
            />
            <Slider
              defaultValue={[timelineValue ?? 0]}
              min={0}
              max={1}
              step={0.01}
              className="cursor-pointer hidden group-hover/timeline:flex"
              onValueChange={handleTimelineSkim}
            />
          </div>
        </div>
        <div id="controls" className="flex items-center gap-2 p-1">
          {/* Play / Pause */}
          <Button
            size={"icon"}
            variant={"icon"}
            className="hover:text-primary opacity-80 transition-all hover:opacity-100"
            onClick={PlayPause}
          >
            {paused ? <Play size={24} /> : <Pause size={24} />}
          </Button>

          {/* Audio */}
          <div className="flex items-center gap-1 group">
            <Button
              size={"icon"}
              variant={"icon"}
              className="hover:text-primary opacity-80 transition-all hover:opacity-100"
              onClick={handleMute}
            >
              {volumeState === "muted" ? (
                <VolumeX size={24} />
              ) : volumeState === "low" ? (
                <Volume1 size={24} />
              ) : (
                <Volume2 size={24} />
              )}
            </Button>
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              className="w-24 h-5 lg:hidden group-hover:flex"
              onValueChange={handleVolumeChange}
            />
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1 flex-grow">
            <p>{formatDuration(duration)}</p>
            <p>/</p>
            <p>{formatDuration(totalDuration)}</p>
          </div>

          {/* Settings & Captions */}
          <Button
            size={"icon"}
            variant={"icon"}
            className="hover:text-primary opacity-80 transition-all hover:opacity-100"
          >
            <Settings size={24} />
          </Button>
          <Button
            size={"icon"}
            variant={"icon"}
            className="hover:text-primary opacity-80 transition-all hover:opacity-100"
          >
            <Subtitles size={24} />
          </Button>

          {/* View Modes */}
          <Button
            size={"icon"}
            variant={"icon"}
            className="hover:text-primary opacity-80 transition-all hover:opacity-100"
            onClick={togglePIP}
          >
            <PictureInPicture2 size={24} />
          </Button>
          <Button
            size={"icon"}
            variant={"icon"}
            className="hover:text-primary opacity-80 transition-all hover:opacity-100"
            onClick={toggleFullScreen}
          >
            {fullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </Button>
        </div>
      </div>
      <video
        src={src}
        className="w-full z-10 rounded-2xl"
        ref={videoRef}
        muted
        autoPlay
        //  loop
      >
        {captionSrc && (
          <track kind="captions" srcLang={srcLang} src={captionSrc} />
        )}
      </video>
    </div>
  );
}
