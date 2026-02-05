// @ts-nocheck

import { useEffect, useState } from "react";
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
import { Kbd } from "@/components/ui/kbd";
import { useAuth } from "@/contexts/authContext/AuthProvider";
import { useNavigate } from "react-router";
import { useAppConfig } from "@/contexts/appConfig/AppConfigProvider";
import { createCommandPaletteConfig } from "./CommandPaletteConfig";

const CommandPalette = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const isLoggedIn = !!user;
  const navigate = useNavigate();
  const { setCursor, setTheme, openAlertDialogue } = useAppConfig();

  const filterCommands = (items) => {
    // USER IS LOGGED IN
    if (isLoggedIn)
      return items.filter((item) => item.allowedAfterLogin !== false);

    // USER IS LOGGED OUT
    if (!isLoggedIn) return items.filter((item) => item.hidden !== true);
  };

  const runCommand = (fn) => {
    fn();
    setCommandOpen(false);
  };

  const commandPaletteObj = createCommandPaletteConfig({
    runCommand,
    navigate,
    openAlertDialogue,
    setTheme,
    setCursor,
    signOutUser,
  });

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

  return (
    <>
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
    </>
  );
};

export default CommandPalette;
