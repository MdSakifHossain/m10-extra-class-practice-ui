// @ts-nocheck

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";

export function ModeToggle() {
  const { theme, setTheme } = useAppConfig();

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="rounded-full"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <Sun className="size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
