// @ts-nocheck

import { Link, useNavigate } from "react-router";
import { default_services, nav_links } from "@/constants";
import {
  LogIn,
  LogOut,
  UserRound,
  TextAlignJustify,
  ChevronRight,
  Circle,
  Sparkles,
  CloudBackup,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Kbd } from "@/components/ui/kbd";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  BellIcon,
  CalculatorIcon,
  CalendarIcon,
  ClipboardPasteIcon,
  CodeIcon,
  CopyIcon,
  CreditCardIcon,
  FileTextIcon,
  FolderIcon,
  FolderPlusIcon,
  HelpCircleIcon,
  HomeIcon,
  ImageIcon,
  InboxIcon,
  LayoutGridIcon,
  ListIcon,
  PlusIcon,
  ScissorsIcon,
  SettingsIcon,
  TrashIcon,
  UserIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const { site_title, cursor, setCursor, theme, setTheme } = useAppConfig();
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [shortcutDialogue, setShortcutDialogue] = useState(false);
  const [alertDialogueOpen, setAlertDialogueOpen] = useState(false);
  const [alertDialogueConfig, setAlertDialogueConfig] = useState({
    title: "",
    description: "",
    confirmText: "",
    action: () => {},
  });
  const [commandOpen, setCommandOpen] = useState(false);

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
    i: {
      action: () => setShortcutDialogue((prev) => !prev),
      description: "Shortcut",
    },
    "shift+s": {
      action: () => setIsSheetOpen((prev) => !prev),
      description: "Sidebar",
    },
    "shift+t": {
      action: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
      description: "Dark Mode",
    },
    "shift+c": {
      action: () => setCursor((prev) => !prev),
      description: "Cursor",
    },
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

  return (
    <div
      className="flex items-center justify-between px-5 py-3 lg:px-24 lg:py-4 border-b"
      id="navbar"
    >
      <div className="flex items-center justify-center gap-2 lg:gap-4">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger>
            <TextAlignJustify />
          </SheetTrigger>

          <SheetContent side="left" className="w-72 sm:w-80 p-0 gap-0">
            <SheetHeader className="px-4 py-4 flex items-start justify-end">
              <SheetTitle className="text-lg">{site_title}</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-1 py-3 px-1">
              {user
                ? nav_links.map((item) => <NavItem key={item.id} item={item} />)
                : nav_links
                    .filter((item) => !item.hidden)
                    .map((item) => <NavItem key={item.id} item={item} />)}
            </div>

            <Separator />

            <div className="px-3 lg:px-5 py-6 flex flex-col gap-4">
              {/* Cursor Switch */}
              <Label className="flex items-center justify-between px-2">
                <p className="text-lg flex items-center gap-4">Cursor:</p>
                <Switch
                  aria-label="Square switch"
                  className="rounded-xs [&_span]:rounded-xs"
                  checked={cursor}
                  onCheckedChange={(value) => setCursor(value)}
                />
              </Label>

              {/* Dark Mode Switch */}
              <Label className="flex items-center justify-between px-2">
                <p className="text-lg flex items-center gap-4">Dark Mode:</p>
                <Switch
                  aria-label="Square switch"
                  className="rounded-xs [&_span]:rounded-xs"
                  checked={theme === "dark" ? true : false}
                  onCheckedChange={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                  }}
                />
              </Label>
            </div>
          </SheetContent>
        </Sheet>

        <Link
          to={"/"}
          className="text-xl lg:text-4xl font-medium select-none italic flex items-end gap-1"
        >
          <img src="/vite.svg" alt="icon" className="size-6 lg:size-12" />
          <p className="hidden sm:block">{site_title || "site_title"}</p>
        </Link>
      </div>

      <div className="flex items-center gap-1.5 lg:gap-3">
        {/* <ModeToggle className="hidden sm:flex" /> */}

        <Dialog open={shortcutDialogue} onOpenChange={setShortcutDialogue}>
          <DialogTrigger className="border bg-clip-padding text-sm font-medium inline-flex items-center justify-center whitespace-nowrap gap-4 rounded-full border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs h-10 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3">
            <Sparkles className="size-5" /> Shortcuts
          </DialogTrigger>
          <DialogContent className="border-2">
            <DialogHeader>
              <DialogTitle className="text-2xl">Shortcuts</DialogTitle>
              <DialogDescription>
                Use your Keyboard and Navigate easily
              </DialogDescription>
            </DialogHeader>

            <div className="w-full rounded-2xl flex flex-col items-start justify-between gap-2.5 py-4">
              {Object.entries(shortcuts)
                .map(([key, { description }]) => ({
                  key,
                  description,
                }))
                .map((shortcut, index) => (
                  <p
                    key={index}
                    className="flex items-center justify-between text-lg w-full"
                  >
                    <span className="font-medium">
                      🔹 {shortcut.description}
                    </span>
                    ⟹
                    <Kbd className="text-base font-mono">
                      {shortcut.key.replace("+", " + ").toUpperCase()}
                    </Kbd>
                  </p>
                ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Command Prompt */}
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found. 😕</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem>
                  <HomeIcon />
                  <span>Home</span>
                  <CommandShortcut>⌘H</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <InboxIcon />
                  <span>Inbox</span>
                  <CommandShortcut>⌘I</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <FileTextIcon />
                  <span>Documents</span>
                  <CommandShortcut>⌘D</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <FolderIcon />
                  <span>Folders</span>
                  <CommandShortcut>⌘F</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem>
                  <PlusIcon />
                  <span>New File</span>
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <FolderPlusIcon />
                  <span>New Folder</span>
                  <CommandShortcut>⇧⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CopyIcon />
                  <span>Copy</span>
                  <CommandShortcut>⌘C</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <ScissorsIcon />
                  <span>Cut</span>
                  <CommandShortcut>⌘X</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <ClipboardPasteIcon />
                  <span>Paste</span>
                  <CommandShortcut>⌘V</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <TrashIcon />
                  <span>Delete</span>
                  <CommandShortcut>⌫</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="View">
                <CommandItem>
                  <LayoutGridIcon />
                  <span>Grid View</span>
                </CommandItem>
                <CommandItem>
                  <ListIcon />
                  <span>List View</span>
                </CommandItem>
                <CommandItem>
                  <ZoomInIcon />
                  <span>Zoom In</span>
                  <CommandShortcut>⌘+</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <ZoomOutIcon />
                  <span>Zoom Out</span>
                  <CommandShortcut>⌘-</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Account">
                <CommandItem>
                  <UserIcon />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCardIcon />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <SettingsIcon />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <BellIcon />
                  <span>Notifications</span>
                </CommandItem>
                <CommandItem>
                  <HelpCircleIcon />
                  <span>Help & Support</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Tools">
                <CommandItem>
                  <CalculatorIcon />
                  <span>Calculator</span>
                </CommandItem>
                <CommandItem>
                  <CalendarIcon />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <ImageIcon />
                  <span>Image Editor</span>
                </CommandItem>
                <CommandItem>
                  <CodeIcon />
                  <span>Code Editor</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>

        {user ? (
          <>
            <Popover>
              <PopoverTrigger className="border bg-clip-padding text-sm font-medium inline-flex items-center justify-center whitespace-nowrap gap-4 rounded-full border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs h-10 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3">
                <UserRound className="size-5" />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-1.5 text-center">
                    <p className="text-lg font-semibold">{site_title}</p>
                    <p className="text-muted-foreground text-sm">
                      Welcome to {site_title} — your toolkit for being and
                      building a part of this Pet Community with ease!
                    </p>
                  </div>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => openDatabaseResetDialogue()}
                  >
                    Reset
                    <CloudBackup className="size-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={() => openLogoutConfirmationDialogue()}
                  >
                    Logout <LogOut className="size-4" />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <AlertDialog
              open={alertDialogueOpen}
              onOpenChange={setAlertDialogueOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {alertDialogueConfig.title}
                  </AlertDialogTitle>
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
        ) : (
          <Link to={"/login"}>
            <Button
              size={"lg"}
              variant={"outline"}
              className="flex items-center gap-3 lg:px-3.5 lg:py-4"
            >
              <LogIn className="size-4" /> Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

function NavItem({ item, level = 0 }) {
  const isCategory = !!item.children;

  if (!isCategory) {
    return (
      <Link to={item.href}>
        <div
          className="flex items-center gap-3 rounded-md px-4 lg:px-6 py-1.5 text-base hover:bg-accent/60 focus:bg-accent/80 outline-none focus:ring-2 focus:ring-ring/40 transition-colors"
          // style={{ paddingLeft: `${level * 1.25 + 0.75}rem` }}
        >
          {level === 0 ? (
            <item.icon className="size-5 shrink-0" />
          ) : (
            <Circle className="h-3.5 w-3.5 shrink-0 opacity-70" />
          )}
          <span>{item.text}</span>
        </div>
      </Link>
    );
  }

  return (
    <Collapsible
      className="space-y-1"
      style={{ paddingLeft: level > 0 ? "1.25rem" : "0" }}
    >
      <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-accent/60 focus:bg-accent/80 outline-none focus:ring-2 focus:ring-ring/40 transition-colors">
        {level === 0 ? (
          <item.icon className="h-4 w-4 shrink-0" />
        ) : (
          <Circle className="h-3.5 w-3.5 shrink-0 opacity-70" />
        )}

        <span className="flex-1 text-left">{item.text}</span>
        <ChevronRight className="h-4 w-4 transition-transform duration-200 [data-state=open]:rotate-90" />
      </CollapsibleTrigger>

      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down space-y-1">
        {item.children.map((child) => (
          <NavItem
            key={child.href || child.text}
            item={child}
            level={level + 1}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default Navbar;

// ====================================================================
