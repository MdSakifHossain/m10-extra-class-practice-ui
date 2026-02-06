// @ts-nocheck

import { Link, NavLink } from "react-router";
import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";
import { ModeToggle } from "../appearance/mode-toggle";
import { Button } from "@/components/ui/button";
import { navlinks } from "@/constants/";
import { ButtonGroup } from "@/components/ui/button-group";
import { useAuth } from "@/contexts/authContext/AuthProvider";
import { useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";

const Navbar = () => {
  const { site_title, setCommandOpen } = useAppConfig();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <>
      <div className="flex items-center justify-between px-5 py-3 lg:px-24 lg:py-4 border-b">
        <SiteTitleAndLogo title={site_title} />

        <NavLinksGroup navlinks={navlinks} isLoggedIn={isLoggedIn} />

        <NavbarEnding setCommandOpen={setCommandOpen} />
      </div>
    </>
  );
};

export default Navbar;

// ====================================================================

function SiteTitleAndLogo({ title }) {
  return (
    <Link
      to={"/"}
      className="text-xl lg:text-4xl font-medium select-none italic flex items-center gap-3"
    >
      <img src="/vite.svg" alt="icon" className="size-10 lg:size-12" />
      <p className="hidden sm:block">{title || "site_title"}</p>
    </Link>
  );
}

function NavLinksGroup({ navlinks, isLoggedIn }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const doTheThing = () => {
      if (!isLoggedIn)
        return setLinks(navlinks.filter((item) => item.hidden !== true));

      setLinks(navlinks.filter((item) => item.allowedAfterLogin !== false));
    };
    doTheThing();
  }, [navlinks, isLoggedIn]);

  return (
    <ButtonGroup>
      {links.map((item, index) => (
        <NavLink key={index} to={item.link}>
          <Button variant="outline">
            {item.icon ? <item.icon /> : <TriangleAlert />} {item.text}
          </Button>
        </NavLink>
      ))}
    </ButtonGroup>
  );
}

function NavbarEnding({ setCommandOpen }) {
  return (
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
  );
}
