"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

type AudioPlayerProps = {
  timeOfDay: "morning" | "afternoon" | "evening" | "night" | "midnight";
};

export default function AudioPlayer({ timeOfDay }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    switch (timeOfDay) {
      case "morning":
        setAudioSrc("/31Jan.mp3");
        break;
      case "afternoon":
        setAudioSrc("/save_your_tears.mp3");
        break;
      case "evening":
        setAudioSrc("/love3000.mp3");
        break;
      case "night":
        setAudioSrc("/night.mp3");
        break;
      case "midnight":
        setAudioSrc("/space_song.mp3");
        break;
    }

    setIsPlaying(false);
  }, [timeOfDay]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;

      const handleCanPlay = () => {
        if (!hasInteracted) {
          audioRef.current
            ?.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Autoplay prevented:", error);
              setIsPlaying(false);
            });
        }
      };

      audioRef.current.addEventListener("canplay", handleCanPlay);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("canplay", handleCanPlay);
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [audioSrc, hasInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    setHasInteracted(true);
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setHasInteracted(true);
    setIsMuted(!isMuted);
  };

  const getButtonColor = () => {
    return timeOfDay === "night" || timeOfDay === "midnight"
      ? "text-white"
      : "text-gray-800";
  };

  return (
    <div className="fixed bottom-5 right-5 z-20 flex gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className={`p-3 rounded-full bg-white/20 backdrop-blur-md ${getButtonColor()}`}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`p-3 rounded-full bg-white/20 backdrop-blur-md ${getButtonColor()}`}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </motion.button>
    </div>
  );
}
