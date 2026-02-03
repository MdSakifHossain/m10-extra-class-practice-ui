// @ts-nocheck

import { Link, useNavigate } from "react-router";
import { default_services } from "@/constants";
import {
  LogIn,
  LogOut,
  Tags,
  ScrollText,
  Send,
  CircleDot,
  MousePointer2,
  HomeIcon,
  PlusIcon,
  UserIcon,
  Contrast,
  RotateCcw,
  Settings,
  SquareRoundCorner,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/authContext/AuthProvider";
import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";
import { useEffect, useState } from "react";
import { Kbd } from "@/components/ui/kbd";
import { notify } from "@/lib/notify";
import axios from "axios";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { ModeToggle } from "../appearance/mode-toggle";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const { site_title, setCursor, setTheme } = useAppConfig();
  const navigate = useNavigate();
  const [alertDialogueOpen, setAlertDialogueOpen] = useState(false);
  const [alertDialogueConfig, setAlertDialogueConfig] = useState({
    title: "",
    description: "",
    confirmText: "",
    action: () => {},
  });
  const [commandOpen, setCommandOpen] = useState(false);
  const isLoggedIn = !!user;

  const openLogoutConfirmationDialogue = () => {
    setAlertDialogueConfig({
      title: "Log Out? 🥲",
      description: "You'll need to sign in again.",
      confirmText: "Logout",
      action: () => {
        signOutUser();
        navigate("/login");
        notify.success({ title: "Logout Successful" });
        setAlertDialogueOpen(false);
      },
    });
    setAlertDialogueOpen(true);
  };

  const openDatabaseResetDialogue = () => {
    setAlertDialogueConfig({
      title: "Reset Database?",
      description: "This will delete ALL data. No going back. 💣",
      confirmText: "Reset",
      action: async () => {
        try {
          const { data: dbRes } = await axios.post(
            "http://localhost:3000/reset",
            default_services,
          );
          notify.success({ title: dbRes.message });
        } catch (err) {
          console.error(err);
          notify.danger({ title: err.code, description: err.message });
        }
        setAlertDialogueOpen(false);
      },
    });
    setAlertDialogueOpen(true);
  };

  const shortcuts = {
    // if the key is just a single key
    // then you can use the key as the key in this object like: j without quotation.
    // only the complex one like this ctrl + k kinda shit is needed
    // to be enclosed in a quotation.
    "ctrl+k": {
      action: () => setCommandOpen((prev) => !prev),
      description: "Open Command Prompt",
    },
  };

  const getKeyCombo = (e) => {
    const keys = [];

    if (e.ctrlKey) keys.push("ctrl");
    if (e.altKey) keys.push("alt");
    if (e.shiftKey) keys.push("shift");

    const ignoredKeys = ["control", "alt", "shift", "meta"];

    if (!ignoredKeys.includes(e.key.toLowerCase())) {
      keys.push(e.key.toLowerCase());
    }

    const combo = keys.join("+");
    return combo;
  };

  // initial combination tracker planting.
  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // user is typing so dont do shit.
      if (isTyping) return;

      const combo = getKeyCombo(e);
      const action = shortcuts[combo]?.action;

      // if theres no preset then return
      if (!action) return;

      // All Ok && We take control && call the function
      e.preventDefault();
      action();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commandPaletteObj = {
    navigation: [
      {
        label: "Home",
        icon: HomeIcon,
        shortcut: "",
        action: () => {
          navigate("/");
          setCommandOpen(false);
        },
      },
      {
        label: "Services",
        icon: Tags,
        shortcut: "",
        action: () => {
          navigate("/services");
          setCommandOpen(false);
        },
      },
      {
        label: "Create",
        icon: PlusIcon,
        shortcut: "",
        hidden: true,
        action: () => {
          navigate("/create");
          setCommandOpen(false);
        },
      },
      {
        label: "My Services",
        icon: ScrollText,
        shortcut: "",
        hidden: true,
        action: () => {
          navigate("/my-services");
          setCommandOpen(false);
        },
      },
      {
        label: "My Orders",
        icon: SquareRoundCorner,
        shortcut: "",
        hidden: true,
        action: () => {
          navigate("/my-orders");
          setCommandOpen(false);
        },
      },
      {
        label: "Contact",
        icon: Send,
        shortcut: "",
        action: () => {
          navigate("/contact");
          setCommandOpen(false);
        },
      },
      {
        label: "About",
        icon: CircleDot,
        shortcut: "",
        action: () => {
          navigate("/about");
          setCommandOpen(false);
        },
      },
    ],
    actions: [
      {
        label: "Reset",
        icon: RotateCcw,
        shortcut: "",
        hidden: true,
        action: () => {
          openDatabaseResetDialogue();
          setCommandOpen(false);
        },
      },
      {
        label: "Dark Mode",
        icon: Contrast,
        shortcut: "",
        action: () => {
          setTheme((prev) => (prev === "dark" ? "light" : "dark"));
          setCommandOpen(false);
        },
      },
      {
        label: "Cursor",
        icon: MousePointer2,
        shortcut: "",
        action: () => {
          setCursor((prev) => !prev);
          setCommandOpen(false);
        },
      },
    ],
    account: [
      {
        label: "Profile",
        icon: UserIcon,
        shortcut: "",
        hidden: true,
        action: () => {
          navigate("/profile");
          setCommandOpen(false);
        },
      },
      {
        label: "Settings",
        icon: Settings,
        shortcut: "",
        hidden: true,
        action: () => {
          navigate("/settings");
          setCommandOpen(false);
        },
      },
      {
        label: "Log In",
        icon: LogIn,
        shortcut: "",
        allowedAfterLogin: false,
        action: () => {
          navigate("/login");
          setCommandOpen(false);
        },
      },
      {
        label: "Logout",
        icon: LogOut,
        shortcut: "",
        hidden: true,
        action: () => {
          openLogoutConfirmationDialogue();
          setCommandOpen(false);
        },
      },
    ],
  };

  const filterCommands = (items) => {
    // USER IS LOGGED IN
    if (isLoggedIn)
      return items.filter((item) => item.allowedAfterLogin !== false);

    // USER IS LOGGED OUT
    if (!isLoggedIn) return items.filter((item) => item.hidden !== true);
  };

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

      {/* Invisible content */}
      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>

            <CommandGroup heading="Navigation">
              {filterCommands(commandPaletteObj.navigation).map(
                (item, index) => (
                  <CommandItem key={index} onSelect={item.action}>
                    <item.icon />
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <CommandShortcut>
                        <Kbd>{item.shortcut}</Kbd>
                      </CommandShortcut>
                    )}
                  </CommandItem>
                ),
              )}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Actions">
              {filterCommands(commandPaletteObj.actions).map((item, index) => (
                <CommandItem key={index} onSelect={item.action}>
                  <item.icon />
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <CommandShortcut>
                      <Kbd>{item.shortcut}</Kbd>
                    </CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Account">
              {filterCommands(commandPaletteObj.account).map((item, index) => (
                <CommandItem key={index} onSelect={item.action}>
                  <item.icon />
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <CommandShortcut>
                      <Kbd>{item.shortcut}</Kbd>
                    </CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>

      {/* Alert Dialogue */}
      <AlertDialog open={alertDialogueOpen} onOpenChange={setAlertDialogueOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertDialogueConfig.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertDialogueConfig.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel size="lg" variant="secondary">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => alertDialogueConfig.action()}
              size="lg"
              variant="destructive"
            >
              {alertDialogueConfig.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Navbar;

// ====================================================================
