import {
  HomeIcon,
  Tags,
  CircleFadingPlus,
  CircleUserRound,
  Send,
  CircleDot,
} from "lucide-react";

export const nav_links = [
  {
    id: 1,
    text: "Home",
    icon: HomeIcon,
    href: "/",
    hidden: false,
  },
  {
    id: 2,
    text: "Services",
    icon: Tags,
    href: "/services",
    hidden: false,
  },
  {
    id: 3,
    text: "Create",
    icon: CircleFadingPlus,
    href: "/create",
    hidden: false,
  },
  {
    id: 4,
    text: "Profile",
    icon: CircleUserRound,
    href: "/profile",
    hidden: false,
  },
  {
    id: 5,
    text: "Contact",
    icon: Send,
    href: "/contact",
    hidden: false,
  },
  {
    id: 6,
    text: "About",
    icon: CircleDot,
    href: "/about",
    hidden: false,
  },
  // Example
  // {
  //   id: 3,
  //   text: "Pages",
  //   icon: PanelTopIcon,
  //   hidden: false,
  //   children: [
  //     { text: "Landing", href: "/landing", icon: PanelTopIcon },
  //     { text: "Pricing", href: "/pricing", icon: PanelTopIcon },
  //     { text: "Checkout", href: "/checkout", icon: PanelTopIcon },
  //   ],
  // },
];
