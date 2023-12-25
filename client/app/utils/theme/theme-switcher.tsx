"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

export const ThemeSwitcher = ({
  variant = "lg",
}: {
  variant?: "sm" | "lg";
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`w-40 p-2 rounded-md bg-transparent left-sidebar-link group/theme`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <div className="flex items-center gap-5">
          <MoonIcon className="size-4 text-accent2 group-hover/theme:text-primary" />
          <span
            className={`${
              variant === "lg"
                ? "max-lg:hidden opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300 group-hover/flex:text-primary"
                : "opacity-100"
            }`}
          >
            Dark Mode
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <SunIcon className="size-4 text-accent1 group-hover/theme:text-primary" />
          <span
            className={`${
              variant === "lg"
                ? "max-lg:hidden opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300 group-hover/flex:text-primary"
                : "opacity-100"
            }`}
          >
            Light Mode
          </span>
        </div>
      )}
    </button>
  );
};
