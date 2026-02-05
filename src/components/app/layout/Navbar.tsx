// @ts-nocheck

import { Link } from "react-router";
import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";
import { ModeToggle } from "../appearance/mode-toggle";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { site_title, setCommandOpen } = useAppConfig();

  return (
    <>
      {/* Visible content */}
      <div className="flex items-center justify-between px-5 py-3 lg:px-24 lg:py-4 border-b">
        <Link
          to={"/"}
          className="text-xl lg:text-4xl font-medium select-none italic flex items-center gap-3"
        >
          <img src="/vite.svg" alt="icon" className="size-10 lg:size-16" />
          <p className="hidden sm:block">{site_title || "site_title"}</p>
        </Link>

        <div className="flex items-center gap-1.5 lg:gap-3">
          <ModeToggle className="hidden sm:flex" />

          <Button
            onClick={() => setCommandOpen(true)}
            size="icon-lg"
            variant="ghost"
            className="rounded-full"
            title="Ctrl + K"
          >
            <img src="/command-palette.svg" alt="command-palette dark:invert" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

// ====================================================================
