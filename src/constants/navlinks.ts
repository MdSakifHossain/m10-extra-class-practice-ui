import {
  Home,
  LogIn,
  PlusIcon,
  ScrollText,
  SquareRoundCorner,
  Tags,
  UserIcon,
} from "lucide-react";

export const navlinks = [
  {
    text: "Home",
    icon: Home,
    link: "/",
  },
  {
    text: "Services",
    icon: Tags,
    link: "/services",
  },
  {
    text: "Create",
    icon: PlusIcon,
    link: "/create",
    hidden: true,
  },
  {
    text: "My Services",
    icon: ScrollText,
    link: "/my-services",
    hidden: true,
  },
  {
    text: "My Orders",
    icon: SquareRoundCorner,
    link: "/my-orders",
    hidden: true,
  },
  {
    text: "Profile",
    icon: UserIcon,
    link: "/profile",
    hidden: true,
  },
  {
    text: "Log In",
    icon: LogIn,
    link: "/login",
    allowedAfterLogin: false,
  },
];
