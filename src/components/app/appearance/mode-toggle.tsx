// @ts-nocheck

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";

export function ModeToggle({ className = "" }) {
  const { theme, setTheme } = useAppConfig();

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className={`rounded-full ${className}`}
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <Sun className="size-5 lg:size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-5 lg:size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
