// @ts-nocheck

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
import { createCommandActions } from "./commandActions";

export const createCommandPaletteConfig = ({
  runCommand,
  navigate,
  openAlertDialogue,
  setTheme,
  setCursor,
  signOutUser,
}) => {
  const commands = createCommandActions({
    navigate,
    setTheme,
    setCursor,
    openAlertDialogue,
    signOutUser,
  });

  return {
    navigation: [
      {
        label: "Home",
        icon: HomeIcon,
        shortcut: "",
        action: () => runCommand(commands.goHome),
      },
      {
        label: "Services",
        icon: Tags,
        shortcut: "",
        action: () => runCommand(commands.goServices),
      },
      {
        label: "Create",
        icon: PlusIcon,
        shortcut: "",
        hidden: true,
        action: () => runCommand(commands.goCreate),
      },
      {
        label: "My Services",
        icon: ScrollText,
        shortcut: "",
        hidden: true,
        action: () => runCommand(commands.goMyServices),
      },
      {
        label: "My Orders",
        icon: SquareRoundCorner,
        shortcut: "",
        hidden: true,
        action: () => runCommand(commands.goMyOrders),
      },
      {
        label: "Contact",
        icon: Send,
        shortcut: "",
        action: () => runCommand(commands.goContact),
      },
      {
        label: "About",
        icon: CircleDot,
        shortcut: "",
        action: () => runCommand(commands.goAbout),
      },
    ],
    actions: [
      {
        label: "Reset",
        icon: RotateCcw,
        shortcut: "",
        hidden: true,
        action: () => runCommand(commands.resetDatabase),
      },
      {
        label: "Dark Mode",
        icon: Contrast,
        shortcut: "",
        action: () => runCommand(commands.toggleTheme),
      },
      {
        label: "Cursor",
        icon: MousePointer2,
        shortcut: "",
        action: () => runCommand(commands.toggleCursor),
      },
    ],
    account: [
      {
        label: "Profile",
        icon: UserIcon,
        shortcut: "",
        hidden: true,
        action: () => runCommand(commands.goProfile),
      },
      {
        label: "Settings",
        icon: Settings,
        shortcut: "",
        hidden: true,
        action: () => runCommand(commands.goSettings),
      },
      {
        label: "Log In",
        icon: LogIn,
        shortcut: "",
        allowedAfterLogin: false,
        action: () => runCommand(commands.goLogin),
      },
      {
        label: "Logout",
        icon: LogOut,
        shortcut: "",
        hidden: true,
        action: () => runCommand(commands.logout),
      },
    ],
  };
};
